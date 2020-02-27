import React from 'react'
import {
    View,
    Text,
    Image,
    FlatList
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { getDetalhesPokemon } from '../services/request/detalhesPokemon'

class DetalhesPokemon extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nomePokemon: props.pokemonSelecionado
        }

        this.pokemonSelecionado = props.pokemonSelecionado
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.name.toUpperCase()
        }
    }

    componentDidMount() {
        console.log(this.props)
        this.props.getDetalhesPokemon(this.props.pokemonSelecionado.url)
    }

    _renderGames = ({ item }) => {
        return (
            <View style={{margin: 7, borderBottomWidth: 0.5}}>
                <Text style={{fontSize: hp('2.5%')}}>{item.version.name}</Text>
            </View>
        )
    }

    _mostraInfosPokemon = infos => {
        return (
            <View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '50%', alignSelf: 'center'}}>
                    <Image  style={{height: 100, width: 100}}
                        source={{uri: infos.spriteFront}}
                    />
                    {/* <Image  style={{height: 100, width: 100}}
                        source={{uri: infos.spriteBack}}
                    /> */}
                </View>
                <View style={{flexDirection: 'row',}}>
                    <View>    
                        <View style={{flexDirection: 'row', marginBottom: 10}}>
                            <Text style={{fontSize: hp('2.7%'), width: hp('15%')}} >ID - </Text>
                            <Text style={{fontSize: hp('2.7%')}}>{infos._id}</Text>
                        </View>
                        <View style={{flexDirection: 'row', marginBottom: 10}}>
                            <Text style={{fontSize: hp('2.7%'), width: hp('15%')}} >Tamanho - </Text>
                            <Text style={{fontSize: hp('2.7%')}}>{infos.height}</Text>
                        </View>
                        <View style={{flexDirection: 'row', marginBottom: 10}}>
                            <Text style={{fontSize: hp('2.7%'), width: hp('15%')}} >Peso - </Text>
                            <Text style={{fontSize: hp('2.7%')}}>{infos.weight}</Text>
                        </View>
                    </View>
                    <View style={{maxHeight: 150, backgroundColor: 'transparent', marginLeft: 85, width: '37%'}}>
                        <View>
                            <Text style={{fontSize: hp('2.8%'), alignSelf: 'center'}}>Games</Text>
                        </View>
                        <FlatList
                            data={infos.games}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={this._renderGames}
                        />
                    </View>

                </View>
            </View>
        )
    }

    render() {
        const { loading, pokemon, errorMessage } = this.props
        return(
            <View style={{flex: 1}}>
                {
                    loading ? 
                        (
                            <Text style={{fontSize: hp('2.5%'), alignSelf: 'center'}} >Loading...</Text>
                        )
                    : null
                }
                {loading != true && errorMessage == '' ? this._mostraInfosPokemon(pokemon) : null}
            </View>
        )
    }
}

const mapStateToProps = store => ({
    pokemonSelecionado: store.detalhesPokemonState.pokemonSelecionado,
    pokemon: store.detalhesPokemonState.pokemon,
    loading: store.detalhesPokemonState.loading,
    errorMessage: store.detalhesPokemonState.errorMessage
})

const mapDispatchToProps = dispatch => 
    bindActionCreators({
        getDetalhesPokemon
    }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DetalhesPokemon)