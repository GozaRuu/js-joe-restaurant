import * as actionTypes from '../actionTypes';
import { initialFeedbackForm } from '../forms/initialFeedbackForm'


export const feedbackFormResponse = (state = initialFeedbackForm, action) => {
    switch(action.type) {
        case actionTypes.RECEIVE_FEEDBACK:
            return action.payload;
        default:
            return state;
    }
}
