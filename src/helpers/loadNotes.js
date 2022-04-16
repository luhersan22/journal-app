import { db } from "../firebase/firebaseConfig";



export const loadNotes = async ( uid ) => {
    //Lee de la base de datos ('docs')
    const notesSnap = await db.collection(`${ uid }/journal/notes`).get();
    const notes = []; //Crea un array vacio pivote par construir las notas de la manera correcta que necesitamos

    //Se recorren las notas para formar la estructura correcta
    //Se realiza así porq viene de firebase como una colección de documentos
    notesSnap.forEach( snapHijo => { 
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    });

    console.log(notes);

    return notes;
}
