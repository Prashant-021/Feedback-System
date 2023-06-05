import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { type RootState } from '../../interface'

const Userform: React.FC = () => {
    const location = useLocation()
    const formId = location.pathname.split('/')
    const Userforms = useSelector((state: RootState) => state.form.form)
    const form = Userforms.find((f) => f.id === formId[formId.length - 1])
    return (
        <div>
            {form?.title}
            {form?.description}
        </div>
    )
}

export default Userform
