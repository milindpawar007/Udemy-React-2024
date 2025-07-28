import React from 'react';
import { useSelector } from 'react-redux';

const Username = () => {

  const userName = useSelector((state) => state.user.username)
  if (!userName) return null;
  return <div className="hidden text-sm font-semibold md:block md:text-3xl">{userName}</div>;
};

export default Username;
