import { combineReducers } from 'redux'
import { getPokemonReducer } from './getPokemonReducer'
import { detalhesPokemonReducer } from './detalhesPokemonReducer'

export const reducers = combineReducers({
    getPokemonState: getPokemonReducer,
    detalhesPokemonState: detalhesPokemonReducer
})