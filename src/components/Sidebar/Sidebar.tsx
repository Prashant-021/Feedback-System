import {
    // Button,
    List,
    ListItem,
    ListItemPrefix,
} from '@material-tailwind/react'
import {
    PresentationChartBarIcon,
    DocumentIcon,
    PowerIcon,
    // Bars4Icon,
    // ArrowLeftIcon,
} from '@heroicons/react/24/solid'
// import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Sidebar: React.FC = () => {
    const Navigate = useNavigate()
    function handleSubmit(): void {
        Navigate('/login')
        sessionStorage.clear()
    }
    // const [sideBarToggle, setSidebarToggle] = useState(false)
    return (
        <div
            className={` transition-width duration-700 overflow-hidden hidden sm:block w-[3.5rem] hover:w-[20rem] bg-white group`}
        >
            <List className="group fixed">
                <ListItem
                    onClick={() => {
                        Navigate('/dashboard')
                    }}
                >
                    <ListItemPrefix>
                        <PresentationChartBarIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    <p className="hidden group-hover:block"> Category</p>
                </ListItem>
                <ListItem
                    onClick={() => {
                        Navigate('/forms')
                    }}
                >
                    <ListItemPrefix>
                        <DocumentIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    <p className="hidden group-hover:block">view Forms</p>
                </ListItem>
                <ListItem
                    onClick={() => {
                        handleSubmit()
                    }}
                >
                    <ListItemPrefix>
                        <PowerIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    <p className="hidden group-hover:block">Log Out</p>
                </ListItem>
            </List>
        </div>
    )
}
export default Sidebar
