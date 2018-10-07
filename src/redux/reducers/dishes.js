import * as actionTypes from '../actionTypes';

export const dishes = (state = {isLoading: true, errMess: null, dishes: []}, action) => {
    switch(action.type) {
        case actionTypes.ADD_DISHES:
            return {isLoading: false, errMess: null, dishes: action.payload}

        case actionTypes.DISHES_LOADING:
            return {isLoading: true, errMess: null, dishes: []}

        case actionTypes.DISHES_FAILED:
            return {isLoading: false, errMess: action.payload, dishes: []}

        default:
            return state;
    }
}
