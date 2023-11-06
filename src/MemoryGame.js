import React, { useEffect, useState } from 'react'
import GameOver from './components/GameOver'
import GameBord from './components/GameBoard';
import game from './game/game'

export default function MemoryGame(){
    const [gameOver,setGameOver] = useState(false);
    const [cards, setCards] = useState([])

    useEffect(()=>{
        setCards(game.createCardsFromTechs())
    },[])
function restart(){
    game.clearCards()
    setCards(game.createCardsFromTechs())
    setGameOver(false)
}

function handleFlip(card){

    game.flipCard(card.id,()=>{
        //GameOverCallBack
        setGameOver(true)
    },()=>{
        //noMatchCallback
        setCards([...game.cards])
    })
    setCards([...game.cards])
}
    return (
        <div>
            <GameBord handleFlip={handleFlip} cards = {cards}></GameBord>
            <GameOver show = {gameOver} handleRestart = {restart}></GameOver>
        </div>
    )
}