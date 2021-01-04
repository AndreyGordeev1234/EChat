import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSendMessage } from '../../actions';
import { State } from '../../reducers/types';
import { validateMessage } from '../../utils/validateFields';
import './MessageForm.scss';

interface Props {}

export const MessageForm: React.FC<Props> = ({}) => {
  const dialog = useSelector((state) => (state as State).messages.dialog);
  const user = useSelector((state) => (state as State).user.user);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateMessage(message)) {
      const toUser =
        dialog!.user1.email === user?.email
          ? dialog!.user2.email
          : dialog!.user1.email;
      dispatch(fetchSendMessage(user!.email, toUser, message));

      setMessage('');
    }
  };

  return (
    <form className="chat__form" onSubmit={submitForm}>
      <p className="chat__fields">
        <input
          type="text"
          name="message"
          className="chat__field"
          placeholder="Type a new message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          autoComplete="off"
        />
        <button
          type="submit"
          className="chat__submit"
          disabled={!validateMessage(message)}
        >
          Send
        </button>
      </p>
    </form>
  );
};
