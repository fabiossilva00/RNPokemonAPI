import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { getPokemonList, getNewList } from '../services/request/getPokemon'
import { getURLDetalhesPokemon } from '../redux/reducers/detalhesPokemonReducer'

const setaDireta = require('../assets/iconeSetaDireita.png')
const setaMudaLista = require('../assets/iconChevronRight.png')

class ListaPokemon extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            listaExibe: []
        }
    }

    componentWillReceiveProps() {
        this.setState((state, props) => {
            return ({ listaExibe: props.pokeLista })
        })
    }
    
    _renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={{height: hp('5%'), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 0.5, marginHorizontal: 15, marginVertical: 5}}
                onPress={() => this.props.urlPokemon(item)}
            >
                <Text style={{fontSize: hp('2.6%')}}>{item.name.toUpperCase()}</Text>
                <Image style={{height: 35, width: 35}}
                    source={setaDireta}
                />       
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <FlatList 
                data={this.state.listaExibe}
                extraData={this.state}
                renderItem={this._renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        )
    }
}

class Main extends React.Component {

    componentDidMount() {
        console.log(this.props)
        this.props.getPokemonList()
    }

    _loadingPontinhos = () => {
        return(
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
                <Text>Loading...</Text>
            </View>
        )
    }

    _errorMessage = (err) =>  {
        return (
            <View style={{alignSelf: 'center', alignItems: 'center', flex: 2, justifyContent: 'center'}}>
                <Text style={{}} >{err}</Text>
                <TouchableOpacity style={{marginTop: 50}}
                    onPress={() => this.props.getPokemonList()}
                >
                    <Text style={{color: 'royalblue'}} >Tentar Novamente</Text>
                </TouchableOpacity>
            </View>
        )
    }

    _pokeListaDiferentes = (urlNext, urlPrevious) => {
        return (
            <View style={{flexDirection: 'row', marginHorizontal: 5, marginVertical: 10, alignSelf: 'center'}} >
                {
                    this.props.previousList != '' ?
                    (<TouchableOpacity 
                        onPress={() => this.props.getNewList(urlPrevious)}
                    >
                        <Image style={{height: 25, width: 25, transform:[{rotateY: '180deg'}]}}
                            source={setaMudaLista}
                        />
                    </TouchableOpacity>)
                    : null
                }
                {
                    this.props.nextList != '' ?
                    (<TouchableOpacity 
                        onPress={() => this.props.getNewList(urlNext)}
                    >
                        <Image style={{height: 25, width: 25}}
                            source={setaMudaLista}
                        />
                    </TouchableOpacity>)    
                    : null
                }
                
            </View>
        )
    }

    render() {
        const { 
            pokemonLista, 
            errorMessage, 
            loading, 
            nextList, 
            previousList,
            getURLDetalhesPokemon
         } = this.props
        return(
            <View style={{flex: 1}}>
                <Text style={{alignSelf: 'center'}}>Pokemons {pokemonLista.length}</Text>
                {this._pokeListaDiferentes(nextList, previousList)}
                {
                    loading ? this._loadingPontinhos() : null
                }
                {
                    errorMessage != '' ? this._errorMessage(errorMessage) : null
                }
                <ListaPokemon 
                    pokeLista={pokemonLista} 
                    urlPokemon={(pokemonDetalhes) => {
                            getURLDetalhesPokemon(pokemonDetalhes) //Nao serve pra nada hehe, tive q passar via navigation
                            this.props.navigation.navigate('DetalhesPokemon', {name: pokemonDetalhes.name})
                        } 
                    } 
                />
            </View>
        )
    }
}

const mapStateToProps = store => ({
    pokemonLista: store.getPokemonState.pokemonLista,
    loading: store.getPokemonState.loading,
    errorMessage: store.getPokemonState.errorMessage,
    nextList: store.getPokemonState.nextList,
    previousList: store.getPokemonState.previousList,
    pokemonSelecionado: store.detalhesPokemonState.pokemonSelecionado
})

const mapDispatchToProps = dispatch => 
    bindActionCreators({
        getPokemonList,
        getNewList,
        getURLDetalhesPokemon
    }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main)