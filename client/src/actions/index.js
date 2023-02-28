
//ACTIONS

import axios from 'axios';
import {
    GET_ALL_VIDEOGAMES,
    GET_VIDEOGAME_BY_ID,
    GET_GENRES,
    ORDER_ALPHABETICALLY,
    ORDER_BY_RAITING
} from './types.js'


export const getAllVideoGames = () => {
    return async function (dispatch) {
        let response = await axios.get(`http://localhost:3001/videogames`, {})
        return dispatch({
            type: GET_ALL_VIDEOGAMES,
            payload: response.data
        })
    }
}

export const getDetailVideoGame = (id) => {
    return async function (dispatch) {
        try {
            let response = await axios.get(`http://localhost:3001/videogames/${id}`);
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
            let response = await axios.post(`http://localhost:3001/videogames`, {
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
            let response = await axios.get(`http://localhost:3001/genres`, payload)
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

export const searchGameByGenre = () => { }
export const searchGameByPlatforms = () => { }
export const searchMyVideogames = () => { }
export const modifyVideoGame = (payload) => { }
export const deleteVideoGame = (id) => { }

