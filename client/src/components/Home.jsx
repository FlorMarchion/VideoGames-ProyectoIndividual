import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Card from "./Card.jsx"
import Loading from "./Loading";
import styles from './styles/Home.module.css'

//Actions 

//Components
import Paged from "./Paged";
import {
    orderAlphabetically,
    orderByRating,
    filterByGenres,
    searchMyVideogames,
    myVideogames
} from "../actions/index.js";

const Home = () => {
    // sytles
    const { searchBar } = styles;
    //traigo los videogames
    const dispatch = useDispatch(); //dispatch para el redux
    const getAllVideogames = useSelector((state) => state.videogames)
    const genres = useSelector((state) => state.genres);

    // ------ PAGINADO ------- 
    //Estado de la página: 
    const [currentPage, setCurrentPage] = useState(1);
    const [videoGamesPP,] = useState(15);
    //division del array por cantidad de páginas requeridas
    const indexOfLastVideoGame = currentPage * videoGamesPP; // 1 *  15
    const indexOfFirstVideoGame = indexOfLastVideoGame - videoGamesPP; // 0 
    const [current, setCurrent] = useState([]); //current 15VG
    useEffect(() => {
        setCurrent(
            getAllVideogames.slice(indexOfFirstVideoGame, indexOfLastVideoGame)
        )
    }, [getAllVideogames, indexOfFirstVideoGame, indexOfLastVideoGame]
    );
    const paged = (pageNumbers) => {
        setCurrentPage(pageNumbers);
    };
    //--------------------------
    const [isHiden, setIsHiden] = useState(false);

    setTimeout(() => setIsHiden(true), 12000);

    const handleOrderAlphabetically = (e) => {
        e.preventDefault()
        dispatch(orderAlphabetically(e.target.value))
        setCurrentPage(1)
        setCurrent(
            getAllVideogames.slice(indexOfFirstVideoGame, indexOfLastVideoGame)
        )
    }

    const handleOrderRating = (e) => {
        e.preventDefault()
        dispatch(orderByRating(e.target.value))
        setCurrentPage(1)
        setCurrent(
            getAllVideogames.slice(indexOfFirstVideoGame, indexOfLastVideoGame)
        )
    }

    const handleFilterGenres = (e) => {
        e.preventDefault()
        dispatch(filterByGenres(e.target.value))
        setCurrentPage(1)
        setCurrent(
            getAllVideogames.slice(indexOfFirstVideoGame, indexOfLastVideoGame)
        )
    }
    function handleMyVideogames(e) {
        dispatch(myVideogames(e.target.value));
      }

    return (
        <>
            <div className={searchBar}>
                <select onChange={(e) => { handleOrderAlphabetically(e) }}>
                    <option>--Order Alphabetically--</option>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>

                {/* desde más reciente o desde el mas antiguo */}
                {/* <select>
                </select> */}

                <select onChange={(e) => handleOrderRating(e)}>
                    <option>--Rating--</option>
                    <option value="max">Más populares</option>
                    <option value="min">Menos populares</option>
                </select>

                <select onChange={(e) => handleFilterGenres(e)} defaultValue={'default'}>
                    <option value="default" disabled>Genres</option>
                    {genres?.map((el, i) => {
                        return (
                            <option key={i} value={el}>
                                {el}
                            </option>
                        )
                    })
                    }
                </select>  

                <select onChange={(e) => { handleMyVideogames(e) }}>
            <option>--Filter Games--</option>
            <option value="All">All Games</option>
            <option value="Created">My Games</option>
            <option value="From Api">Api Games</option>
          </select>


                <Link to="/createGame">
                    <button>Create VideoGame</button>
                </Link>
                <div>
                    <input type="text" placeholder='Search Game' />
                    <button></button>
                </div>
            </div>
            <div >
                {!isHiden?  <Loading />:
                current.length > 0 ? current.map(el => {
                    return (
                        <Link key={el.id} to={`/videogame/${el.id}`}>
                            <Card
                                name={el.name}
                                img={el.createdInDb ? el.image : el.img}
                                genres={el.createdInDb ?
                                    el.genres.map((el) => el.name).join(' ') :
                                    el.genres.join(' - ')
                                }
                            />
                        </Link>
                    )
                }): 
                <p> No se encuentran datos para mostrar</p>
                }
            </div>
          
            <Paged
                videoGamesPP={videoGamesPP}
                allVideoGames={getAllVideogames.length}
                paged={paged}
            />
        </>
    )

}
export default Home;