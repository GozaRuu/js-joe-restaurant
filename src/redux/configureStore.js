import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';
import { dishes } from './reducers/dishes';
import { comments } from './reducers/comments';
import { promotions } from './reducers/promotions';
import { leaders } from './reducers/leaders';
import { InitialFeedback } from './forms/feedbackForm';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes,
            comments,
            promotions,
            leaders,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
};
