import firebase from 'firebase/app';
import { User } from '../reducers/types';
import 'firebase/firestore';

export class Api {
  static async signInWithGoogle(
    auth: firebase.auth.Auth,
  ): Promise<User | null> {
    const db = firebase.firestore();
    const provider = new firebase.auth.GoogleAuthProvider();
    const { user } = await auth.signInWithPopup(provider);

    if (!user) return null;

    if (user) {
      const userRef = db.collection('users').doc(user?.email!);
      const doc = await userRef.get();

      if (!doc.exists) {
        const data = {
          name: user?.displayName,
          photoUrl: user?.photoURL,
        };

        try {
          const res = await db.collection('users').doc(user?.email!).set(data);
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
}
