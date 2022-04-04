import { db } from "../firebase/firebaseConfig"




export const loadNotes = async ( uid ) => {
    const notesSnap = await db.collection(`${ uid }/journal/notes`).get(); //Lee de la base de datos ('docs')
    const notes = []; //Crea un array vacio pivote par construir las notas de la manera correcta que necesitamos

    notesSnap.forEach( snapHijo => { 
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    })

    console.log(notes);

    return notes;
}
