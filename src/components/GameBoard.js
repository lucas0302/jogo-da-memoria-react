import CardElement from './CardElement'
// tabuleiro do jogo
export default function GameBord(props) {
    return (
        <div id='gameBoard' >
            {props.cards.map((card, index)=>
            <CardElement handleFlip={props.handleFlip} key ={index} card={card}></CardElement> // colocando a img da carta relativa com seu id
            )}
        </div>
    )
}