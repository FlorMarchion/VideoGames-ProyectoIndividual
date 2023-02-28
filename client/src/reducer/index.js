//REDUCER
import {
    GET_ALL_VIDEOGAMES,
    GET_VIDEOGAME_BY_ID,
    CREATE_GAME,
    GET_GENRES,
    ORDER_ALPHABETICALLY,
    ORDER_BY_RAITING
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
        case ORDER_ALPHABETICALLY:
            const sortedArr = payload === 'asc' ?
                state.getAllVideoGames.sort((a, b) => {
                    let nameA = a.name.toLowerCase();
                    let nameB = b.name.toLowerCase();
                    if (nameA > nameB) {
                        return 1
                    }
                    if (nameB > nameA) {
                        return -1
                    } else {
                        return 0
                    }
                }) :
                state.getAllVideoGames.sort((a, b) => {
                    let nameA = a.name.toLowerCase();
                    let nameB = b.name.toLowerCase();
                    if (nameA > nameB) {
                        return -1
                    }
                    if (nameB > nameA) {
                        return 1
                    } else {
                        return 0
                    }
                });
            return {
                ...state,
                videogames: sortedArr
            };
        case ORDER_BY_RAITING:
            const ratingFiltered = payload === 'min' ?
                state.getAllVideoGames.sort((a, b) => {
                    if (a.rating > b.rating) {
                        return 1
                    }
                    if (b.rating > a.rating) {
                        return -1
                    } else {
                        return 0
                    }
                }) :
                state.getAllVideoGames.sort((a, b) => {
                    if (a.rating > b.rating) {
                        return -1
                    }
                    if (b.rating > a.rating) {
                        return 1
                    } else {
                        return 0
                    }
                });
            return {
                ...state,
                videogames: ratingFiltered,
            };
        default:
            return state;
    }


}



export default rootReducer;