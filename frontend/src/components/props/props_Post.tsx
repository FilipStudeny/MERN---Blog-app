export interface PostsProps{
    places: Post[]
}

export interface Post{
    user: string,
    postID: number,
    image?: string,
    placeName: string,
    placeLocation: string,
}

