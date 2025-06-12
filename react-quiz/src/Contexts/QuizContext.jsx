import { createContext, useContext, useReducer, useEffect } from "react"

const QuizContext = createContext();


const SECS_PER_QUESTIONS = 30;
const initialState = {
    questions: [],
    // 'ready' ,'active', 'error, 'finished'
    status: 'loading',
    index: 0,
    answer: null,
    points: 0,
    secondsRemaing: null,
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
                secondsRemaing: state.questions.length * SECS_PER_QUESTIONS,
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
        case 'tick':
            return {
                ...state,
                secondsRemaing: state.secondsRemaing - 1,
                status: state.secondsRemaing === 0 ? 'finish' : state.status,
            };
        default:
            throw Error('error');
    }
}

function QuizProvider({ children }) {

    const [
        { questions, status, index, answer, points, secondsRemaing },
        dispatch,
    ] = useReducer(reducer, initialState);

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
        <QuizContext.Provider value={{
            questions, status, index, answer, points, secondsRemaing, numQuestion, maxPossiblePoints, dispatch
        }}>
            {children}
        </QuizContext.Provider>)
}

function useQuiz() {
    const context = useContext(QuizContext);
    if (context === undefined)
        throw new Error("useAuthContext must be used within an AuthProvider");
    return context;

}

export { useQuiz, QuizProvider }