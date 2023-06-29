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
    EyeIcon,
} from '@heroicons/react/24/solid'
// import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Sidebar: React.FC = () => {
    const Navigate = useNavigate()
    function handleSubmit(): void {
        const response = confirm('Are you sure you want to Log out?')
        if (response) {
            Navigate('/login')
            sessionStorage.clear()
        }
    }
    return (
        <div
            className={`fixed drop-shadow-lg min-h-screen z-50 transition-width duration-700 overflow-hidden hidden sm:block w-[3.5rem] hover:w-[15rem] bg-white  group`}
        >
            <List className=" top-14 max-w-fit">
                <ListItem
                    className="active:bg-blue-400"
                    onClick={() => {
                        Navigate('/dashboard')
                    }}
                >
                    <ListItemPrefix>
                        <PresentationChartBarIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    <p className="hidden group-hover:block">Category</p>
                </ListItem>
                <ListItem
                    onClick={() => {
                        Navigate('/forms')
                    }}
                >
                    <ListItemPrefix>
                        <DocumentIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    <p className="hidden group-hover:block">View Forms</p>
                </ListItem>
                <ListItem
                    onClick={() => {
                        Navigate('/formresponse', {
                            state: {
                                category: 'All',
                            },
                        })
                    }}
                >
                    <ListItemPrefix>
                        <EyeIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    <p className="hidden group-hover:block">View Responses</p>
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
