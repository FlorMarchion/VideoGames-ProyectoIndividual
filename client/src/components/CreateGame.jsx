import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGenres, createVideoGame } from '../actions/index.js'
import styles from './styles/CreateGame.module.css';


const CreateGame = () => {
  const { container, inputForm } = styles;
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
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

  useEffect(() => {
    dispatch(getGenres()); //recibe la accion
  }, [dispatch]);

  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    name: '',
    image: '',
    description: '',
    released: '',
    rating: 0,
    platforms: [],
    genres: [],
  })

  //------------VALIDACIONES/ERRORS ------------------
  const validators = (values) => {
    let errors = {};
    if (!values.name || (/^[a-zA-Z ]{1,3}$/).test(values.name)) {
      errors.name = '*Please enter the name of the game, must be at least 3 characters long';
    }
    if (!values.description) {
      errors.description = '* Please enter the videogame description. (Max 100 characters)'
    }
    if (!values.rating || values.rating === '0') {
      errors.rating = "Please insert a number between 0.5 and 5"
    }
    if (!values.released) {
      errors.released = "Please insert a date"
    }
    if (values.platforms.length === 0) {
      errors.platforms = '*Please select at least one platform'
    }
    if (!values.genres) {
      errors.genres = '*Please select at least one genre'
    }
    return errors
  }

  const handleChange = (e) => { //cuando hay un cambio se dispara esta funcion con un e
    e.preventDefault()
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
    setErrors(
      validators({
        ...values,
        [e.target.name]: e.target.value,
      })
    );
  }

  //-------------------------------------------------------SUBMIT----------------------------------------------------------
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
      dispatch(createVideoGame(values));
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

  return (
    <div>
      <h1>Create your VideoGame</h1>
      <h5>Fill in the following form:</h5>
      <form className={container} autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
        {/* --------------------------------------NAME---------------------------------------- */}
        <div>
          <input
            className={errors.name && 'danger'}
            type='text'
            placeholder='Videogame Name...'
            name='name' // nombre del input
            value={values.name} // valor dinámico del input que se actualiza mientras se escribe dentro del mismo
            onChange={(e) => handleChange(e)} // onChange es un "detector" que dispara un "algo/evento" cuando detecta un cambio
          />
          {errors.name && (
            <p className={errors.name && 'danger'}>{errors.name}</p>
          )}
        </div>
        {/* --------------------------------------IMAGE---------------------------------------- */}
        <div>
          <input
            className={inputForm}
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
            className={errors.description && 'danger'}
            type='text'
            placeholder='Description...'
            name='description'
            maxLength='100'
            value={values.description}
            onChange={(e) => handleChange(e)}
          />
          {errors.description && (
            <p className={errors.description && 'danger'}>{errors.description}</p>
          )}
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
          {errors.released && (
            <p className={errors.released && 'danger'}>{errors.released}</p>
          )}
        </div>
        {/* --------------------------------------RATING---------------------------------------- */}
        <div>
          <input
            className={errors.rating && 'danger'}
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
          {errors.rating && (
            <p className={errors.rating && 'danger'}>{errors.rating}</p>
          )}
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
            {values.platforms.length ? values.platforms.map((el, i) => (
              <div className='result' key={i}>
                <li>
                  {el}
                  <button onClick={(e) => { handleDeletePlatform(e, el) }}>x</button>
                </li>
              </div>
            ))
              : errors.platforms && (
                <p className={errors.platforms && 'danger'}>{errors.platforms}</p>
              )
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
                    {el}
                  </option>
                )
              })
              }
            </select>
          </label>
          {/* ----------------------------------------GENRES LIST----------------------------------- */}
          <ul className='lista'>
            {values.genres.length ? values.genres.map((el, i) => (
              <div className='result' key={i}>
                <li>
                  {el}
                  <button onClick={(e) => { handleDeleteGenre(e, el) }}>x</button>
                </li>
              </div>)
            ) :
              errors.platforms && (
                <p className={errors.platforms && 'danger'}>{errors.platforms}</p>
              )
            }
          </ul>
        </div>
        <button type='submit'>Create Videogame</button>
      </form>
    </div>
  )
}

export default CreateGame
