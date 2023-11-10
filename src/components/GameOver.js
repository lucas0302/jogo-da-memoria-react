import React, { Fragment } from 'react'

export default function GameOver(props) {
    return (props.show? // esse if ternario serve pra mostrar ou não o conteudo 
        <div id="gameOver">
            <div>
                Parabéns, você completou o jogo!
            </div>
            <button id="restart" onClick={props.handleRestart}>Jogue novamente</button>
        </div>:<Fragment/> // fragment mostra uma div vazia
    )
}