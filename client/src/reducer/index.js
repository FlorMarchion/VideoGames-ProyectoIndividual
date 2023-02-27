//REDUCER
import {
    GET_ALL_VIDEOGAMES,
    GET_VIDEOGAME_BY_ID,
    CREATE_GAME,
    GET_GENRES
} from '../actions/types.js';

const initialState = {
    videogames: [],
    getAllVideoGames: [],
    genres: [],
    details: [],
};

function rootReducer(state = initialState, action) {
    const {
        type,
        payload
    } = action;


    switch (type) {
        case GET_ALL_VIDEOGAMES:
            return {
                ...state,
                videogames: payload,
                getAllVideoGames: payload
            };
        case GET_VIDEOGAME_BY_ID:
            return {
                ...state,
                details: payload,
            };
        case CREATE_GAME:
            return {
                ...state,
            }
            case GET_GENRES:
                return {
                    ...state,
                    genres: payload,
                }
        default:
            return state;
    }


}



export default rootReducer;