import * as actionTypes from '../actionTypes';

export const comments = (state = {errMess: null, comments: []}, action) => {
    switch(action.type) {
        case actionTypes.ADD_COMMENTS:
            return {errMess: null, comments: action.payload}

        case actionTypes.COMMENTS_FAILED:
            return {errMess: action.payload, comments: []}

        case actionTypes.ADD_COMMENT:
            const comment = action.payload;
            comment.id = state.comments.length; //just for offline development will be changed after connection to backend
            comment.date = new Date().toISOString();
            return {...state, comments: [...state.comments, comment]};
        default:
            return state;
    }
}
