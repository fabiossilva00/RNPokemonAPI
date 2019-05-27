import { 
    GET_DETALHES_POKEMON,
    GET_POKEMON_LOADING,
    GET_POKEMON_ERROR,
    URL_DETALHES_POKEMON
} from '../actions/actionTypes'

const initialState = {
    pokemon: {},
    pokemonSelecionado: null,
    loading: false,
    errorMessage: ''
}

export const detalhesPokemonReducer = (state = initialState, action) => {
    switch (action.type) {
        case URL_DETALHES_POKEMON:
            return{
                ...state,
                pokemonSelecionado: action.payload
            }
        case GET_DETALHES_POKEMON:
            return {
                ...state,
                pokemon: action.payload,
                loading: action.loading
            }
        case GET_POKEMON_LOADING:
            console.log(action)
            return {
                ...state,
                loading: action.payload,
                errorMessage: action.error
            }
        case GET_POKEMON_ERROR:
            return {
                ...state,
                errorMessage: action.payload,
                loading: action.loading
            }
        default: 
            return state
    }
}

export const fetchDetalhesPokemon = pokemon => {
    console.log(pokemon)
    return {
        type: GET_DETALHES_POKEMON,
        payload: pokemon,
        loading: false
    }
}

export const getURLDetalhesPokemon = dados => {
    return {
        type: URL_DETALHES_POKEMON,
        payload: dados,
    }
}

export const fetchDetalhesLoading = () => {
    return {
        type: GET_POKEMON_LOADING,
        payload: true,
        error: ''
    }
}

export const fetchDetalhesError = error => {
    return {
        type: GET_POKEMON_ERROR,
        payload: error,
        loading: false
    }
}