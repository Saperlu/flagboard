import React from 'react';

export const Flag = ({ flag: flag, }) => {
  return (
    <li>
      <span className='flag_username'>{flag.username}</span>
      <span className='flag_ts'>{flag.createdAt.toLocaleTimeString()}</span>
    </li>
  );
};