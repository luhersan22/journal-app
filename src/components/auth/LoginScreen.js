import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import validator from "validator";   

import { removeError, setError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    //Permite acceder al state General
    //const state = useSelector( state => state.ui );
    const { msgError, loading } = useSelector( state => state.ui ); 

    const [ formValues, handleInputChange ] = useForm({
        email: 'luis@gmail.com',
        password: '123456'
    });

    const { email, password } = formValues;


    //El dispatch recibe una accion en este caso el login creado en el archivo auth.js
    const handleLogin = (e) => {
        e.preventDefault();

        if( isFormValid() ) {
            console.log('Formulario valido');
            dispatch( startLoginEmailPassword(email, password) );
        }
    }

    const handleGoogleLogin = () => {
        dispatch( startGoogleLogin() );
    }


    //Si existe errores se dispara el dispatch de ui.js y se le pasa el error
    const isFormValid = () => { 
        if( ! validator.isEmail(email) ) {
            dispatch( setError('El email no es valido') );
            return false;

        } else if( password.length < 5 ) {	
            dispatch( setError('La contraseña es muy corta') );
            return false;
        }

        dispatch( removeError() );
        return true;
    }
    

    return (
        <>
            <h3 className="auth__title" >Login</h3>

            <form onSubmit={ handleLogin }>

                {
                    msgError ? <div className="auth__alert-error">{ msgError }</div> : null
                }

                <input 
                    className="auth__input"
                    type="text"
                    placeholder="Email"
                    name="email"
                    autoComplete="off"
                    value={ email }
                    onChange={ handleInputChange }
                />
                <input 
                    className="auth__input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={ password }
                    onChange={ handleInputChange }
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={ loading }
                >
                    Login
                </button>

                <div className="auth__social-networks" >
                    <p>Login with social network</p>
                    <div 
                        className="google-btn"
                        onClick={ handleGoogleLogin }
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link 
                    to="/auth/register"
                    className="link"
                >
                    Create new account
                </Link>


            </form>
            
        </>
    )
}
