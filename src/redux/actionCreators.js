import * as actionTypes from './actionTypes';
import { baseUrl } from '../shared/baseUrl'
import { DISHES } from '../shared/dishes';

//thunks

export const fetchDishes = () => (dispatch) =>{
    dispatch(dishesLoading(true));
    return fetch(baseUrl + 'dishes')
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
};

export const fetchComments = () => (dispatch) =>{
    return fetch(baseUrl + 'comments')
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
};

export const fetchPromos = () => (dispatch) =>{
    dispatch(promosLoading(true));
    return fetch(baseUrl + 'promotions')
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
};

export const fetchLeaders = () => (dispatch) =>{
    dispatch(promosLoading(true));
    return fetch(baseUrl + 'leaders')
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
};


//actions creators

export const addDishes = (dishes) => ({
    type: actionTypes.ADD_DISHES,
    payload: dishes
});

export const addComments = (comments) => ({
    type: actionTypes.ADD_COMMENTS,
    payload: comments
});

export const addPromos = (promos) => ({
    type: actionTypes.ADD_PROMOS,
    payload: promos
});

export const addLeaders = (leaders) => ({
    type: actionTypes.ADD_PROMOS,
    payload: leaders
});

export const addComment = (dishId, rating, author, comment) => ({
    type: actionTypes.ADD_COMMENT,
    payload: {dishId, rating, author, comment}
});

export const dishesLoading = () => ({
    type: actionTypes.DISHES_LOADING,
});

export const promosLoading = () => ({
    type: actionTypes.PROMOS_LOADING,
});

export const leadersLoading = () => ({
    type: actionTypes.LEADERS_LOADING,
});

export const dishesFailed = (ermess) => ({
    type: actionTypes.DISHES_FAILED,
    payload: ermess
});

export const commentsFailed = (ermess) => ({
    type: actionTypes.COMMENTS_FAILED,
    payload: ermess
});

export const promosFailed = (ermess) => ({
    type: actionTypes.PROMOS_FAILED,
    payload: ermess
});

export const leadersFailed = (ermess) => ({
    type: actionTypes.LEADERS_FAILED,
    payload: ermess
});
