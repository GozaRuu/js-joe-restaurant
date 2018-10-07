import * as actionTypes from '../actionTypes';

export const promotions = (state = {isLoading: true, errMess: null, promotions: []}, action) => {
    switch(action.type) {
        case actionTypes.ADD_PROMOS:
            return {isLoading: false, errMess: null, promos: action.payload}

        case actionTypes.PROMOS_LOADING:
            return {isLoading: true, errMess: null, promos: []}

        case actionTypes.PROMOS_FAILED:
            return {isLoading: false, errMess: action.payload, promos: []}
        default:
            return state;
    }
}
