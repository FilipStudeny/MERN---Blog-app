import FormText from './form/FormText';
import PostItem from './Post_Item';
import ListProps from './props/props_List';
import UserItem from './User_Item';

const List = ( { users, posts, whichList} : ListProps) => {

    const content = () => {
        switch (whichList) {
            case 'POSTS':

                if(!posts?.length){
                    return(
                        <div className='list'>
                            <FormText type='ERROR' text="No posts found !" />
                        </div>
                    )
                }
        
                const content_posts = (
                    <div className='list'>
                        <h1>Posts</h1>
                        {posts.map(({ creator_id, creator_name, title, id, description, createdAt }) => (
                            <PostItem 
                                creator_id={creator_id}
                                creator_name={creator_name}
                                title={title}
                                description={description}
                                id={id} createdAt={createdAt}                    
                                /> 
                        ))}
                    </div>
                )

                return content_posts;

            case 'USERS':
                if(!users?.length) {
                    return(
                        <div className='list'>
                            <FormText type='ERROR' text="No users found !" />
                        </div>
                    );
                    
                }
            
                const content_users = (
                    <div className='list'>
                        <h1>Users</h1>
                        {users.map(({username, user_image, id}) => (
                            <UserItem 
                                username={username} 
                                user_image={user_image} 
                                key={username}
                                id={id}
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
                        <FormText type='LOADING' text="All posts!" />

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