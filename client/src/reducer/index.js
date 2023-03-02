//REDUCER
import {
    GET_ALL_VIDEOGAMES,
    GET_VIDEOGAME_BY_ID,
    CREATE_GAME,
    GET_GENRES,
    ORDER_ALPHABETICALLY,
    ORDER_BY_RAITING,
    FILTER_BY_GENRES,
    GET_VIDEOGAMES_DB,
    GET_VIDEOGAMES_BY_NAME,
    DELETE_PREVIOUS_STATE
} from '../actions/types.js';

const initialState = {
    videogames: [], // este estado se llama ni bien se ejecuta la app
    getAllVideoGames: [], //LA COPIA DONDE FILTRO PARA PISAR VIDEOGAMES Y MOSTRAR
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
            return {
                ...state,
                getAllVideoGames: payload,
                videogames: payload,
            };
        case GET_VIDEOGAME_BY_ID:
            return {
                ...state,
                details: payload,
            };
        case DELETE_PREVIOUS_STATE:
            return {
                ...state,
                details: []
            }
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
                getAllVideoGames: sortedArr
            };
        case ORDER_BY_RAITING:
            const ratingFiltered = payload === 'max' ?
                state.getAllVideoGames.sort((a, b) => {
                    if (a.rating < b.rating) {
                        return 1
                    }
                    if (b.rating < a.rating) {
                        return -1
                    } else {
                        return 0
                    }
                }) :
                state.getAllVideoGames.sort((a, b) => {
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
                videogames: ratingFiltered,
            };
        case FILTER_BY_GENRES:
            const allVideoGames = state.getAllVideoGames;
            const filteredArr =
                allVideoGames.filter(el => el.genres.includes(payload))
            return {
                ...state,
                videogames: filteredArr
            };
        case GET_VIDEOGAMES_DB:
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
            }
        default:
            return state;
    }


}



export default rootReducer;