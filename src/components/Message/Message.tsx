import React from 'react';
import './Message.scss';
import profilePic from '../../assets/images/profile-picture.png';
import { Message as MessageInterface, User } from '../../reducers/types';
import { fromUnixToDate } from '../../utils/fromUnixToDate';

interface Props {
  isMy?: boolean;
  isFirst?: boolean;
  message: MessageInterface;
  user: User;
}

export const Message: React.FC<Props> = ({
  isMy = false,
  isFirst = false,
  message,
  user,
}) => {
  const setMessageClass = () => {
    let classes = ['message'];
    if (!isMy) classes.push('message_others');
    if (isFirst) classes.push('message_first');
    return classes.join(' ');
  };

  return (
    <div className={setMessageClass()}>
      <p
        className={
          isMy ? 'message__user' : 'message__user message__user_others'
        }
      >
        {user.name}
      </p>
      <div className="message__main">
        <div
          className={
            isMy ? 'message__info' : 'message__info message__info_others'
          }
        >
          <p
            className={
              isMy ? 'message__text' : 'message__text message__text_others'
            }
          >
            {message.text}
          </p>
          <time
            className={
              isMy ? 'message__time' : 'message__time message__time_others'
            }
          >
            {fromUnixToDate(message.createdAt.seconds)}
          </time>
        </div>
        <div
          className={
            isMy ? 'message__image' : 'message__image message__image_others'
          }
          style={{
            backgroundImage: `url(${user?.photoUrl})`,
          }}
        ></div>
      </div>
    </div>
  );
};
