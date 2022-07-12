
import { UserListProps } from './props/props_UserItem';
import UserIListtem from './User_Item';


const UsersList = ( { users } : UserListProps ) => {


    if(!users?.length){
        return(
            <div className='usersList'>
                <h1>No users found</h1>
            </div>
        );
    }

    return(

        <div className='usersList'>
            <h1>Users</h1>
            {users.map(({username, image}) => (
                <UserIListtem 
                    username={username} 
                    image={image} 
                    key={username}
                    /> 
            ))
            }
        </div>
    );
  
}
 
export default UsersList;

