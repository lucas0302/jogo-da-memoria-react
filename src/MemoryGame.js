import React, { useEffect, useState } from 'react'
import GameOver from './components/GameOver'
import GameBord from './components/GameBoard';
import game from './game/game'

//pagina principal
export default function MemoryGame(){
    const [gameOver,setGameOver] = useState(false); // statos do game over dependendo de como esta o jogo ele vai ser ou não mostrado
    const [cards, setCards] = useState([]) // catas do jogo

    useEffect(()=>{
        setCards(game.createCardsFromTechs()) // criando as cartas (img)
    },[])

// função de restart
function restart(){
    game.clearCards()
    setCards(game.createCardsFromTechs())
    setGameOver(false)
}
// função de vira as cartas
function handleFlip(card){

//chamando a função de girar a carta
    game.flipCard(card.id,()=>{
        //GameOverCallBack
        setGameOver(true) // mostrar o game over ao final do jogo
    },()=>{
        //noMatchCallback
        setCards([...game.cards]) // se nao for par certo att as carta para o estado mais atual
    })
    setCards([...game.cards])
}
    return (// chamndo as funções
        <div>
            <GameBord handleFlip={handleFlip} cards = {cards}></GameBord> 
            <GameOver show = {gameOver} handleRestart = {restart}></GameOver>
        </div>
    )
}