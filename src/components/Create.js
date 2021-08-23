import React, { useState } from 'react'
import env from '../env.json'

export default function Create() {

    const [url, setUrl] = useState('')
    const [lineClass, setLineClass] = useState('hide')
    const [FormClass, setFormClass] = useState('')


    let sendData = (obj) => {
        setFormClass('hide')
        setLineClass('')
        fetch(env.urlBackend, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                if (response.result) {
                    setUrl(env.url + '/' + response.url)
                }
            })
    }
    let loadDataFromForm = (event) => {
        event.preventDefault()
        let note = event.target.elements.note.value
        note = note.trim()
        if (note === '') {
            alert('Заполните поля')
            return false
        }
        sendData({ "note": note })
    }
    return (
        <div className="container">
            <h1>Create note</h1>
            <form className={FormClass} onSubmit={loadDataFromForm}>
                <div className="input-group">
                    <label htmlFor="" className="input-group-text">Take a note</label>
                    <textarea name="note" id="" defaultValue="text" className="form-control"></textarea>
                    <button type="submit" className="btn btn-primary" >Create</button>
                </div>

            </form>
            <div className={lineClass} >
                <a href={url} >url</a>
                <div><button onClick={function () { window.location.reload() }} type="button" className="btn btn-primary">Создать новую заметку</button></div>
            </div>

        </div >
    )
}
