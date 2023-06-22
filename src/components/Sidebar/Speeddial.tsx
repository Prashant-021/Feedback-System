import {
    IconButton,
    SpeedDial,
    SpeedDialHandler,
    SpeedDialContent,
    SpeedDialAction,
} from '@material-tailwind/react'
import {
    PlusIcon,
    PresentationChartBarIcon,
    UserCircleIcon,
    DocumentPlusIcon,
    EyeIcon,
} from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'

const DefaultSpeedDial: React.FC = () => {
    const Navigate = useNavigate()
    return (
        //   <div className="relative w-full h-80">
        <div className="fixed z-40 bottom-[15px] right-[15px] block sm:hidden">
            <SpeedDial>
                <SpeedDialHandler>
                    <IconButton size="lg" className="rounded-full">
                        <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
                    </IconButton>
                </SpeedDialHandler>
                <SpeedDialContent>
                    <SpeedDialAction>
                        <PresentationChartBarIcon
                            className="h-5 w-5"
                            onClick={() => {
                                Navigate('/dashboard')
                            }}
                        />
                    </SpeedDialAction>
                    <SpeedDialAction>
                        <DocumentPlusIcon
                            className="h-5 w-5"
                            onClick={() => {
                                Navigate('/forms')
                            }}
                        />
                    </SpeedDialAction>
                    <SpeedDialAction>
                        <EyeIcon
                            className="h-5 w-5"
                            onClick={() => {
                                Navigate('/formresponse', {
                                    state: {
                                        category: 'All',
                                    },
                                })
                            }}
                        />
                    </SpeedDialAction>
                    <SpeedDialAction>
                        <UserCircleIcon
                            className="h-5 w-5"
                            onClick={() => {
                                Navigate('/profile')
                            }}
                        />
                    </SpeedDialAction>
                </SpeedDialContent>
            </SpeedDial>
        </div>
        //   </div>
    )
}
export default DefaultSpeedDial
