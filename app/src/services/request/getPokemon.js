import { urlBase } from '../urlBasePokemon'
import { 
    fetchPokemon, 
    fetchPokemonLoading, 
    fetchPokemonError, 
    fetchNewList
} from '../../redux/reducers/getPokemonReducer'
import { 
    sucessoGetFirstList,
    errorRequest,
    sucessoNewList
} from '../handlerResponse/handler'

export const getPokemonList = () => {
    return async dispatch => {
        dispatch(fetchPokemonLoading())
        urlBase.get('/pokemon')
            .then(res => {
                console.log(res)
                let success = sucessoGetFirstList(res)
                dispatch(fetchPokemon(success.list, success.nextList))
            })
            .catch(err => {
                console.log(err)
                dispatch(fetchPokemonError(errorRequest(err).mensagem))
            })
    }
}

function handlerNewURL(url) {
    return url.split('/').pop()

}

export const getNewList = url => {
    console.log(handlerNewURL(url))
    return async dispatch => {
        dispatch(fetchPokemonLoading())
        urlBase.get(handlerNewURL(url))
            .then(res => {
                console.log(res)
                let resposta = sucessoNewList(res)
                dispatch(fetchNewList(resposta.list, resposta.next, resposta.previous))
            })
            .catch(err => {
                console.log(err)
                dispatch(fetchPokemonError(errorRequest(err).mensagem))
            })
    }
}