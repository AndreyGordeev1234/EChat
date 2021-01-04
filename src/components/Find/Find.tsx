import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../actions';
import { State } from '../../reducers/types';
import UserInFind from '../UserInFind';
import './Find.scss';

interface Props {}

export const Find: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => (state as State).users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div className="find">
      <input
        type="email"
        name="email"
        className="find__input"
        placeholder="Type email here..."
      />
      <div className="find__wrapper">
        {loading ? (
          <div>loading...</div>
        ) : (
          users.map((user) => <UserInFind key={user.email} user={user} />)
        )}
      </div>
    </div>
  );
};
