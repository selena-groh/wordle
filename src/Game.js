import "./Game.scss";
import Letter from "./Letter";
import { useCallback, useEffect, useState } from "react";
import { UNCHECKED, ABSENT, WRONG_PLACE, CORRECT } from "./constants";

const ANSWER = ["h", "e", "l", "l", "o"];

const Game = () => {
  // currentLetters data structure looks like:
  // [
  //   { letter: "s", status: ABSENT },
  //   { letter: "a", status: ABSENT },
  //   { letter: "m", status: ABSENT },
  //   { letter: "p", status: ABSENT },
  //   { letter: "l", status: WRONG_PLACE }
  // ]
  const [currentLetters, setCurrentLetters] = useState([]);
  // guessedWords data structure looks like:
  // [
  //   [
  //     { letter: "s", status: ABSENT },
  //     { letter: "a", status: ABSENT },
  //     { letter: "m", status: ABSENT },
  //     { letter: "p", status: ABSENT },
  //     { letter: "l", status: WRONG_PLACE }
  //   ],
  //   [
  //     { letter: "h", status: CORRECT },
  //     { letter: "e", status: CORRECT },
  //     { letter: "l", status: CORRECT },
  //     { letter: "l", status: CORRECT },
  //     { letter: "o", status: CORRECT }
  //   ]
  // ]
  const [guessedWords, setGuessedWords] = useState([]);
  const [isSolved, setIsSolved] = useState(false);

  const deleteLetter = useCallback(() => {
    setCurrentLetters((currentLetters) => currentLetters.slice(0, -1));
  }, []);

  const setLetterStatuses = useCallback(
    () =>
      currentLetters.map((currentLetter, index) => {
        if (currentLetter.letter === ANSWER[index]) {
          currentLetter.status = CORRECT;
          return currentLetter;
        } else if (ANSWER.includes(currentLetter.letter)) {
          currentLetter.status = WRONG_PLACE;
          return currentLetter;
        } else {
          currentLetter.status = ABSENT;
          return currentLetter;
        }
      }),
    [currentLetters]
  );

  const isCorrectAnswer = useCallback(
    () =>
      currentLetters.every(
        (currentLetter, index) => currentLetter.letter === ANSWER[index]
      ),
    [currentLetters]
  );

  const submitWord = useCallback(() => {
    if (currentLetters.length !== 5) {
      return;
    }
    setLetterStatuses();
    if (isCorrectAnswer()) {
      setIsSolved(true);
    }
    setGuessedWords((guessedWords) => [...guessedWords, currentLetters]);
    setCurrentLetters([]);
  }, [currentLetters, setLetterStatuses, isCorrectAnswer]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isSolved) {
        return;
      } else if (e.key === "Backspace") {
        deleteLetter();
      } else if (e.key === "Enter") {
        submitWord();
      } else if (
        String.fromCharCode(e.keyCode).match(/([A-Z]|[a-z])/g) &&
        currentLetters.length < 5
      ) {
        setCurrentLetters((currentLetters) => [
          ...currentLetters,
          { letter: e.key.toLowerCase(), status: UNCHECKED }
        ]);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [deleteLetter, submitWord, isSolved, currentLetters.length]);

  return (
    <div className="Game">
      {guessedWords.map((guessedWord) => (
        <div>
          {guessedWord.map((guessedLetter, index) => (
            <Letter key={index} status={guessedLetter.status}>
              {guessedLetter.letter}
            </Letter>
          ))}
        </div>
      ))}
      <div>
        {currentLetters.map((currentLetter, index) => (
          <Letter key={index} status={currentLetter.status}>
            {currentLetter.letter}
          </Letter>
        ))}
      </div>
      {isSolved && <p>Congratulations! You've guessed it!</p>}
    </div>
  );
};

export default Game;
