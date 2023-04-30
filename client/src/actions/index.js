//ACTIONS
import axios from 'axios';
import {
    GET_ALL_VIDEOGAMES,
    GET_VIDEOGAME_BY_ID,
    GET_GENRES,
    ORDER_ALPHABETICALLY,
    ORDER_BY_RAITING,
    FILTER_BY_GENRES,
    GET_VIDEOGAMES_BY_ORIGIN,
    GET_VIDEOGAMES_BY_NAME,
    DELETED_GAME,
    DELETE_STATES,
} from './types.js'


export const getAllVideoGames = () => {
    return async function (dispatch) {
        let response = await axios.get(`${process.env.REACT_APP_API}videogames`, {})
        return dispatch({
            type: GET_ALL_VIDEOGAMES,
            payload: response.data
        })
    }
}

export const getDetailVideoGame = (id) => {
    return async function (dispatch) {
        try {
            let response = await axios.get(`${process.env.REACT_APP_API}videogames/${id}`);
            return dispatch({
                type: GET_VIDEOGAME_BY_ID,
                payload: response.data
            })
        } catch (error) {
            return {
                error: 'No hay detalles para mostrar',
                originalError: error,
            }
        }
    }
}

export const createVideoGame = (payload) => {
    return async function () {
        try {
            let {
                name,
                image,
                description,
                released,
                rating,
                platforms,
                genres
            } = payload;
            let response = await axios.post(`${process.env.REACT_APP_API}videogames`, {
                name,
                image,
                description,
                releaseDate: new Date(released),
                rating,
                platforms,
                genres,
            })
            return response;
        } catch (error) {
            return {
                error: "Can't Create Videogame",
                originalError: error
            }
        }
    }
}

export const getGenres = (payload) => {
    return async function (dispatch) {
        try {
            let response = await axios.get(`${process.env.REACT_APP_API}genres`, payload)
            return dispatch({
                type: GET_GENRES,
                payload: response.data
            });
        } catch (error) {
            return {
                error: "Can't Get Genres",
                originalError: error
            }
        }
    }
}

export const orderAlphabetically = (payload) => {
    return {
        type: ORDER_ALPHABETICALLY,
        payload
    }
}

export const orderByRating = (payload) => {
    return {
        type: ORDER_BY_RAITING,
        payload
    }
}

export const filterByGenres = (payload) => {
    return {
        type: FILTER_BY_GENRES,
        payload
    }
}

export const getVideoGamesByOrigin = (payload) => {
    return {
        type: GET_VIDEOGAMES_BY_ORIGIN,
        payload
    }
}

export const getVideogameByName = (name) => {
    return async function (dispatch) {
        try {
            let response = await axios.get(`${process.env.REACT_APP_API}videogames?name=${name}`)
            return dispatch({
                type: GET_VIDEOGAMES_BY_NAME,
                payload: response.data
            })
        } catch (err) {
            return {
                error: "No games found with that name.",
                originalError: err
            }
        }
    }
}

export const deleteVideoGame = (id) => {
    return async function (dispatch) {
        try {
            console.log(id)
            let response = await axios.delete(`${process.env.REACT_APP_API}videogames/${id}`)
            return dispatch({
                type: DELETED_GAME,
                payload: response.data
            })
        } catch (error) {
            return {
                error: 'No se pudo eliminar el juego',
                originalError: error
            }
        }
    }
}

export const deleteStates = () => {
    return async function (dispatch) {
        return dispatch({
            type: DELETE_STATES,
        })
    }
}

export const searchGameByPlatforms = () => { }
export const modifyVideoGame = (payload) => { }

