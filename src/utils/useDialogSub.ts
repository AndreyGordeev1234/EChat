import firebase from 'firebase/app';
import { useMemo, useEffect } from 'react';
import { Dialog, User } from '../reducers/types';
import 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { addMessage } from '../actions';
import useSound from 'use-sound';

export const useDialogSub = (dialog: Dialog | null, user: User | null) => {
  const db = useMemo(() => firebase.firestore(), []);
  const dispatch = useDispatch();
  const [play] = useSound(require('../assets/sounds/message.mp3').default);

  useEffect(() => {
    let sub: any = () => {};

    if (dialog && user) {
      // need to define emails
      const from = user!.email;
      const to = dialog!.user1.email === from ? dialog!.user2.email : from;

      // async function for better usability
      const func = async () => {
        // find dialog
        let dialogRef = db.collection('dialogs').doc(`${from}->${to}`);
        const doc = await dialogRef.get();
        if (!doc.exists) {
          dialogRef = db.collection('dialogs').doc(`${to}->${from}`);
        }

        // flag for init loading
        let isInitState = true;

        // set onSnapshot listener
        const sub: any = dialogRef.collection('messages').onSnapshot(
          { includeMetadataChanges: true },
          (snap) => {
            if (isInitState) isInitState = false;
            else {
              snap.docChanges().forEach((change) => {
                const message = change.doc.data();
                if (change.type === 'added') {
                  dispatch(
                    addMessage({
                      id: change.doc.id,
                      from: message.from,
                      text: message.message,
                      createdAt: message.createdAt
                        ? message.createdAt
                        : { seconds: new Date().getTime() / 1000 },
                    }),
                  );
                  if (message.from !== user.email) play();
                }
              });
            }
          },
          (err: any) => {
            console.log(err);
          },
        );

        // return function to remove listener
        return sub;
      };

      func().then((data) => (sub = data));
    }

    return () => {
      sub();
    };
  }, [db, dialog?.user1, dialog?.user2, user, dispatch]);
};
