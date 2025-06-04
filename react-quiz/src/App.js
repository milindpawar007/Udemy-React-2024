import { useEffect, useReducer } from 'react';
import Header from './Component/Header';
import Main from './Component/Main';
import Loader from './Component/Loader';
import Errors from './Component/Erros';
const initialState = {
  questions: [],
  // 'ready' ,'active', 'error, 'finished'
  status: 'loading',
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      };
    case 'dataFalied':
      return {
        ...state,
        status: 'error',
      };
    default:
      throw Error('error');
  }
}

function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8000/questions');
        if (!response.ok) {
          dispatch({ type: 'dataFalied' });
          console.error(`HTTP error! status: ${response.status}`);
        }
        const questions = await response.json();
        setTimeout(() => {
          dispatch({ type: 'dataReceived', payload: questions });
        }, 3000);
      } catch (error) {
        console.error('Fetch error:', error);
        dispatch({ type: 'dataFalied' });
      }
    }

    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Errors />}
      </Main>
    </div>
  );
}

export default App;
