import { createContext } from 'react'
import { useNavigate } from 'react-router-dom'


const context_auth = createContext({
    isLoggedIn: false,
    userId: '',
    username: '',
    token: '',
    profilePicture: '',
    login: (userID: any, token: any, username: any, profilePicture: string, expirationDate?: any) => {
        
    },
    loggout: () => {
        
    },
})



export default context_auth