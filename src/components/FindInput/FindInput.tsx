import React, { useState } from 'react';

interface Props {
  onFilter: (word: string) => void;
}

export const FindInput: React.FC<Props> = ({ onFilter }) => {
  const [email, setEmail] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    setEmail(val);
    onFilter(val);
  };

  return (
    <input
      type="email"
      name="email"
      className="find__input"
      placeholder="Type email here..."
      value={email}
      onChange={handleChange}
      autoComplete="off"
    />
  );
};
