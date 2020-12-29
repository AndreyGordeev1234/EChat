import React from 'react';
import { Message } from '../Message/Message';
import './Messages.scss';

interface Props {}

const messages = [
  {
    isMy: false,
  },
  {
    isMy: true,
  },
  {
    isMy: false,
  },
  {
    isMy: false,
  },
  {
    isMy: true,
  },
  {
    isMy: true,
  },
  {
    isMy: false,
  },
  {
    isMy: false,
  },
];

export const Messages: React.FC<Props> = ({}) => {
  return (
    <div className="chat__messages messages">
      {messages.map((message, i) => {
        let isFirst = false;
        if (i < messages.length - 1) {
          if (messages[i + 1].isMy !== messages[i].isMy) isFirst = true;
        } else if (i === messages.length - 1) isFirst = true;

        return <Message key={i} isMy={message.isMy} isFirst={isFirst} />;
      })}
    </div>
  );
};
