import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGenres, createVideoGame } from '../actions/index.js'
import styles from './styles/CreateGame.module.css';


const CreateGame = (props) => {
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
    rating: '',
    platforms: [],
    genres: [],
  })


  //------------VALIDACIONES/ERRORS ------------------

  const validators = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = '*Please enter the name of the game'
    }
    if (!values.description) { errors.description = '* Please enter the videogame description. (Max 100 characters)' }
    if (!values.platforms.length === 0) { errors.platforms = '*Please select at least one platform' }
    if (!values.genres) { errors.genres = '*Please select at least one genre' }
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
    if (values === {
      name: '',
      image: 'https://media.rawg.io/media/games/53f/53f65f1a0988374c18b5ee3dddbf0399.jpg',
      description: '',
      released: new Date(),
      rating: '',
      platforms: [],
      genres: [],
    }) {
      alert('Missing data, please try to fill all the fields required')
    } else if (Object.values(errors).length > 0) {
      alert('Missing data, please try to fill all the fields required')
    }
    else {
      if (values.image === null || values.image === '') {
        values.image = 'https://media.rawg.io/media/games/53f/53f65f1a0988374c18b5ee3dddbf0399.jpg'
      }
      if (values.released === null || values.released === '') {
        values.released = new Date();
      }
      dispatch(createVideoGame(values));
      alert('Videogame Created');
      setValues({
        name: '',
        image: '',
        description: '',
        released: '',
        rating: '',
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

      console.log('hubo un cambio')
      console.log('las plataformas de chage platforms :', values.platforms)
    }
    
  }

  const handleDeletePlatform = (e, p) => {
    e.preventDefault();
    setValues((prev) => ({
      ...prev,
      platforms:
      prev.platforms.filter((el) => el !== p)
    }
    ))
    console.log('borre una platform')
    console.log('array platforms nuevo', values.platforms)

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
        <div>
          <input
            className={inputForm}
            type='text'
            placeholder='Image...'
            name='image'
            value={values.image}
            onChange={(e) => handleChange(e)}
          />
        </div>
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
        <div>
          <input
            type='date'
            placeholder='Date...'
            name='releasedDate'
            value={values.released}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Rating..."
            value={values.rating}
            name="rating"
            step="0.5"
            max="5.0"
            min="0.0"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        {/* --------------------------------------PLATFORMS---------------------------------------- */}
        <div>
          <label >
            <h5 className={errors.platforms && 'danger'} > Choose a platform...</h5>
            <select
              name='Platforms'
              onChange={(e) => handleChangePlatform(e)} >
             {/* {<option hidden selected>Platforms</option> } */}
              {platforms.map((el, i) => {
                return (
                  <option key={i} value={el}>
                    {el}
                  </option>
                )
              })}
            </select>
          </label>
          <ul > List:
            {values.platforms.map((el, i) => (
              <div className='result' key={i}>
                <li>
                  {el}
                  <button onClick={(e) => { handleDeletePlatform(e, el) }}>x</button>

                {/* {Error} */}
                  {<errors className="platforms"></errors> && (
            <p className={errors.platforms && 'danger'}>{errors.platforms}</p>
          )}
                </li>
              </div>
            ))
            }
          </ul>
        </div>
        {/* -----------------------------------------GENRES---------------------------------------- */}
        <div>
          <label>
            <h5 lassName={errors.genres && 'danger'} > Choose a genre...</h5>
            <select onChange={(e) => handleChangeGenre(e)} className='Genres' name='Genres'>
             {/* <option hidden selected>Genres</option> */}
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
          <ul className='lista'> List:
            {values.genres?.map((el, i) => (
              <div className='result' key={i}>
                <li>
                  {el}
                  <button onClick={(e) => { handleDeleteGenre(e, el) }}>x</button>
                </li>
              </div>))}
          </ul>
        </div>
        <button type='submit'>Create Videogame</button>
      </form>
    </div>
  )
}

export default CreateGame
