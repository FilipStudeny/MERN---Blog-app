import { createContext } from 'react'
import { useNavigate } from 'react-router-dom'


const context_auth = createContext({
    isLoggedIn: false,
    login: () => {
        
    },
    loggout: () => {
        
    },
})



export default context_auth