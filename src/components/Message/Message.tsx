import React from 'react';
import './Message.scss';
import profilePic from '../../assets/images/profile-picture.png';

interface Props {
  isMy?: boolean;
  isFirst?: boolean;
}

export const Message: React.FC<Props> = ({ isMy = false, isFirst = false }) => {
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
        Mehmet Revnaki
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
            Thank you Phillip!
          </p>
          <time
            className={
              isMy ? 'message__time' : 'message__time message__time_others'
            }
          >
            15:07
          </time>
        </div>
        <div
          className={
            isMy ? 'message__image' : 'message__image message__image_others'
          }
        >
          <img src={profilePic} alt="User" className="message__img" />
        </div>
      </div>
    </div>
  );
};
