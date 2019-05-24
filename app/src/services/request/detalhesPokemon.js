import axios from 'axios'

import {
    fetchDetalhesPokemon, 
    fetchDetalhesLoading,
    fetchDetalhesError
} from '../../redux/reducers/detalhesPokemonReducer'

export const getDetalhesPokemon = (url) => {
    console.log(url)
    return dispatch => {
        dispatch(fetchDetalhesLoading())
        axios.get(url)
            .then(res => {
                console.log(res)
                dispatch(fetchDetalhesPokemon(handlerSuccessPokemon(res)))
            })
            .catch(err => console.log(err))
    }
}

const handlerSuccessPokemon = response => {
    let pokemonData = response.data
    return {
        _id: pokemonData.id,
        height: pokemonData.height,
        weight: pokemonData.weight,
        games: pokemonData.game_indices,
        spriteFront: pokemonData.sprites.front_default,
        spriteBack: pokemonData.sprites.back_default,
    }
}