import * as actionTypes from '../actiontypes/ActionTypes';

// LOAS USER AREA // 

export const loadUserStart = () => {
    return {
        type: actionTypes.LOAD_USER_START
    }
}

export const loadUserSuccess = (users) => {
    return {
        type: actionTypes.LOAD_USER_SUCCESS,
        payload: users
    }
}

export const loadUserError = (error) => {
    return {
        type: actionTypes.LOAD_USER_ERROR,
        payload: error
    }
}

// CREATE USER AREA // 

export const createUserStart = (user) => {
    return {
        type: actionTypes.CREATE_USER_START,
        payload: user
    }
}

export const createUserSuccess = () => {
    return {
        type: actionTypes.CREATE_USER_SUCCESS,
    }
}

export const createUserError = (error) => {
    return {
        type: actionTypes.CREATE_USER_ERROR,
        payload: error
    }
}

// DELETE USER AREA // 

export const deleteUserStart = (userId) => {
    return {
        type: actionTypes.DELETE_USER_START,
        payload: userId
    }
}

export const deleteUserSuccess = (userId) => {
    return {
        type: actionTypes.DELETE_USER_SUCCESS,
        payload: userId
    }
}

export const deleteUserError = (error) => {
    return {
        type: actionTypes.DELETE_USER_ERROR,
        payload: error
    }
}

// UPDATE USER AREA // 

export const updateUserStart = (userInfo) => {
    return {
        type: actionTypes.UPDATE_USER_START,
        payload: userInfo
    }
}

export const updateUserSuccess = () => {
    return {
        type: actionTypes.UPDATE_USER_SUCCESS
    }
}

export const updateUserError = (error) => {
    return {
        type: actionTypes.UPDATE_USER_ERROR,
        payload: error
    }
}

//  SIGNIN USER AREA // 

export const signInUser = (uid) => {
    return {
        type: actionTypes.SIGNIN_USER,
        payload: uid
    }
}

//  SIGNOUT USER AREA // 

export const signOutUser = (emptyObj) => {
    return {
        type: actionTypes.SIGNOUT_USER,
        payload: emptyObj
    }
}

//  SIGNUP USER AREA // 

export const signUpUser = (userInfo) => {
    return {
        type: actionTypes.SIGNUP_USER,
        payload: userInfo
    }
}

