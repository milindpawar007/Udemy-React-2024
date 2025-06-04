import { useEffect } from 'react';

function Timer({ dispatch, secondsRemaing }) {
  const mins = Math.floor(secondsRemaing / 60);
  const second = secondsRemaing % 60;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [dispatch]);

  return (
    <div className="timer">
      {mins < 10 && '0'}
      {mins}: {second < 10 && '0'}
      {second}
    </div>
  );
}

export default Timer;
