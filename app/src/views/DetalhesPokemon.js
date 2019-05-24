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

    componentWillMount() {
        console.log(this.props)
        this.props.getDetalhesPokemon(this.props.pokemonSelecionado.url)
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
                {/* <Text>{infos.games}</Text> */}
            </View>
        )
    }

    render() {
        const { loading, pokemon } = this.props
        return(
            <View style={{flex: 1}}>
                {this._mostraInfosPokemon(pokemon)}
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