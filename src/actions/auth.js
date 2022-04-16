import Swal from 'sweetalert2';

import { firebase, googleAuthProvider } from "../firebase/firebaseConfig";
import { types } from "../types/types";
import { finishLoading, startLoading } from "./ui";


//* Estas funciones siempre devuelven  un callback
//* El dispatch dentro de los return callback lo provee el thunk de redux
//* Thunk permite llama tantos dispatch como sea necesario


//Permite el inicio de session mediante el email/password
export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

        dispatch( startLoading());//ejeccutar el dispatch para iniciar loading

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then( ({ user }) => {
                dispatch( login(user.uid, user.displayName)); //ejecuta el dispatch de login (actualiza el state del auth en redux)
                dispatch( finishLoading()); //ejecuta el dispatch para finalizar loading
            })
            .catch( (err) => {
                //dispatch( setError(err.message) );
                dispatch( finishLoading()); //en caso de error ejecuta el dispatch para finalizar loading
                Swal.fire('Error', err.message, 'error');
            });
    }
}

//Permite el registro de un usuario con email y password al firebase
export const startRegisterWithEmailPasswordName = ( email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( async ({ user }) => {
                await user.updateProfile({ displayName: name }); //Actualiza el nombre del usuario en la bd para tenerlo en el userCredential
                dispatch( login(user.uid, user.displayName)); //ejecuta el dispatch de login para actualizar el estado de redux
            })
            .catch( (err) => {
                //console.log(err);
                //dispatch( setError(err.message) );
                Swal.fire('Error', err.message, 'error');
            });
    }
}

//Permite iniciar session con email y password de google
//El dispatch lo provee el thunk de redux
//Este metodo de firebase muestra un popup de autenticacion
//Al presionar la cuenta se responde un user credencial
//Se obtiene el user.uid y el user.displayName y se setean en el login para que almacene en el state por medio del reducer
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