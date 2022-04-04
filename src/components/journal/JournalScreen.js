import React from 'react'
import { useSelector } from 'react-redux'
import { NoteScreen } from '../notes/NoteScreen'
import { NothingSelected } from './NothingSelected'
import { Sidebar } from './Sidebar'

export const JournalScreen = () => {

    //Por medio del selector se obtiene el state de la app incluidos los reducers
    const  { active } = useSelector( state => state.notes );

    return (
        <div className="journal__main-content">

            <Sidebar />

            <main>
                { active ? <NoteScreen /> : <NothingSelected /> }
            </main>
            
        </div>
    )
}
