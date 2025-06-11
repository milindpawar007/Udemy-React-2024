import { useQuiz } from '../Contexts/QuizContext';
import Options from './Options';

function Question() {
  const { question, dispatch, answer } = useQuiz();
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question}></Options>
    </div>
  );
}

export default Question;
