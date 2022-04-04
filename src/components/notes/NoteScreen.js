import React from 'react'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
    return (
        <div className="notes__main-content">
            
            <NotesAppBar />

            <div className="notes__content">

                <input 
                    className="notes__title-input"
                    type="text"
                    placeholder="Some awsome title"
                    autoComplete="off"
                />

                <textarea 
                    className="notes__textarea"
                    placeholder="What happened today"
                ></textarea>

                <div className="notes__image">
                    <img 
                        src="https://images.unsplash.com/photo-1544526226-d4568090ffb8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aGQlMjBpbWFnZXxlbnwwfHwwfHw%3D&w=1000&q=80"
                        alt="Imagen"
                    />
                </div>


            </div>

        </div>
    )
}
