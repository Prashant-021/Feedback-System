/* eslint-disable react/prop-types */
import {
    Radio,
    List,
    ListItem,
    ListItemPrefix,
    Typography,
} from '@material-tailwind/react'
import { type Ioption } from '../../../interface'

interface Props {
    optionlist: Ioption[]
}

const MultipleChoice: React.FC<Props> = ({ optionlist }) => {
    return (
        <div>
            <List>
                {optionlist.map((option) => (
                    <ListItem className="p-0" key={option.id}>
                        <label
                            htmlFor="vertical-list-react"
                            className="px-3 py-2 flex items-center w-full cursor-pointer"
                        >
                            <ListItemPrefix className="mr-3">
                                <Radio
                                    name="vertical-list"
                                    id="MCQ-vertical-list"
                                    ripple={false}
                                    className="hover:before:opacity-0"
                                    containerProps={{
                                        className: 'p-0',
                                    }}
                                />
                            </ListItemPrefix>
                            <Typography
                                color="blue-gray"
                                className="font-medium"
                            >
                                {option.optionValue}
                            </Typography>
                        </label>
                    </ListItem>
                ))}
                {/* <ListItem className="p-0">
                    <label
                        htmlFor="vertical-list-vue"
                        className="px-3 py-2 flex items-center w-full cursor-pointer"
                    >
                        <ListItemPrefix className="mr-3">
                            <Radio
                                name="vertical-list"
                                id="vertical-list-vue"
                                ripple={false}
                                className="hover:before:opacity-0"
                                containerProps={{
                                    className: 'p-0',
                                }}
                            />
                        </ListItemPrefix>
                        <Typography color="blue-gray" className="font-medium">
                            Vue.js
                        </Typography>
                    </label>
                </ListItem>
                <ListItem className="p-0">
                    <label
                        htmlFor="vertical-list-svelte"
                        className="px-3 py-2 flex items-center w-full cursor-pointer"
                    >
                        <ListItemPrefix className="mr-3">
                            <Radio
                                name="vertical-list"
                                id="vertical-list-svelte"
                                ripple={false}
                                className="hover:before:opacity-0"
                                containerProps={{
                                    className: 'p-0',
                                }}
                            />
                        </ListItemPrefix>
                        <Typography color="blue-gray" className="font-medium">
                            Svelte.js
                        </Typography>
                    </label>
                </ListItem> */}
            </List>
        </div>
    )
}

export default MultipleChoice
