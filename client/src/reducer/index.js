//REDUCER
import { getAllVideoGames } from '../actions/index.js';
import {
    GET_ALL_VIDEOGAMES,
    GET_VIDEOGAME_BY_ID,
    CREATE_GAME,
    GET_GENRES,
    ORDER_ALPHABETICALLY,
    ORDER_BY_RAITING,
    FILTER_BY_GENRES,
    GET_VIDEOGAMES_BY_ORIGIN,
    GET_VIDEOGAMES_BY_NAME,
    DELETED_GAME,
    DELETE_STATES,
} from '../actions/types.js';

const initialState = {
    videogames: [], // este estado se llama ni bien se ejecuta la app
    getAllVideoGames: [], //LA COPIA DONDE FILTRO PARA PISAR VIDEOGAMES Y MOSTRAR
    getAllVideoGames2: [],
    genres: [], // este estado se llama ni bien se ejecuta la app
    details: [],
};

function rootReducer(state = initialState, action) {
    const {
        type,
        payload
    } = action;

    switch (type) {
        case GET_ALL_VIDEOGAMES:
            if (state.videogames.length > 0) {
                return {
                    videogames: state.videogames,
                    getAllVideoGames: state.getAllVideoGames
                }
            }
            return {
                ...state,
                getAllVideoGames: payload,
                videogames: payload,
                details: [],
            };
        case GET_VIDEOGAME_BY_ID:
            return {
                ...state,
                details: payload,
            };
        case CREATE_GAME:
            return {
                ...state,
            };
        case GET_GENRES:
            return {
                ...state,
                details: [],
                genres: payload,
            };
        case ORDER_ALPHABETICALLY:
            const sortedArr = payload === 'asc' ?
                state.videogames.sort((a, b) => {
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
                state.videogames.sort((a, b) => {
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
                videogames: sortedArr,
                getAllVideoGames: sortedArr,
                getAllVideoGames2: sortedArr,
            };
        case ORDER_BY_RAITING:
            const ratingFiltered = payload === 'max' ?
                state.videogames.sort((a, b) => {
                    if (a.rating < b.rating) {
                        return 1
                    }
                    if (b.rating < a.rating) {
                        return -1
                    } else {
                        return 0
                    }
                }) :
                state.videogames.sort((a, b) => {
                    if (a.rating < b.rating) {
                        return -1
                    }
                    if (b.rating < a.rating) {
                        return 1
                    } else {
                        return 0
                    }
                });
            return {
                ...state,
                getAllVideoGames: ratingFiltered,
                videogames: ratingFiltered,
                getAllVideoGames2: ratingFiltered,
            };
        case FILTER_BY_GENRES:
            const allVideoGames = state.getAllVideoGames;
            const filteredArr =
                allVideoGames.filter(el => el.genres.includes(payload))
            return {
                ...state,
                getAllVideoGames: state.getAllVideoGames,
                videogames: filteredArr
            };
        case GET_VIDEOGAMES_BY_ORIGIN:
            let filterMyGames;
            if (payload === 'Created') {
                filterMyGames = state.getAllVideoGames.filter(el => el.createdInDb === true)
                return {
                    ...state,
                    videogames: filterMyGames
                }
            } else if (payload === 'From Api') {
                filterMyGames = state.getAllVideoGames.filter(el => !el.createdInDb)
                return {
                    ...state,
                    videogames: filterMyGames
                }
            } else if (payload === 'All') {
                filterMyGames = state.getAllVideoGames
                return {
                    ...state,
                    videogames: filterMyGames
                }
            };
        case GET_VIDEOGAMES_BY_NAME:
            return {
                ...state,
                videogames: payload
            };

        case DELETED_GAME:

            return {
                ...state,
                videogames: payload
            };

        case DELETE_STATES:
            return {
                videogames: [],
                getAllVideoGames: [],
                genres: [],
                details: [],
            };
        default:
            return state;
    }


}



export default rootReducer;