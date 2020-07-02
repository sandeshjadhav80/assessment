// const initialState = {
//     age:20,
// };
import {initialState} from './../store';
import {ADD_POST, FILTER_POST} from '../actions/postActions';
import {Post} from './../../../container/home/utils/interfaces/post.interface';
const reducer = (state=initialState, action: any) => {
    const newState = {...state};

    switch(action.type){
        case 'AGE_UP': 
            newState.age += action.value;
            break;
        
        case 'AGE_DOWN': 
            newState.age -= action.value;
            break;
        
        case ADD_POST: 
            newState.postList = [...state.postList, {title: action.payload.title, text: action.payload.text}];
            break;
        
        case FILTER_POST: 
            if(action.payload.searchText.trim().length === 0) {
                newState.filterPostList = state.postList;
            } else {
                const filterPost = [];
                for (const post of state.postList) {
                    if (post.title.includes(action.payload.searchText) || post.text.includes(action.payload.searchText)) {
                        filterPost.push(post);
                    }
                }
                newState.filterPostList = filterPost;
            }
            break;
    }
    return newState;
};

export default reducer;