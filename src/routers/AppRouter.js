import { useEffect, useState } from 'react';
import { 
    Redirect,
    BrowserRouter as Router,
    Switch 
} from 'react-router-dom';
import { firebase } from "../firebase/firebaseConfig";
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { loadNotes } from '../helpers/loadNotes';
import { setNotes } from '../actions/notes';

//Siempre al cargar la pagina pasa por este componente (AppRouter)
export const AppRouter = () => {

    const dispatch = useDispatch();

    //pivote para controlar la respuesta de dispatch( login (user.uid, user.displayName) ); en onAuthStateChanged
    //Esto se realizar porque puede pasar un tiempo para que se ejecute
    //Cuando cambie se puede tener la referencia si ya esta autenticado.
    const [ cheking, setCheking ] = useState(true);

    //Para manejar si esta loggeado o no
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    useEffect(() => {

        //Este metodo del firebase crea un observable que se suscribe a los cambios en la autenticacion
        //Cada cambio en la autenticacion se ejecuta esta funcion
        firebase.auth().onAuthStateChanged( async (user) => {
            if(user?.uid) {
                dispatch( login (user.uid, user.displayName) );
                setIsLoggedIn(true);

                const notes = await loadNotes( user.uid ); //helper / Carga las notas del usuario
                dispatch( setNotes(notes) ); //Se llama al reducer para guardar las notas en el state

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
