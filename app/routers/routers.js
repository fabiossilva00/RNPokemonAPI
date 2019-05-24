import { createStackNavigator, createAppContainer } from 'react-navigation'

import Main from '../src/views/Main'
import DetalhesPokemon from '../src/views/DetalhesPokemon'

const AppNavigation = createStackNavigator(
    {
        Main,
        DetalhesPokemon
    },
    {
        initialRouteName: 'Main'
    }
)

export default createAppContainer(AppNavigation)