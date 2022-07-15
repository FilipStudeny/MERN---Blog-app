import { useEffect, useState } from 'react';
import useHttpRequest from '../components/hooks/htpp_hook';
import List from '../components/List';

const Users_page = () => {

    
    const [loadedUsers, setUsers] = useState([]);
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

    return (
        <>
            { isLoading &&
                <h1>Loading ...</h1>
            }

            { !isLoading &&
                <List users={loadedUsers} whichList='USERS' />
            }
        </>
      )
}

export default Users_page