import User from './props_UserItem';
import Post from './props_Post';

export default interface ListProps{
    users?: User[],
    posts?: Post[], 
    data?: any,
    whichList?: string,
}