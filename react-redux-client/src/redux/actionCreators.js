import * as actionTypes from "./actionTypes";
import { baseUrl } from "../shared/baseUrl";

//thunks

export const fetchDishes = () => dispatch => {
  dispatch(dishesLoading(true));
  return fetch(baseUrl + "dishes")
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error:  ${response.status} :  ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        const err = new Error(error.message);
        throw err;
      }
    )
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)));
};

export const fetchComments = () => dispatch => {
  return fetch(baseUrl + "comments")
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error:  ${response.status} :  ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        const err = new Error(error.message);
        throw err;
      }
    )
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};

export const fetchPromos = () => dispatch => {
  dispatch(promosLoading(true));
  return fetch(baseUrl + "promotions")
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error:  ${response.status} :  ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        const err = new Error(error.message);
        throw err;
      }
    )
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
};

export const fetchLeaders = () => dispatch => {
  dispatch(leadersLoading(true));
  return fetch(baseUrl + "leaders")
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error:  ${response.status} :  ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        const err = new Error(error.message);
        throw err;
      }
    )
    .then(response => response.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)));
};

export const postFeedback = data => dispatch => {
  return fetch(baseUrl + "feedback")
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error:  ${response.status} :  ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        const err = new Error(error.message);
        throw err;
      }
    )
    .then(response => response.json())
    .then(jsonResponse => {
      const body = {
        ...data,
        id: jsonResponse.length + 1,
        date: new Date().toISOString()
      };
      console.log(body);
      fetch(baseUrl + "feedback", {
        method: "POST",
        mode: "cors",
        credentials: "same-origin", // include, same-origin, *omit
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(body)
      })
        .then(response => response.json())
        .then(feedback => dispatch(receiveFeedback(feedback)));
    });
};

export const loginUser = creds => dispatch => {
  // dispatch requestLogin to kickoff the call to the API
  dispatch(requestLogin(creds));

  return fetch(baseUrl + "users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(creds)
  })
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        throw error;
      }
    )
    .then(response => response.json())
    .then(response => {
      if (response.success) {
        // If login was successful, set the token in local storage
        localStorage.setItem("token", response.token);
        localStorage.setItem("creds", JSON.stringify(creds));
        // Dispatch the success action
        dispatch(receiveLogin(response));
      } else {
        var error = new Error("Error " + response.status);
        error.response = response;
        throw error;
      }
    })
    .catch(error => dispatch(loginError(error.message)));
};

export const logoutUser = () => dispatch => {
  dispatch(requestLogout());
  localStorage.removeItem("token");
  localStorage.removeItem("creds");
  dispatch(receiveLogout());
};

//actions

export const addDishes = dishes => ({
  type: actionTypes.ADD_DISHES,
  payload: dishes
});

export const addComments = comments => ({
  type: actionTypes.ADD_COMMENTS,
  payload: comments
});

export const addPromos = promos => ({
  type: actionTypes.ADD_PROMOS,
  payload: promos
});

export const addLeaders = leaders => ({
  type: actionTypes.ADD_LEADERS,
  payload: leaders
});

export const addComment = (dishId, rating, author, comment) => ({
  type: actionTypes.ADD_COMMENT,
  payload: { dishId, rating, author, comment }
});

export const dishesLoading = () => ({
  type: actionTypes.DISHES_LOADING
});

export const promosLoading = () => ({
  type: actionTypes.PROMOS_LOADING
});

export const leadersLoading = () => ({
  type: actionTypes.LEADERS_LOADING
});

export const dishesFailed = ermess => ({
  type: actionTypes.DISHES_FAILED,
  payload: ermess
});

export const commentsFailed = ermess => ({
  type: actionTypes.COMMENTS_FAILED,
  payload: ermess
});

export const promosFailed = ermess => ({
  type: actionTypes.PROMOS_FAILED,
  payload: ermess
});

export const leadersFailed = ermess => ({
  type: actionTypes.LEADERS_FAILED,
  payload: ermess
});

export const receiveFeedback = data => ({
  type: actionTypes.RECEIVE_FEEDBACK,
  payload: data
});

export const requestLogin = creds => {
  return {
    type: actionTypes.LOGIN_REQUEST,
    creds
  };
};

export const receiveLogin = response => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    token: response.token
  };
};

export const loginError = message => {
  return {
    type: actionTypes.LOGIN_FAILURE,
    message
  };
};

export const requestLogout = () => {
  return {
    type: actionTypes.LOGOUT_REQUEST
  };
};

export const receiveLogout = () => {
  return {
    type: actionTypes.LOGOUT_SUCCESS
  };
};
