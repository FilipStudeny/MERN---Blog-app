import { useEffect, useState } from 'react';
import useHttpRequest from '../components/hooks/htpp_hook';
import UsersList from '../components/Users_List';
import UserIListtem from '../components/User_Item';

import '../styles/usersList.css'

const Users_page = () => {

    
    const [users, setUsers] = useState([]);
    const { isLoading, error, sendRequest, clearError } = useHttpRequest();

    
    useEffect(() => {

        const fetchUsers = async () => {
            try {
                const url: string = 'http://localhost:8000/api/users/';
                const responseData = await sendRequest(url);
    
                setUsers(responseData.users);
                clearError();
            } catch (err) { }
        }

        fetchUsers();
    }, [sendRequest]);
    console.log(users);
    return (
        <>
            { isLoading &&
                <h1>Loading ...</h1>
            }

            { !isLoading &&
             <UsersList users={users} />
            }
        </>
      )
}

export default Users_page