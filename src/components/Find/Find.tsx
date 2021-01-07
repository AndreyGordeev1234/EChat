import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../actions';
import { State } from '../../reducers/types';
import { FindInput } from '../FindInput/FindInput';
import UserInFind from '../UserInFind';
import './Find.scss';

export const Find: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => (state as State).users.loading);
  const users = useSelector((state) => (state as State).users.users);
  const [filteredUsers, setFilteredUsers] = useState(users);

  const filterUsers = (word: string) => {
    setFilteredUsers(users.filter((user) => user.email.includes(word)));
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  return (
    <div className="find">
      <FindInput onFilter={filterUsers} />
      <div className="find__wrapper">
        {loading ? (
          <div className="find__loading">loading...</div>
        ) : (
          filteredUsers.map((user) => (
            <UserInFind key={user.email} user={user} />
          ))
        )}
      </div>
    </div>
  );
};
