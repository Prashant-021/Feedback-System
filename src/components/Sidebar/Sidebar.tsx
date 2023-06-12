import { List, ListItem, ListItemPrefix } from '@material-tailwind/react'
import {
    PresentationChartBarIcon,
    DocumentPlusIcon,
    PowerIcon,
} from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'

const Sidebar: React.FC = () => {
    const Navigate = useNavigate()
    function handleSubmit(): void {
        Navigate('/login')
        sessionStorage.clear()
    }
    return (
        <div className=" w-[3.5rem] hover:w-[20rem] transition-width duration-300 overflow-hidden hidden sm:block  bg-white">
            <List className="group">
                <ListItem
                    onClick={() => {
                        Navigate('/dashboard')
                    }}
                >
                    <ListItemPrefix>
                        <PresentationChartBarIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    <p> Dashboard</p>
                </ListItem>
                <ListItem
                    onClick={() => {
                        Navigate('/forms')
                    }}
                >
                    <ListItemPrefix>
                        <DocumentPlusIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    <p> Forms</p>
                </ListItem>
                <ListItem
                    onClick={() => {
                        handleSubmit()
                    }}
                >
                    <ListItemPrefix>
                        <PowerIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    <p> Log Out</p>
                </ListItem>
            </List>
        </div>
    )
}
export default Sidebar
