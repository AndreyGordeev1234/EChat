import React from 'react';
import UserInFind from '../UserInFind';
import './Find.scss';

interface Props {}

export const Find: React.FC<Props> = ({}) => {
  return (
    <div className="find">
      <input
        type="email"
        name="email"
        className="find__input"
        placeholder="Type email here..."
      />
      <div className="find__wrapper">
        <UserInFind />
        <UserInFind />
        <UserInFind />
      </div>
    </div>
  );
};
