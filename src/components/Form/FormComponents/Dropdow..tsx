/* eslint-disable react/prop-types */
import { Select, Option } from '@material-tailwind/react'
import { type Ioption } from '../../../interface'

interface Props {
    optionlist: Ioption[]
}
const Dropdown: React.FC<Props> = ({ optionlist }) => {
    return (
        <div className="w-72 mt-3">
            <Select label="Select Answer">
                {optionlist.map((option) => (
                    <Option key={option.id}>{option.optionValue}</Option>
                ))}
            </Select>
        </div>
    )
}

export default Dropdown
