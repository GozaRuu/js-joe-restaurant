import { COMMENTS } from '../../shared/comments';
import * as actionTypes from '../actionTypes';

export const comments = (state = COMMENTS, action) => {
    switch(action.type) {
        case actionTypes.ADD_COMMENT:
            const comment = action.payload;
            comment.id = state.length; //just for offline development will be changed after connection to backend
            comment.date = new Date().toISOString();
            return state.concat(comment);
        default:
            return state;
    }
}
