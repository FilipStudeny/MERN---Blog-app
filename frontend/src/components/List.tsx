import PostItem from './Post_Item';
import ListProps from './props/props_List';
import UserIListtem from './User_Item';

const List = ( { users, posts, whichList} : ListProps) => {

    const content = () => {
        switch (whichList) {
            case 'POSTS':

                if(!posts?.length){
                    return(
                        <div className='list'>
                            <h1>No posts Found !</h1>
                        </div>
                    )
                }
        
                const content_posts = (
                    <div className='list'>
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
                )

                return content_posts;

            case 'USERS':
                if(!users?.length) {
                    return(
                        <div className='list'>
                            <h1>No users Found !</h1>
                        </div>
                    );
                    
                }
            
                const content_users = (
                    <div className='list'>
                        <h1>Users</h1>
                        {users?.map(({username, image}) => (
                            <UserIListtem 
                                username={username} 
                                image={image} 
                                key={username}
                                /> 
                        ))
                        }
                    </div>
                )
                return content_users;

            default:
                return (
                    <>
                    <div className='list'>
                        <h1>Home Page</h1>
                    </div>
                    </>
                );
        }
    }

    return(
        content()
    )

}

export default List