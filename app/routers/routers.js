import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

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