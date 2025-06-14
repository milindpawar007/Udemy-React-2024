import { useQuiz } from '../Contexts/QuizContext';

function Options({ question }) {
  const { dispatch, answer } = useQuiz();
  const hasAnswered = answer !== null;
  return (
    <div>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            className={`btn btn-option ${index === answer ? 'answer' : ''} ${
              hasAnswered
                ? index === question.correctOption
                  ? 'correct'
                  : 'wrong'
                : ''
            }`}
            key={option}
            disabled={answer !== null}
            onClick={() => {
              dispatch({ type: 'newAnswer', payload: index });
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Options;
