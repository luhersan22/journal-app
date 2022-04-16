import { db } from "../firebase/firebaseConfig";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";


//Para grabar una nota en la base de datos se necesta un uid (codigo del usuario) y una nota
//Este uid se puede obtener del state para no tener que pasarlo como parametro
//getState (función que devuelve el state de la app), similar al use selector
//Este se utiliza dentro del return donde se enceuntra el dispatch

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


export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: { 
        id, 
        ...note 
    }
});


export const startLoadingNotes = ( uid ) => {
    return async (dispatch) => { 
        const notes = await loadNotes( uid ); //helper / Carga las notas del usuario
        dispatch( setNotes(notes) ); //Se llama al reducer para guardar las notas en el state
    }
}


export const setNotes = ( notes ) => ({ 
    type: types.notesLoad,
    payload: notes
});