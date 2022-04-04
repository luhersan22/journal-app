import Swal from 'sweetalert2';

import { firebase, googleAuthProvider } from "../firebase/firebaseConfig";
import { types } from "../types/types";
import { finishLoading, setError, startLoading } from "./ui";


//* Estas funciones siempre devuelven  un callback
//* El dispatch dentro de los return callback lo provee el thunk de redux


//Permite el inicio de session mediante el email/password
export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

        dispatch( startLoading());

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then( ({ user }) => {
                dispatch( login(user.uid, user.displayName)); //ejecuta el dispatch de login
                dispatch( finishLoading());
            })
            .catch( (err) => {
                //dispatch( setError(err.message) );
                dispatch( finishLoading());
                Swal.fire('Error', err.message, 'error');
            });
    }
}

//Permite el registro de un usuario con email y password al firebase
export const startRegisterWithEmailPasswordName = ( email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( async ({ user }) => {
                await user.updateProfile({ displayName: name }); //Actualiza el nombre del usuario
                dispatch( login(user.uid, user.displayName)); //ejecuta el dispatch de login
            })
            .catch( (err) => {
                //console.log(err);
                //dispatch( setError(err.message) );
                Swal.fire('Error', err.message, 'error');
            });
    }
}

//Permite iniciar session con email y password de google
export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup( googleAuthProvider )
        .then( ({ user }) => {
            dispatch( login(user.uid, user.displayName)  )
        })
    }
}

//Accion para el reducer de auth (almacena uid, nombre para redux)
export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}


export const startLogout = () => { 
    return async (dispatch) => {
        await firebase.auth().signOut();
        dispatch( logout() );
    }
}

export const logout = () => { 
    return {
        type: types.logout
    }
}