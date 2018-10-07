import * as actionTypes from '../actionTypes';

export const promotions = (state = {isLoading: true, errMess: null, promotions: []}, action) => {
    switch(action.type) {
        case actionTypes.ADD_PROMOS:
            return {isLoading: false, errMess: null, promotions: action.payload}

        case actionTypes.PROMOS_LOADING:
            return {isLoading: true, errMess: null, promotions: []}

        case actionTypes.PROMOS_FAILED:
            return {isLoading: false, errMess: action.payload, promotions: []}
        default:
            return state;
    }
}
