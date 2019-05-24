import { 
    GET_POKEMON_LIST, 
    GET_POKEMON_LOADING, 
    GET_POKEMON_ERROR,
    GET_POKEMON_NEW_LIST,
} from '../actions/actionTypes'

const initialState = {
    pokemonLista:[],
    nextList: '',
    loading: false,
    errorMessage: '',
    previousList: '',
}

export const getPokemonReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POKEMON_LIST:
            return {
                ...state,
                loading: action.loading,
                pokemonLista: action.payload,
                nextList: action.nextList
            }
        case GET_POKEMON_LOADING:
            return {
                ...state,
                loading: action.loading,
                errorMessage: '',
            }
        case GET_POKEMON_ERROR:
            return {
                ...state,
                loading: action.loading,
                errorMessage: action.payload
            }
        case GET_POKEMON_NEW_LIST:
            return {
                ...state,
                loading: action.loading,
                pokemonLista: action.payload,
                nextList: action.nextList,
                previousList: action.previousList
            }
        default:
            return state
    }
}

export const fetchPokemon = (pokemonsList, urlNext) => {
    return {
        type: GET_POKEMON_LIST,
        payload: pokemonsList,
        loading: false,
        nextList: urlNext
    }
}

export const fetchPokemonLoading = () => {
    return {
        type: GET_POKEMON_LOADING,
        loading: true
    }
}

export const fetchPokemonError = (error) => {
    return {
        type: GET_POKEMON_ERROR,
        payload: error,
        loading: false,
    }
}

export const fetchNewList = (pokemonList, nextURL, previousURL) => {
    return {
        type: GET_POKEMON_NEW_LIST,
        loading: false,
        payload: pokemonList,
        nextList: nextURL,
        previousList: previousURL
    }
}
