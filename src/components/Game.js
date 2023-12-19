import "./Game.css";
import {useState,useRef} from "react"
export const Game = ({ verifyLetter, pickedWord, letters, wrongLetters, guessedLetters, guesses, score, pickedcategory }) => {
const[letter,setLetter]=useState("");
const inputRef=useRef(null)
const handleSubmit=(e)=>{
e.preventDefault();
verifyLetter(letter);
setLetter(""); 
inputRef.current.focus();
}
  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>
      <h1>Adivinhe a palavra:</h1>
      <h3 className="tip">
        Dica sobre a palavra:
        <span>{pickedcategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativas...</p>
      <div className="wordContainer">
        {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span className="letter" key={i}>
              {letter}
            </span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        )}
      </div>
      <div className="letterContainer">
        <p>Tente adivinhar uma  letra da palavra...</p>
        <form onSubmit={handleSubmit}>
          <input type="text" name="letter" required onChange={(e)=>setLetter(e.target.value)} 
          value={letter}
          ref={inputRef}
          />
          <button>Jogar!</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras já utilizadas:</p>
        {wrongLetters.map((letter, i) => (<span key={i}>{letter}</span>))}
      </div>
    </div>
  )
}
