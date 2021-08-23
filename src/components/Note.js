import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import env from '../env.json'

export default function Note() {
    let { noteURL } = useParams()
    const [noteText, setNoteText] = useState('');
    const [lineClass, setLineClass] = useState('hide');
    const [formClass, setFormClass] = useState('hide'); // скрываем
    const [errorClass, setErrorClass] = useState('hide'); // скрываем

    useEffect(() => {
        if (noteURL !== undefined) {
            fetch(env.urlBackend, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({ "url": noteURL })
            })
                .then(response => response.json())
                .then(response => {
                    console.log(response.result)
                    if (response.result) {
                        setNoteText(response.note)
                        setLineClass('')
                        setFormClass('hide')
                        setErrorClass('hide')
                    } else if (!response.result) {
                        setLineClass('hide')
                        setFormClass('hide')
                        setErrorClass('')
                    }
                })
        } else {
            setLineClass('hide')
            setFormClass('')
            setErrorClass('hide')
        }
    }, [])

    const getNote = (event) => {
        event.preventDefault()
        let url = event.target.elements.url.value
        url = url.trim()
        if (url === '') {
            alert('Заполните поля')
            return false
        }
        noteURL = url
        window.location.href = env.url + '/' + url

    }
    const searchNote = () => {
        window.location.href = env.url
    }

    return (
        <div className="container">
            <h1>Note search</h1>
            <div className={lineClass}>
                <div class="card-body">
                    <h5 className="card-title">Note: </h5>
                    <p className="card-text">{noteText}</p>
                </div>

                <p><button onClick={searchNote} className="btn btn-secondary">Смотреть еще один note</button></p>
            </div>
            <div className={errorClass}>
                <p className="alert alert-danger" role="alert">Произошла ошибка. Такой note не найден!!</p>
                <p><button onClick={searchNote} className="btn btn-secondary">Смотреть еще один note</button></p>
            </div>
            <div className={formClass}>
                <form action="" onSubmit={getNote}>
                    <div className="input-group mb-3">
                        <label htmlFor="url" className="input-group-text">Введите hash заметки</label>
                        <input type="text" name="url" id="url" className="form-control" />
                        <button type="submit" className="btn btn-primary">Искать Note</button>
                    </div>

                </form>
            </div>
        </div>
    )
}
