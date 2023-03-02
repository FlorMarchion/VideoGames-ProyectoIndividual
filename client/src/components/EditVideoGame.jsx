import React, { useEffect, useState } from 'react'
import { getDetailVideoGame, getGenres } from '../actions/index.js'
import { useDispatch, useSelector } from 'react-redux';
// import styles from './styles/Details.module.css'


const EditVideoGame = (props) => {
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres);
    const detailVideoGame = useSelector((state) => state.details);
    const platforms =
        [
            "PC",
            "PlayStation 5",
            "Xbox One",
            "PlayStation 4",
            "Xbox Series S/X",
            "Nintendo Switch",
            "iOS",
            "Android",
            "Nintendo 3DS",
            "Nintendo DS",
            "Nintendo DSi",
            "macOS",
            "Linux",
            "Xbox 360",
            "Xbox",
            "PlayStation 3",
            "PlayStation 2",
            "PlayStation",
            "PS Vita",
            "PSP",
            "Wii U",
            "Wii",
            "GameCube",
            "Nintendo 64",
            "Game Boy Advance",
            "Game Boy Color",
            "Game Boy",
            "SNES",
            "NES",
            "Classic Macintosh",
            "Apple II",
            "Commodore / Amiga",
            "Atari 7800",
            "Atari 5200",
            "Atari 2600",
            "Atari Flashback",
            "Atari 8-bit",
            "Atari ST",
            "Atari Lynx",
            "Atari XEGS",
            "Genesis",
            "SEGA Saturn",
            "SEGA CD",
            "SEGA 32X",
            "SEGA Master System",
            "Dreamcast",
            "3DO",
            "Jaguar",
            "Game Gear",
            "Neo Geo"
        ];

    const [errors, setErrors] = useState({});// maneja los errores
    const [values, setValues] = useState({})
    //useEffect
    useEffect(() => {
        dispatch(getGenres())
        dispatch(getDetailVideoGame(props.match.params.id))
        setValues({
            name: detailVideoGame.name,
            image: detailVideoGame.image,
            description: detailVideoGame.description,
            released: new Date().toISOString().split('T')[0],
            rating: detailVideoGame.rating,
            platforms: detailVideoGame.platforms,
            genres: detailVideoGame.genres,
        })
    }, [dispatch, props.match.params.id, detailVideoGame.length])

    //Estados
    //Estado con los inputs cargados

    //HANDLES-------------------------
    const handleChangePlatform = (e) => {
        if (values.platforms.includes(e.target.value)) {
            alert('This platform has already been selected.Please choose another')
        } else {
            setValues(
                (state) => ({
                    ...state,
                    platforms: [...state.platforms, e.target.value],
                })
            )
        }

    }

    const handleDeletePlatform = (e, p) => {
        e.preventDefault();
        setValues({
            ...values,
            platforms: values.platforms.filter((el) => el !== p)
        })
    }

    const handleChangeGenre = (e) => {
        if (values.genres.includes(e.target.value)) {
            alert('This genre has already been selected.Please choose another')
        } else {
            setValues(
                (state) => ({
                    ...state,
                    genres: [...state.genres, e.target.value],
                })
            )
        }
    }

    const handleDeleteGenre = (e, g) => {
        e.preventDefault();
        setValues((prev) => ({
            ...prev,
            genres:
                prev.genres.filter((el) => el !== g)
        }))
    }

    const handleChange = (e) => { //cuando hay un cambio se dispara esta funcion con un e
        e.preventDefault()
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
        // setErrors(
        //   validators({
        //     ...values,
        //     [e.target.name]: e.target.value,
        //   })
        // );
    }

    const handleSubmit = (e) => { //se ejecuta cuando envío un formulario.
        e.preventDefault();
        if (values.image === null || values.image === '') {
            values.image = 'https://media.rawg.io/media/games/53f/53f65f1a0988374c18b5ee3dddbf0399.jpg'
        }
        if (!values.name ||
            !values.description ||
            !values.rating ||
            !values.released ||
            !values.platforms ||
            !values.genres
        ) {
            alert("Missing Data to send Form")
        }
        else {
            //   dispatch(createVideoGame(values));
            alert('Videogame Created');
            setValues({
                name: '',
                image: '',
                description: '',
                released: '',
                rating: 0,
                platforms: [],
                genres: [],
            });
        }
    }
    //---------------------------------

    return (
        <>
            <div>
                <h1>Create your VideoGame</h1>
                <h5>Fill in the following form:</h5>
                <form
                    autoComplete="off"
                    onSubmit={(e) => handleSubmit(e)}
                >
                    {/* --------------------------------------NAME---------------------------------------- */}
                    <div>
                        <input
                            // className={errors.name && 'danger'}
                            type='text'
                            placeholder='Videogame Name...'
                            name='name' // nombre del input
                            value={values.name && values.name} // valor dinámico del input que se actualiza mientras se escribe dentro del mismo
                            onChange={(e) => handleChange(e)} // onChange es un "detector" que dispara un "algo/evento" cuando detecta un cambio
                        />
                        {/* {errors.name && (
            <p className={errors.name && 'danger'}>{errors.name}</p>
          )} */}
                    </div>
                    {/* --------------------------------------IMAGE---------------------------------------- */}
                    <div>
                        <input
                            // className={inputForm}
                            type='text'
                            placeholder='Image Url...'
                            name='image'
                            value={values.image}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    {/* --------------------------------------DESCRIPTION---------------------------------------- */}
                    <div>
                        <input
                            // className={errors.description && 'danger'}
                            type='text'
                            placeholder='Description...'
                            name='description'
                            maxLength='100'
                            value={values.description}
                            onChange={(e) => handleChange(e)}
                        />
                        {/* {errors.description && (
            <p className={errors.description && 'danger'}>{errors.description}</p>
          )} */}
                    </div>
                    {/* --------------------------------------RELEASED---------------------------------------- */}
                    <div>
                        <input
                            type='date'
                            placeholder='Date...'
                            name="released"
                            value={values.released}
                            onChange={(e) => handleChange(e)}
                        />
                        {/* {errors.released && (
            <p className={errors.released && 'danger'}>{errors.released}</p>
          )} */}
                    </div>
                    {/* --------------------------------------RATING---------------------------------------- */}
                    <div>
                        <input
                            // className={errors.rating && 'danger'}
                            type="number"
                            placeholder="Rating..."
                            value={values.rating}
                            name="rating"
                            step={0.5}
                            max={5.0}
                            min={0.0}
                            onChange={(e) => {
                                handleChange(e);
                            }}
                        />
                        {/* {errors.rating && (
            <p className={errors.rating && 'danger'}>{errors.rating}</p>
          )} */}
                    </div>
                    {/* --------------------------------------PLATFORMS---------------------------------------- */}
                    <div>
                        <label >
                            <h5 > Choose a platform...</h5>
                            <select
                                // className={errors.platforms && 'danger'}
                                name='Platforms'
                                onChange={(e) => handleChangePlatform(e)}
                                defaultValue={'default'}
                            >
                                {<option value="default" disabled>Platforms</option>}
                                {platforms.map((el, i) => {
                                    return (
                                        <option key={i} value={el}>
                                            {el}
                                        </option>
                                    )
                                })}
                            </select>
                        </label>
                        {/* ----------------------------------------PLATFORMS LIST----------------------------------- */}

                        <ul>
                            {values.platforms && values.platforms.map((el, i) => (
                                <div className='result' key={i}>
                                    <li>
                                        {el}
                                        <button onClick={(e) => { handleDeletePlatform(e, el) }}>x</button>
                                    </li>
                                </div>
                            ))
                                //   : errors.platforms && (
                                //     <p className={errors.platforms && 'danger'}>{errors.platforms}</p>
                                //   )
                            }
                        </ul>
                    </div>
                    {/* -----------------------------------------GENRES---------------------------------------- */}
                    <div>
                        <label>
                            <h5 className={errors.genres && 'danger'} > Choose a genre...</h5>
                            <select onChange={(e) => handleChangeGenre(e)}
                                className='Genres'
                                name='Genres'
                                defaultValue={'default'}
                            >
                                <option value="default" disabled>Genres</option>
                                {genres?.map((el, i) => {
                                    return (
                                        <option key={i} value={el}>
                                            {el.name}
                                        </option>
                                    )
                                })
                                }
                            </select>
                        </label>
                        {/* ----------------------------------------GENRES LIST----------------------------------- */}
                        <ul className='lista'>
                            {values.genres && values.genres.map((el, i) => (
                                <div className='result' key={i}>
                                    <li>
                                        {el.name}
                                        <button onClick={(e) => { handleDeleteGenre(e, el) }}>x</button>
                                    </li>
                                </div>)
                            )
                                //  :
                                //   errors.platforms && (
                                //     <p className={errors.platforms && 'danger'}>{errors.platforms}</p>
                                //   )
                            }
                        </ul>
                    </div>
                    <button type='submit'>Confirm Changes...</button>
                </form>
            </div>



        </>
    )
}


export default EditVideoGame
