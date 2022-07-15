import { Link } from 'react-router-dom';
import User from './props/props_UserItem';


const UserIListtem = ({ username, image }: User) => {
  return (
      <Link className='user_List_Item' to={`/${username}/posts`}>
        <img className='user_List_profile_picture' src={image} alt={image}/>
        <div className='user_List_data'>
            <h2>{username}</h2>
        </div>
      </Link>

  )
}

export default UserIListtem