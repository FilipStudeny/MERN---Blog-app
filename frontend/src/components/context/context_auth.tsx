import { createContext } from 'react'
import { useNavigate } from 'react-router-dom'


const context_auth = createContext({
    isLoggedIn: false,
    userId: '',
    username: '',
    token: '',
    login: (userID: any, token: any, username: any, expirationDate?: any) => {
        
    },
    loggout: () => {
        
    },
})



export default context_auth