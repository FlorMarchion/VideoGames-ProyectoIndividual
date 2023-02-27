
//ACTIONS

import axios from 'axios';
import {
    GET_ALL_VIDEOGAMES,
    GET_VIDEOGAME_BY_ID,
    CREATE_GAME,
    GET_GENRES,
    GET_PLATFORMS
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
    console.log(payload)
    return async function (){
        try{
            let response = await axios.post(`http://localhost:3001/videogames`, payload)
            console.log(response)
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
    return async function(dispatch){
        try{
            let response = await axios.get(`http://localhost:3001/genres`, payload)
            return dispatch({
                type: GET_GENRES,
                payload: response.data
            });
        }catch (error) {
            return{
                error: "Can't Get Genres",
                originalError: error
            }
        }
    }
}




export const modifyVideoGame = (payload) => {}

export const deleteVideoGame = (id) => {}

