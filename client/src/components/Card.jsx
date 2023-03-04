import React from 'react'
import styles from './styles/Card.module.css'

const Card = (props) => {

    const {
        name,
        img,
        genres
    } = props
    const {card, cardImage} = styles
    return (
          
            <div className={card}>
                <h3>{name}</h3>
                <div className={cardImage} style={{backgroundImage: `url(${img})`}}/>

                <h6> {genres}</h6>
            </div>
      
    )
}

export default Card
