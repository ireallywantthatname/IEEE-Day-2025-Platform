"use client";
import { useState, useEffect } from "react";

type Answer = {
  text: string;
  isCorrect: boolean;
};


type Question = {
  question: string;
  answers: Answer[];
};

type QuizState = {
  currentQuestion: number;
  score: number;
  showResults: boolean;
  questions: Question[];
  isLoading: boolean;
};

const Engine = () => {

  const [state, setState] = useState<QuizState>({
    currentQuestion: 0,
    score: 0,
    showResults: false,
    questions: [],
    isLoading: true,
  });


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          "https://opentdb.com/api.php?amount=10&type=multiple"
        );
        const data = await response.json();
        const questions = data.results.map((item: any) => {
          const incorrectAnswers = item.incorrect_answers.map(
            (answer: string) => ({
              text: answer,
              isCorrect: false,
            })
          );
          const correctAnswer = {
            text: item.correct_answer,
            isCorrect: true,
          };
          return {
            question: item.question,
            answers: [...incorrectAnswers, correctAnswer].sort(
              () => Math.random() - 0.5
            ),
          };
        });
        setState((prevState) => ({
          ...prevState,
          questions,
          isLoading: false,
        }));
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    };

    fetchQuestions();
  }, []);


  const handleAnswerClick = (isCorrect: boolean): void => {
    if (isCorrect) {
      setState((prevState) => ({ ...prevState, score: prevState.score + 1 }));
    }

    const nextQuestion = state.currentQuestion + 1;
    if (nextQuestion < state.questions.length) {
      setState((prevState) => ({
        ...prevState,
        currentQuestion: nextQuestion,
      }));
    } else {
      setState((prevState) => ({ ...prevState, showResults: true }));
    }
  };
  const resetQuiz = (): void => {
    setState({
      currentQuestion: 0,
      score: 0,
      showResults: false,
      questions: state.questions,
      isLoading: false,
    });
  };

  if (state.isLoading) {
    return (
      <div className="">
        <p>Loading quiz questions, please wait...</p>
      </div>
    );
  }

  if (state.questions.length === 0) {
    return <div>No questions available.</div>;
  }

  const currentQuestion = state.questions[state.currentQuestion];

  return (
    <div className="">
      {state.showResults ? (
        <div className="">
          <h2 className="">Results</h2>
          <p className="">
            You scored {state.score} out of {state.questions.length}
          </p>
          <button onClick={resetQuiz} className="">
            Try Again
          </button>
        </div>
      ) : (
        <div className="">
          <h2 className="">
            Question {state.currentQuestion + 1}/{state.questions.length}
          </h2>
          <p
            className=""
            dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
          />
          <div className="">
            {currentQuestion.answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(answer.isCorrect)}
                className="w-full"
              >
                {answer.text}
              </button>
            ))}
          </div>
          <div className="">
            <span className="">Score: {state.score}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Engine