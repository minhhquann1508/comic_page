import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBox():JSX.Element {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues:{
          keyword:''
        },
        onSubmit:(value:any) => {
          navigate(`/search/${value.keyword}`)
        }
      })
    return (
        <form onSubmit={formik.handleSubmit} className='border px-3 py-2 focus-within:border-blue-400 rounded-full'>
            <input type="text" name='keyword' onChange={formik.handleChange} onBlur={formik.handleBlur} className='focus:outline-none text-sm mr-2' placeholder='Search comics / authors'/>
            <button type='submit'>
                <FontAwesomeIcon icon={faMagnifyingGlass}/>
            </button>
        </form>
    )
}
