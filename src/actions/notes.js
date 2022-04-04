


//Para grabar una nota en la base de datos se necesta un uid (codigo del usuario) y una nota
//Este uid se puede obtener del state
//getState (función que devuelve el state de la app), similar al use selector

import { db } from "../firebase/firebaseConfig";
import { types } from "../types/types";

export const startNewNote = () => {
    return async (dispatch, getState) => { 

        // const state = getState();
        // console.log(state);

        const { uid } = getState().auth;
        
        const newNote = { 
            title: '',
            body: '',
            date: new Date().getTime(),
        } 

        const doc = await db.collection(`${ uid }/journal/notes`).add(newNote);
        console.log(doc);

        dispatch( activeNote(doc.id, newNote) );
    }
}


export const activeNote = (id, note) => {
    return {
        type: types.notesActive,
        payload: { 
            id, 
            ...note 
        }
    }
}


export const setNotes = ( notes ) => { 
    return { 
        type: types.notesLoad,
        payload: notes
    }
}