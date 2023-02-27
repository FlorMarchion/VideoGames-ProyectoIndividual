import React, { useState, useEffect } from "react";
import styles from './styles/Home.module.css';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "./Card.jsx"
import SearchBar from "./SearchBar.jsx";
import Loading from "./Loading";

const Home = () => {

    //traigo los videogames
    const getAllVideogames = useSelector((state) => state.videogames)


    //creo un estado inicial para despues setearlo con los videogames.
    const [videoGames, setVideoGames] = useState([])

    //cargo los videogames.
    useEffect(() => {
        setVideoGames(getAllVideogames);
    }, [getAllVideogames])

    return (
        <>
            <SearchBar />
            <div className="container-card">
                {videoGames.length > 0 ? videoGames.map(el => {
                    return (
                        <Link key={el.id} to={`/videogame/${el.id}`}>
                            <Card name={el.name} img={el.img} genres={el.genres} />
                        </Link>
                    )
                }) : <Loading />}
            </div>


        </>
    )

}
export default Home;