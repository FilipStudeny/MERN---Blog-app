import { createContext } from 'react'
import { useNavigate } from 'react-router-dom'


const context_auth = createContext({
    isLoggedIn: false,
    userId: null,
    username: null,
    login: (userID: any,  username: any) => {
        
    },
    loggout: () => {
        
    },
})



export default context_auth