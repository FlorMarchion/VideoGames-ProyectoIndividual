import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

//Actions
import { getDetailVideoGame} from '../actions/index.js';

const Details = (props) => {
    const dispatch = useDispatch();
    const detailVideoGame = useSelector((state) => state.details);

    useEffect(() => {
        dispatch(getDetailVideoGame(props.match.params.id))
    }, [dispatch, props.match.params.id])

    // logica de los botones de eliminar y modificar...

    const handleDelete = (event) => {
        event.preventDefault();

    }

    return (
        <>
            {detailVideoGame.createdInDb === true
                ?
                <div>
                    <h1>
                        {detailVideoGame.name}
                    </h1>
                    <img src={detailVideoGame.image}
                        alt='imagen'
                        style={{ height: "400px", width: "600px", borderRadius: "50px" }} />
                    <h3>Released at: {detailVideoGame.releaseDate}</h3>
                    <h3>Rating: {detailVideoGame.rating}</h3>
                    <h3>Platforms: {detailVideoGame.platforms.map(el => el)}</h3>
                    <h3>
                        Genres: {detailVideoGame.genres.map(el => el.name).join(' - ')}
                    </h3>
                    <button>Modify...</button>
                    <button>Delete...</button>
                </div>
                :
                <div>
                    <h1>
                        {detailVideoGame.name}
                    </h1>
                    <img src={detailVideoGame.img}
                        alt='imagen'
                        style={{ height: "400px", width: "600px", borderRadius: "50px" }} />
                    <h3>Released at: {detailVideoGame.released}</h3>
                    <h3>Rating: {detailVideoGame.rating}</h3>
                    <h3>Platforms: {detailVideoGame.platforms}</h3>
                    <h3>Genres: {detailVideoGame.genres + ' '}</h3>
                </div>
            }
        </>
    )
}


export default Details;