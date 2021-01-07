import firebase from 'firebase/app';
import { Dialog, DialogInfo, Message, User } from '../reducers/types';
import 'firebase/firestore';

export class Api {
  static async signInWithGoogle(
    auth: firebase.auth.Auth,
  ): Promise<User | null> {
    const db = firebase.firestore();
    const provider = new firebase.auth.GoogleAuthProvider();
    const { user } = await auth.signInWithPopup(provider);

    if (!user) {
      auth.signOut();
      return null;
    }

    if (user) {
      const userRef = db.collection('users').doc(user?.email!);
      const doc = await userRef.get();

      if (!doc.exists) {
        const data = {
          name: user?.displayName,
          photoUrl: user?.photoURL,
        };

        try {
          await db.collection('users').doc(user?.email!).set(data);
        } catch (e) {
          await auth.signOut();
          return null;
        }
      }
    }

    return {
      name: user?.displayName!,
      email: user?.email!,
      photoUrl: user?.photoURL!,
    };
  }

  static async getUsers(): Promise<User[]> {
    const db = firebase.firestore();
    const usersRef = db.collection('users');
    const snapshot = await usersRef.get();
    if (snapshot.empty) {
      console.log('No matching documents.');
      return [];
    }

    const users: User[] = [];
    snapshot.forEach((doc) => {
      users.push({
        email: doc.id,
        name: doc.data().name,
        photoUrl: doc.data().photoUrl,
      });
    });

    return users;
  }

  static async getMessages({
    from,
    to,
  }: {
    from: string;
    to: string;
  }): Promise<Dialog | null> {
    const db = firebase.firestore();
    const user1Ref = db.collection('users').doc(from);
    const user2Ref = db.collection('users').doc(to);
    const user1Doc = await user1Ref.get();
    const user2Doc = await user2Ref.get();

    if (!user1Doc.exists || !user2Doc.exists) return null;

    const user1 = {
      email: user1Doc.id,
      name: user1Doc.data()!.name,
      photoUrl: user1Doc.data()!.photoUrl,
    };
    const user2 = {
      email: user2Doc.id,
      name: user2Doc.data()!.name,
      photoUrl: user2Doc.data()!.photoUrl,
    };

    let dialogRef = db.collection('dialogs').doc(`${from}->${to}`);
    let doc = await dialogRef.get();

    if (!doc.exists) {
      dialogRef = db.collection('dialogs').doc(`${to}->${from}`);
      doc = await dialogRef.get();
      if (!doc.exists) {
        return {
          user1,
          user2,
          messages: [],
          id: '',
        };
      }
    }
    const messagesRef = await dialogRef
      .collection('messages')
      .orderBy('createdAt', 'desc');
    const snapshot = await messagesRef.get();
    if (snapshot.empty) {
      console.log('No matching documents.');
      return {
        user1,
        user2,
        messages: [],
        id: '',
      };
    }

    const messages: Message[] = [];
    snapshot.forEach((doc) => {
      messages.push({
        id: doc.id,
        from: doc.data().from,
        text: doc.data().message,
        createdAt: doc.data().createdAt,
      });
    });

    return {
      user1,
      user2,
      messages,
      id: doc.id,
    };
  }

  static async addMessage({
    from,
    to,
    message,
  }: {
    from: string;
    to: string;
    message: string;
  }): Promise<{ status: boolean } | null> {
    const db = firebase.firestore();
    const user1Ref = db.collection('users').doc(from);
    const user2Ref = db.collection('users').doc(to);
    const user1Doc = await user1Ref.get();
    const user2Doc = await user2Ref.get();

    if (!user1Doc.exists || !user2Doc.exists) return null;

    // is there the dialog
    let dialogRef = db.collection('dialogs').doc(`${from}->${to}`);
    const doc = await dialogRef.get();

    if (!doc.exists) {
      dialogRef = db.collection('dialogs').doc(`${to}->${from}`);
      const doc = await dialogRef.get();
      if (!doc.exists) {
        // if no dialog exists
        try {
          await dialogRef.set({
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            user1: from,
            user2: to,
          });
        } catch (e) {
          console.log(e);
          return null;
        }
      }
    }

    await dialogRef.collection('messages').add({
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      from,
      message,
    });

    return {
      status: true,
    };
  }

  static async getDialogs(user: string): Promise<DialogInfo[]> {
    const db = firebase.firestore();
    const dialogs: DialogInfo[] = [];

    let isDoublicate = false;

    const getDialogsFromSnaphot = async (snapshot: any, userNum: number) => {
      for (let doc of snapshot.docs) {
        // avoid dublicate
        if (doc.data().user1 === doc.data().user2 && isDoublicate) continue;

        const anotherUser = userNum === 1 ? doc.data().user2 : doc.data().user1;
        if (user === anotherUser) isDoublicate = true;
        let messageText = '';
        let messageDate: any = null;
        const messagesDocs = await db
          .collection('dialogs')
          .doc(doc.id)
          .collection('messages')
          .orderBy('createdAt', 'desc')
          .limit(1)
          .get();
        for (let d of messagesDocs.docs) {
          messageText = d.data().message;
          messageDate = d.data().createdAt;
        }
        const userDoc = await db.collection('users').doc(anotherUser).get();
        dialogs.push({
          id: doc.id,
          messageText: messageText,
          messageDate: messageDate,
          anotherUser: {
            email: userDoc.id,
            name: userDoc.data()!.name,
            photoUrl: userDoc.data()!.photoUrl,
          },
        });
      }
    };

    let dialogRef = db.collection('dialogs').where('user1', '==', user);
    let snapshot = await dialogRef.get();

    await getDialogsFromSnaphot(snapshot, 1);

    dialogRef = db.collection('dialogs').where('user2', '==', user);
    snapshot = await dialogRef.get();

    await getDialogsFromSnaphot(snapshot, 2);

    return dialogs;
  }
}
