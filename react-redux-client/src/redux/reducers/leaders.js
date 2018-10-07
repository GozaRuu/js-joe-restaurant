import * as actionTypes from '../actionTypes';

export const leaders = (state = {isLoading: true, errMess: null, leaders: []}, action) => {
    switch(action.type) {
        case actionTypes.ADD_LEADERS:
            return {isLoading: false, errMess: null, leaders: action.payload}

        case actionTypes.LEADERS_LOADING:
            return {isLoading: true, errMess: null, leaders: []}

        case actionTypes.LEADERS_FAILED:
            return {isLoading: false, errMess: action.payload, leaders: []}
        default:
            return state;
    }
}
