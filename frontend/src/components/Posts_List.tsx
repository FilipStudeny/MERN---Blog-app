import PostItem from './Post_Item';
import { PostsProps } from './props/props_Post'

import '../styles/placesList.css'


const PostsList = ({ places } : PostsProps) => {


    if(!places?.length){
        return(
            <div className='placesList'>
                <h1>No places Found !</h1>
            </div>
        );
    }

    return(
        <div className='placesList'>
            <h1>Posts</h1>
            {places.map(({user, postID, image , placeName, placeLocation}) => (
                <PostItem 
                    user={user} 
                    postID={postID} 
                    image={image} 
                    placeName={placeName} 
                    placeLocation={placeLocation}/> 
            ))}
        </div>
    );
}

export default PostsList