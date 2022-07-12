import PostItem from './Post_Item';
import { PostsProps } from './props/props_Post'

import '../styles/placesList.css'


const PostsList = ({ posts } : PostsProps) => {

    if(!posts?.length){
        return(
            <div className='placesList'>
                <h1>No places Found !</h1>
            </div>
        );
    }

    return(
        <div className='placesList'>
            <h1>Posts</h1>
            {posts.map(({ creator_id, creator_name, title, id, description }) => (
                <PostItem 
                    creator_id={creator_id}
                    creator_name={creator_name}
                    title={title}
                    description={description}
                    id={id} created_at={''}                    
                    /> 
            ))}
        </div>
    );
}

export default PostsList