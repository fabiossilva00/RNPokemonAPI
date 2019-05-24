import React from 'react'
import { Provider } from 'react-redux'

import Routers from './routers/routers'
import { store } from './src/redux/store/store'

const App = () => {
    return (
        <Provider store={ store } >
            <Routers />
        </Provider>
    )
}

export default App