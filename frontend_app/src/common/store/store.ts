import {Post} from './../../container/home/utils/interfaces/post.interface';
interface stateInterface {
    age: number;
    postList: Post[],
    filterPostList: Post[],
}
export const initialState: stateInterface = {
    age: 20,
    postList: [],
    filterPostList: [],
}