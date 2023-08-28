import actionTypes from './actionTypes';

export const userLoginSuccess =(userInfo) =>({
    type : actionTypes.USER_LOGIN_SUCCESS,
    userInfo : userInfo
})
export const processLogout =() =>({
    type :actionTypes.PROCESS_LOGOUT
})