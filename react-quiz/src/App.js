import { useEffect, useReducer } from 'react';
import Header from './Component/Header';
import Main from './Component/Main';
import Loader from './Component/Loader';
import Errors from './Component/Erros';
import StartScreen from './Component/StartScreen';
import Question from './Component/Question';
import Footer from './Component/Footer';
import Progress from './Component/Progress';
import FinishScreen from './Component/FinishScreen';
import NextButton from './Component/NextButton';
import Timer from './Component/Timer';
import { useQuiz } from './Contexts/QuizContext';

function App() {
  const { status } = useQuiz();
  return (
    <div className="app">
      <Header />

      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Errors />}
        {status === 'ready' && <StartScreen />}
        {status === 'active' && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === 'finish' && <FinishScreen />}
      </Main>
    </div>
  );
}

export default App;
