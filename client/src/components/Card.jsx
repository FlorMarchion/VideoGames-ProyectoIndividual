import React from 'react'

const Card = (props) => {

    const {
        name,
        img,
        genres
    } = props

    return (
        <>
            <div>
                <h3>{name}</h3>
                <img src={img} alt="img" style={{ maxWidth: "30%", margin: "20px" }} />
                <h6> {genres}</h6>
            </div>
        </>
    )
}

export default Card
