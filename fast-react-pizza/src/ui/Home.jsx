import React from 'react';
import CreateUser from '../features/users/CreateUser';
import { useSelector } from 'react-redux';
import Button from './Button';
function Home() {

  const username = useSelector(state => state.user.username)

  return (
    <div className="mt-10 text-center sm:my-16 px-4">
      <h1 className="mb-8 text-xl font-semibold">
        The Best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username === '' ? <CreateUser /> : <Button to='/menu' type='primary'>Continue ordering ,{username}</Button>}
    </div>
  );
}

export default Home;
