import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';
import { dishes } from './reducers/dishes';
import { comments } from './reducers/comments';
import { promotions } from './reducers/promotions';
import { leaders } from './reducers/leaders';
import { feedbackFormResponse } from './reducers/feedbackFormResponse';
import { initialFeedbackForm } from './forms/initialFeedbackForm';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes,
            comments,
            promotions,
            leaders,
            feedbackFormResponse,
            ...createForms({
                feedback: initialFeedbackForm
            })
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
};
