import axios from 'axios'
import React, { useState, useEffect } from 'react'

export default function Trello() {
    const [data, setData] = useState([])
    const [edit, setEdit] = useState(null)

    useEffect(() => {
        getData()
    }, [])

    //untuk mengambil data
    const getData = () => {
        console.log('getdata')
        axios.get('http://localhost:3001/card')
            .then(hasil => setData(hasil.data))
    }

    //untuk memasukkan data
    const handleSubmit = e => {
        e.preventDefault() //biar tidak sering refresh
        const value = e.target.submit.value
        axios.post('http://localhost:3001/card', { name: value })
            .then(() => {
                getData()
                e.target.submit.value = ''
            })

    }

    //untuk menghapus data
    const handleDelete = id => {
        axios.delete(`http://localhost:3001/card/${id}`)
            .then(() => getData())
    }
    return (
        <div className='p-5'>trello
            {/* submit data */}
            <form onSubmit={handleSubmit} >
                <input name='submit' />
                <button type='submit'>submit</button>
            </form>

            <div>
                {data.map((value, index) => {
                    return ( 
                        edit === index ?
                        <form key={index}>
                            <input/> <span> save</span>
                        </form>
                        : <div key={index}>
                            {value.name}
                            <span onClick={() => handleDelete(value.id)}> x</span>
                            <span onClick={() => setEdit(index)}> edit</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
