import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import validator from "validator";      

import { useForm } from '../../hooks/useForm';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();

    //Permite acceder al state General
    //const state = useSelector( state => state.ui );
    const { msgError } = useSelector( state => state.ui ); 


    const [ formValues, handleInputChange ] = useForm({
        name: 'Luis Mariano',
        email: 'luisma@gmail.com',
        password: '123456',
        password2: '123456'
    });

    const { name, email, password, password2 } = formValues;


    //El dispatch recibe una accion en este caso el login creado en el archivo auth.js
    const handleRegister = (e) => {
        e.preventDefault();

        if( isFormValid() ) {
            console.log('Formulario valido');
            dispatch( startRegisterWithEmailPasswordName( email, password, name ) );
        }
    }

    //Si existe errores se dispara el dispatch de ui.js y se le pasa el error
    const isFormValid = () => { 
        if( name.trim().length === 0 ) {
            dispatch( setError('El nombre es obligatorio') );
            return false;
        } else if( ! validator.isEmail(email) ) {
            dispatch( setError('El email no es valido') );
            return false;

        } else if( password !== password2 || password.length < 5 ) {	
            dispatch( setError('Las contraseñas no coinciden o son muy cortas') );
            return false;
        }

        dispatch( removeError() );
        return true;
    }


    return (
        <>
            <h3 className="auth__title" >Register</h3>

            <form onSubmit={ handleRegister }>

                {
                    msgError ? <div className="auth__alert-error">{ msgError }</div> : null
                }

                <input 
                    className="auth__input"
                    type="text"
                    placeholder="Name"
                    name="name"
                    autoComplete="off"
                    value={ name }
                    onChange={ handleInputChange }
                />
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
                <input 
                    className="auth__input"
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    value={ password2 }
                    onChange={ handleInputChange }
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                   // disabled={true}
                >
                    Register
                </button>

                <Link 
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>

            </form>
            
        </>
    )
}
