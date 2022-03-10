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
        // console.log('getdata')
        axios.get('http://localhost:3001/card')
            .then(hasil => setData(hasil.data))
    }

    //untuk memasukkan data
    const handleSubmit = e => {
        e.preventDefault() //biar tidak sering refresh
        const value = e.target.submit.value
        // console.log(e.target.submit.value)
        axios.post('http://localhost:3001/card', { name: value, list: [] })
            .then(() => {
                getData()
                e.target.submit.value = ''
            })
    }

    //untuk memasukkan list
    const handleSubmitList = e => {
        e.preventDefault() //biar tidak sering refresh
        const value = e.target.submit0.value
        // console.log(e.target.submit0.value)
        axios.post('http://localhost:3001/card/list', { namelist: value })
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

    //menyimpan data yang sudah diedit
    const handleEdit = e => {
        e.preventDefault() //biar tidak merefresh
        // const value = e.target.save.value
        const value = e.target.save.value
        axios.patch(`http://localhost:3001/card/${data[edit].id}`, { name: value })
            .then(() => {
                getData()
                setEdit(null)
            })
    }
    return (
        <div className='p-5'>
            <div className='text-center w-full text-xl'>Aplikasi Trello</div>
            {/* submit data */}
            <form onSubmit={handleSubmit} >
                <input name='submit' />
                <button type='submit'>submit</button>
            </form>

            <div className='grid grid-cols-3 gap-5 w-full'>
                {data.map((value, index) => {
                    return (
                        <div key={index}>
                            {edit === index ?
                                <form key={index} onSubmit={handleEdit}>
                                    <input name='save' defaultValue={value.name} />
                                    <button type='submit'> save</button>
                                </form>
                                :
                                <div key={index} className='grid grid-cols-3 gap-2 bg-blue-50'>
                                    <div>{value.name}</div>
                                    <button onClick={() => handleDelete(value.id)}>delete</button>
                                    <button onClick={() => setEdit(index)}>edit</button>
                                </div>
                            }
                            {/* submit data */}
                            <form onSubmit={handleSubmitList} >
                                <input name={`submit${index}`} />
                                <button type='submit'>submit</button>
                            </form>
                            {value.list.map((value2, index2) => {
                                return (
                                    <div key={index2}>{value2.name}
                                        {edit === index2 ?
                                            <form key={index2} onSubmit={handleEdit}>
                                                <input name='save' defaultValue={value2.name} />
                                                <button type='submit'> save</button>
                                            </form>
                                            :
                                            <div key={index2} className='grid grid-cols-3 gap-2 bg-red-50'>
                                                <div>{value2.name}</div>
                                                <button onClick={() => handleDelete(value2.id)}>delete</button>
                                                <button onClick={() => setEdit(index2)}>edit</button>
                                            </div>
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
