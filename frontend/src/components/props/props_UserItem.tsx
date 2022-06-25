export interface UserListProps{
    users: User[]
}


export default interface User {
    user: string,
    id: number,
    image: string,
    placeCount: number,
    placeName: string

}
