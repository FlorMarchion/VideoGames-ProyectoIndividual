import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Card from "./Card.jsx"
import Loading from "./Loading";
import styles from './styles/Home.module.css'
import {
    getAllVideoGames,
    getGenres,
    filterByGenres,
    getVideogameByName,
    getVideoGamesByOrigin,
    orderAlphabetically,
    orderByRating,
} from '../actions/index.js'

//Components
import Paged from "./Paged";

const Home = () => {
    // ------ PAGINADO -------
    const dispatch = useDispatch()
    const allVideogames = useSelector((state) => state.videogames)
    const genres = useSelector((state) => state.genres);
    //Estado de la página: 
    const [currentPage, setCurrentPage] = useState(1);
    const [videoGamesPP,] = useState(15);
    //division del array por cantidad de páginas requeridas
    const indexOfLastVideoGame = currentPage * videoGamesPP; // 1 *  15
    const indexOfFirstVideoGame = indexOfLastVideoGame - videoGamesPP; // 0 
    const [current, setCurrent] = useState([]); //current 15VG

    useEffect(() => {
        dispatch(getGenres())
        let vg = allVideogames && allVideogames;
        if (vg.length === 0) {
            dispatch(getAllVideoGames())
        }
        setCurrent(
            allVideogames.slice(indexOfFirstVideoGame, indexOfLastVideoGame)
        )
    }, [allVideogames, indexOfFirstVideoGame, indexOfLastVideoGame, dispatch]
    );
    const paged = (pageNumbers) => {
        setCurrentPage(pageNumbers);
    };
    //--------------------------
    const [isHiden, setIsHiden] = useState(false);
    const [search, setSearch] = useState({ //input de busqueda
        name: '',
    });

    const handleOrderAlphabetically = (e) => {
        e.preventDefault()
        dispatch(orderAlphabetically(e.target.value))
        setCurrentPage(1)
        setCurrent(
            allVideogames.slice(indexOfFirstVideoGame, indexOfLastVideoGame)
        )
    }
    const handleOrderRating = (e) => {
        e.preventDefault()
        dispatch(orderByRating(e.target.value))
        setCurrentPage(1)
        setCurrent(
            allVideogames.slice(indexOfFirstVideoGame, indexOfLastVideoGame)
        )
    }
    const handleFilterGenres = (e) => {
        e.preventDefault()
        dispatch(filterByGenres(e.target.value))
        setCurrentPage(1)
        setCurrent(
            allVideogames.slice(indexOfFirstVideoGame, indexOfLastVideoGame)
        )
    }
    const handleGetVideoGamesByOrigin = (e) => {
        e.preventDefault()
        dispatch(getVideoGamesByOrigin(e.target.value));
        setCurrentPage(1)
        // setCurrent(
        //     getAllVideogames.slice(indexOfFirstVideoGame, indexOfLastVideoGame)
        // )
    }
    const handleChange = (e) => {
        e.preventDefault()
        setSearch({
            ...search,
            [e.target.name]: e.target.value,
        })
        dispatch(getVideogameByName(search.name))
        setCurrentPage(1)
        // setCurrent(
        //     getAllVideogames.slice(indexOfFirstVideoGame, indexOfLastVideoGame)
        // )
    }
    const handleSearch = (e) => { //se ejecuta cuando clickeo boton 'go!'
        e.preventDefault();
        dispatch(getVideogameByName(search.name))
        setCurrentPage(1)
        // setCurrent(
        //     getAllVideogames.slice(indexOfFirstVideoGame, indexOfLastVideoGame)
        // )
    }
    // sytles
    const { backgroundImage, containerCard, containerLoading, searchBar } = styles;
    return (
        <>
            <div className={backgroundImage}>
                <nav className={searchBar}>
                    <select onChange={(e) => { handleOrderAlphabetically(e) }}>
                        <option>--Order Alphabetically--</option>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select>

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

                    <select onChange={(e) => { handleGetVideoGamesByOrigin(e) }}>
                        <option>--Filter Games--</option>
                        <option value="All">All Games</option>
                        <option value="Created">My Games</option>
                        <option value="From Api">Api Games</option>
                    </select>

                    <Link to="/createGame">
                        <button>Create VideoGame</button>
                    </Link>

                    <div>
                        <input
                            autoComplete="off"
                            type="text"
                            placeholder="Search Videgame"
                            name='name'
                            value={search.name}
                            onChange={(e) => handleChange(e)}
                        />
                        <button onClick={(e) => handleSearch(e)}>Search</button>
                    </div>
                </nav>
                <div style={{ marginTop: "80" }}>
                    <div className={containerCard}>

                        {current.length > 0 ? current.map(el => {
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
                        }) :
                            <div className={containerLoading}>
                                <Loading />
                            </div>
                        }
                    </div>
                </div>
                <Paged
                    videoGamesPP={videoGamesPP}
                    allVideoGames={allVideogames.length}
                    paged={paged}
                />
            </div>
        </>
    )

}
export default Home;