import { useEffect, useState } from 'react';
import { 
    Redirect,
    BrowserRouter as Router,
    Switch 
} from 'react-router-dom';
import { firebase } from "../firebase/firebaseConfig";
import { useDispatch } from 'react-redux';

import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { startLoadingNotes } from '../actions/notes';

//Siempre al cargar la pagina pasa por este componente (AppRouter)
export const AppRouter = () => {

    const dispatch = useDispatch();

    //pivote para controlar la respuesta de dispatch( login (user.uid, user.displayName) ); en onAuthStateChanged
    //Esto se realizar porque puede pasar un tiempo para que se ejecute
    //Cuando cambie se puede tener la referencia si ya esta autenticado.
    const [ cheking, setCheking ] = useState(true);

    //Para manejar si esta loggeado o no
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);


    //Esto se realiza para almacenar datos del state si se está autenticado
    useEffect(() => {

        //Este metodo del firebase "onAuthStateChanged" crea un observable que se suscribe a los cambios en la autenticacion, 
        //se puede disparar mas de una vez
        //Cada cambio en la autenticacion se ejecuta esta funcion
        firebase.auth().onAuthStateChanged( async (user) => {
            if(user?.uid) { //Si existe (indica q esta autenticado)
                
                dispatch( login (user.uid, user.displayName) ); //Si esta autenticado en firebase actualiza el estado de redux
                setIsLoggedIn(true);
                dispatch( startLoadingNotes(user.uid) ); //Se llama al reducer para guardar las notas en el state

            } else {
                setIsLoggedIn(false);
            }
            
            setCheking(false);
        });
    }, [ dispatch, setCheking, setIsLoggedIn ])


    if(cheking) { 
        return ( <h1>Cargando...</h1> )
    }

    return (
        <Router>
            <div>
                <Switch>

                    <PublicRoute 
                        isAuthenticated={ isLoggedIn }
                        path="/auth" 
                        component={ AuthRouter }     
                    />

                    <PrivateRoute
                        isAuthenticated={ isLoggedIn }
                        exact 
                        path="/" 
                        component={ JournalScreen }
                    />

                    <Redirect to="/auth/login" /> 

                    {/* <Route path="/auth" component={ AuthRouter } />
                    <Route exact path="/" component={ JournalScreen } />
                    <Redirect to="/auth/register" /> */}
                </Switch>
            </div>
        </Router>
    )
} 
