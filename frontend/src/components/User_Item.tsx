import { Link } from 'react-router-dom';
import User from './props/props_UserItem';


const UserItem = ({ username, user_image, id }: User) => {

  return (
      <Link className='user_List_Item' to={`/${username}/${id}/posts`}>
        <img className='user_List_profile_picture' src={`http://localhost:8000/${user_image}`} alt={'User profile img'}/>
        <div className='user_List_data'>
            <h2>{username}</h2>
        </div>
      </Link>

  )
}

export default UserItem