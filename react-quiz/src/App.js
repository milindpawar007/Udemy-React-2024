import { useEffect, useReducer } from 'react';
import Header from './Component/Header';
import Main from './Component/Main';
import Loader from './Component/Loader';
import Errors from './Component/Erros';
import StartScreen from './Component/StartScreen';
import Question from './Component/Question';
import NextButton from './Component/NextButton';
import Progress from './Component/Progress';
import FinishScreen from './Component/FinishScreen';
const initialState = {
  questions: [],
  // 'ready' ,'active', 'error, 'finished'
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
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
    case 'start':
      return {
        ...state,
        status: 'active',
      };
    case 'newAnswer':
      const question = state.questions[state.index];

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case 'finish':
      return {
        ...state,
        status: 'finish',
      };
    case 'restart':
      return { ...initialState, questions: state.questions, status: 'ready' };
    default:
      throw Error('error');
  }
}

function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const numQuestion = questions.length;
  const maxPossiblePoints = questions.reduce((prv, cur) => prv + cur.points, 0);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8000/questions');
        if (!response.ok) {
          dispatch({ type: 'dataFalied' });
          console.error(`HTTP error! status: ${response.status}`);
        }
        const questions = await response.json();

        dispatch({ type: 'dataReceived', payload: questions });
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
        {status === 'ready' && (
          <StartScreen numQuestion={numQuestion} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <Progress
              index={index}
              numQuestions={questions.length}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              numQuestions={questions.length}
            />
          </>
        )}
        {status === 'finish' && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
