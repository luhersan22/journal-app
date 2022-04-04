
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import { authReducer } from "../reducers/authReducer";
import { notesReducer } from "../reducers/notesReducer";
import { uiReducer } from "../reducers/uiReducer";


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


//Siempre se deberia de configurar multiples reducers aunque haya solo 1
//Par utilizar multiples reducers
const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
});

//El store utiliza un reducer o multiples reducers como este caso
export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware( thunk )
    )
);


//El store se debería de importar en el punto mas alto de la aplicacion