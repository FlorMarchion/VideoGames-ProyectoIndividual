import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import styles from './styles/Details.module.css'

//Actions
import { getDetailVideoGame } from '../actions/index.js';

const Details = (props) => {
    const dispatch = useDispatch();
    const detailVideoGame = useSelector((state) => state.details);
    useEffect(() => {
        dispatch(getDetailVideoGame(props.match.params.id))
    }, [dispatch, props.match.params.id])


    const { backgroundImage, containerDetails, genresFont } = styles

    return (
        <div className={backgroundImage}>
            {detailVideoGame.createdInDb === true
                ?
                <div className={containerDetails}>
                    <h1>
                        {detailVideoGame?.name}
                    </h1>
                    <img
                        src={detailVideoGame?.image}
                        alt='imagen'
                    />
                    <h4>Released at: {detailVideoGame?.releaseDate}</h4>
                    <h4>Rating: {detailVideoGame?.rating}</h4>
                    <p dangerouslySetInnerHTML={{ __html: detailVideoGame?.description }}></p>
                    <h3>Platforms: {detailVideoGame.platforms?.map(el => el).join(' - ')}</h3>
                    <h3>
                        Genres: {detailVideoGame.genres?.map(el => el.name).join(' - ')}
                    </h3>
                    {/* <Link to={`/editVideoGame/${detailVideoGame.id}`}>
                        <button>Modify...</button>
                        </Link> */}
                    <button>Delete...</button>
                </div>
                :
                <div className={containerDetails}>
                    <h1>
                        {detailVideoGame?.name}
                    </h1>
                    <img
                        src={detailVideoGame?.img}
                        alt='imagen'
                    />
                    <h4>Released at: {detailVideoGame?.released}</h4>
                    <h4>Rating: {detailVideoGame?.rating}</h4>
                    <p dangerouslySetInnerHTML={{ __html: detailVideoGame?.description }}></p>
                    <h3>Platforms: {detailVideoGame.platforms?.map(el => el).join(' - ')}</h3>
                    <h3>Genres: {detailVideoGame.genres?.map(el => el).join(' - ')}</h3>
                </div>
            }
        </div>
    )
}


export default Details;