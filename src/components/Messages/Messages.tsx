import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Message, State } from '../../reducers/types';
import { Message as MessageComp } from '../Message/Message';
import './Messages.scss';
import { useDialogSub } from '../../utils/useDialogSub';

interface Props {}

export const Messages: React.FC<Props> = ({}) => {
  const dialog = useSelector((state) => (state as State).messages.dialog);
  const user = useSelector((state) => (state as State).user.user);
  const isMy = (message: Message) => {
    return message.from === user?.email;
  };

  useDialogSub(dialog, user);

  return (
    <div className="chat__messages messages">
      {dialog
        ? dialog.messages.map((message, i) => {
            let isFirst = false;
            if (i < dialog.messages.length - 1) {
              if (isMy(dialog.messages[i + 1]) !== isMy(dialog.messages[i]))
                isFirst = true;
            } else if (i === dialog.messages.length - 1) isFirst = true;
            const user =
              dialog.user1.email === message.from ? dialog.user1 : dialog.user2;
            return (
              <MessageComp
                key={message.id}
                isMy={isMy(message)}
                isFirst={isFirst}
                message={message}
                user={user}
              />
            );
          })
        : null}
    </div>
  );
};
