import UsersList from '../components/UsersList';

import '../styles/usersList.css'

const User = () => {
    
    const USERS = [
        {user: 'Nicole', id: 1, placeCount: 10, placeName: 'place 1', image: 'https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg'},
        {user: 'Sarah', id: 2, placeCount: 20, placeName: 'place 3', image: 'https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg'},
        {user: 'Nicole', id: 1, placeCount: 10, placeName: 'place 1', image: 'https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg'},
        {user: 'Sarah', id: 2, placeCount: 20, placeName: 'place 3', image: 'https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg'},
        {user: 'Nicole', id: 1, placeCount: 10, placeName: 'place 1', image: 'https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg'},
        {user: 'Nicole', id: 1, placeCount: 10, placeName: 'place 1', image: 'https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg'},
        {user: 'Sarah', id: 2, placeCount: 20, placeName: 'place 3', image: 'https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg'},
        {user: 'Nicole', id: 1, placeCount: 10, placeName: 'place 1', image: 'https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg'},
        {user: 'Sarah', id: 2, placeCount: 20, placeName: 'place 3', image: 'https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg'},
        {user: 'Nicole', id: 1, placeCount: 10, placeName: 'place 1', image: 'https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg'},
        {user: 'Sarah', id: 2, placeCount: 20, placeName: 'place 3', image: 'https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg'},
        {user: 'Nicole', id: 1, placeCount: 10, placeName: 'place 1', image: 'https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg'},
        {user: 'Nicole', id: 1, placeCount: 10, placeName: 'place 1', image: 'https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg'},
        {user: 'Sarah', id: 2, placeCount: 20, placeName: 'place 3', image: 'https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg'},
        {user: 'Nicole', id: 1, placeCount: 10, placeName: 'place 1', image: 'https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg'},
        
    ];

    return (
        <>
            <UsersList users={USERS} />

        </>
      )
}

export default User