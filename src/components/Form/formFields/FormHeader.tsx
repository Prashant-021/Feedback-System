import CategoryService from '../../../FirebaseFiles/handle/categoryFunctions'

import { Input, Option, Select, Textarea } from '@material-tailwind/react'
import React, { type FC, useState, useEffect } from 'react'
import { type IFormHeader } from '../../../interface'
import { errorNotify } from '../../../utils'

interface Props {
    headerInfo: (formHead: IFormHeader) => void
    savedData: IFormHeader
}

const FormHeader: FC<Props> = ({ headerInfo, savedData }) => {
    const [title, setTitle] = useState<string>(savedData.title)
    const [categories, setCategories] = useState<string[]>([])
    const [description, setDescription] = useState<string>(
        savedData.description
    )
    const [categoryType, setCategoryType] = useState<string>(
        savedData.categoryName
    )
    useEffect(() => {
        CategoryService.getAllCategory()
            .then((querySnapshot) => {
                const data: string[] = []
                querySnapshot.forEach((doc) => {
                    data.push(doc.data().title)
                })
                if (JSON.stringify(data) !== JSON.stringify(categories)) {
                    setCategories(data)
                }
            })
            .catch((err) => {
                errorNotify(err)
            })
    }, [])
    useEffect(() => {
        headerInfo({ title, description, categoryName: categoryType })
    }, [title, description, categoryType])

    return (
        <div className="titleSection rounded-lg shadow-xl border-l-8 border-transparent focus-within:border-blue-500 bg-white p-2 md:p-11 h-fit ">
            <Input
                className="placeholder-black text-xl text-black"
                variant="static"
                label=""
                placeholder="Form Title"
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value)
                }}
            />
            <Textarea
                className="placeholder-black text-black"
                variant="static"
                label=""
                placeholder="Form Description"
                value={description}
                onChange={(e) => {
                    setDescription(e.target.value)
                }}
            />
            <div className="mt-6 ">
                <Select
                    label="Select Category"
                    value={categoryType}
                    onChange={(event) => {
                        console.log(event)
                        setCategoryType(event as string)
                    }}
                >
                    {categories?.map((category) => (
                        <Option key={category} value={category}>
                            {category}
                        </Option>
                    ))}
                </Select>
            </div>
        </div>
    )
}

export default FormHeader
