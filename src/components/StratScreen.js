import "./StratScreen.css"

export  const StratScreen = ({startGame}) => {
  return (
    <div className="start">
     <h1>Secret Word</h1>
     <p>Clique para começar a jogar</p>
     <button onClick={startGame}>Começar o jogo</button>
    </div>
  )
}
