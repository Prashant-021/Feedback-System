import { Input, Option, Select } from '@material-tailwind/react'
import React, { type FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { type RootState } from '../../../interface'

interface Props {
    headerInfo: (formHead: {
        title: string
        description: string
        category: string
    }) => void
}

const FormHeader: FC<Props> = ({ headerInfo }: any) => {
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const categories = useSelector(
        (state: RootState) => state.category.category
    )
    console.log(categories)
    headerInfo({ title, description, categoryName })

    return (
        <div className="titleSection rounded-lg shadow-xl border-l-8 border-transparent focus-within:border-blue-500 bg-white p-2 md:p-11 h-fit ">
            <Input
                className="placeholder-black text-xl text-black"
                variant="static"
                label=""
                placeholder="Category Title"
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value)
                }}
            />
            <Input
                className="placeholder-black text-black"
                variant="static"
                label=""
                placeholder="Category Description"
                value={description}
                onChange={(e) => {
                    setDescription(e.target.value)
                }}
            />
            <div className="mt-6 ">
                <Select label="Select Category">
                    {categories.map((category) => (
                        <Option key={category.title}>{category.title}</Option>
                    ))}
                </Select>
            </div>
        </div>
    )
}

export default FormHeader
