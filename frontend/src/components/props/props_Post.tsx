export interface PostsProps{
    posts: Post[]
}

export interface Post{
    creator_id: string,
    creator_name: string,
    id: number,
    image?: string,
    title: string,
    description: string,
    created_at: string,
    
}

