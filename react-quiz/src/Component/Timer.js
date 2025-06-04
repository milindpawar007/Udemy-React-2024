import { useEffect } from 'react';

function Timer({ dispatch, secondsRemaing }) {
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [dispatch]);

  return <div className="timer">{secondsRemaing}</div>;
}

export default Timer;
