import React from 'react';
import { Provider } from "react-redux";
import { AppRouter } from './routers/AppRouter';
import { store } from './store/store';


export const JournalApp = () => {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
        
    )
}


//El provider de redux cumple con lo mismo que hace el context
//Se le debe pasar un store como parámetro en este caso el store que se creo para utilizar redux