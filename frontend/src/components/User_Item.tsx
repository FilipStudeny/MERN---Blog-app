import { Link } from 'react-router-dom';
import User from './props/props_UserItem';


const UserIListtem = ({ user, id, image, placeCount, placeName }: User) => {
  return (
      <Link className='usersList_Item' to={`/${user}/posts`}>
        <img className='UsersList_ItemImage' src={image} alt={placeName}/>
        <div className='usersList_Data'>
            <h2>{user}</h2>
            <h3>Places visited: {placeCount}</h3>
        </div>
      </Link>

  )
}

export default UserIListtem