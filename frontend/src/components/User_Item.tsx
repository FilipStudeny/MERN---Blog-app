import { Link } from 'react-router-dom';
import User from './props/props_UserItem';


const UserIListtem = ({ username, image }: User) => {
  return (
      <Link className='usersList_Item' to={`/${username}/posts`}>
        <img className='UsersList_ItemImage' src={image} alt={image}/>
        <div className='usersList_Data'>
            <h2>{username}</h2>
        </div>
      </Link>

  )
}

export default UserIListtem