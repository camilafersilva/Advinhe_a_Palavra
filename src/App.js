// CSS
import './App.css';
//React
import { useCallback, useState, useEffect } from "react";
//Cmponents
import { StratScreen } from './components/StratScreen.js';
import { Game } from './components/Game.js';
import { GameOver } from './components/GameOver.js';

//Data
import { wordsList } from './data/word.js';

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" }
]
function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  const [pickedWord, setPickedWord] = useState("");
  const [pickedcategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);


  const pickedWords = useCallback(() => {
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return { word, category }
  },[words])

  // Start Game
  const startGame =useCallback( () => {
    //picked word e category
    const { word, category } = pickedWords();
    //Array of letters
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());
    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters)
    setGameStage(stages[1].name)
 clearLetterStates()
  },[pickedWords]);
  // Verify Letter
const clearLetterStates=()=>{
  setGuessedLetters([])
  setWrongLetters([])

}
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    // check if letter has already been utilized
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return ;
    }

    // push guessed letter or remove a chance
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        letter,
      ]
   
      ); 
    
      
      
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };
useEffect(()=>{if (guesses===0){
  setGameStage(stages[2].name);
  clearLetterStates()
}},[guesses])
useEffect(()=>{
const uniqueLetters=[...new Set(letters)];
if(guessedLetters.length===uniqueLetters.length){
  setScore((actualScore)=>actualScore+=100)
  startGame()
}
},[guessedLetters,letters,startGame]

)
  const retry = () => {

    setGameStage(stages[0].name)
    setScore(0)
    setGuesses(3)
  }

  return (
    <div className="App">
      {gameStage === "start" && <StratScreen startGame={startGame} />}
      {gameStage === "game" && <Game verifyLetter={verifyLetter} pickedWords={pickedWord}
        pickedcategory={pickedcategory}
        letters={letters}
        wrongLetters={wrongLetters}
        guessedLetters={guessedLetters}
        guesses={guesses}
        score={score}

      />}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}

    </div>
  );
}

export default App;
