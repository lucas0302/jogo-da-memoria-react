import React from 'react'

//Criando a carta
export default function CardElement(props){
    return (// o ? serve para verificar se e verdadeiro e o : e para falso
        <div onClick={()=>{props.handleFlip(props.card)}} id={props.card.id} className={`card ${props.card.flipped?"flip" : ""}`}>
            <div className='card_front'> 
                <img className='icon' src={`assets/images/${props.card.icon}.png`} alt={props.card.icon}/>
            </div>
            <div className='card_back'>
                {"?"}
            </div>
            
        </div>
    )
}