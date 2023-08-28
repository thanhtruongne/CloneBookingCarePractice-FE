const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',

    //user
    ADD_USER_SUCCESS :'ADD_USER_SUCCESS',
    USER_LOGIN_SUCCESS :'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL :'USER_LOGIN_FAIL',
    PROCESS_LOGOUT:'PROCESS_LOGOUT',

    // admin
    FETCH_GENDER_START : 'FETCH_GENDER_START',
    FETCH_GENDER_SUCCESS : 'FETCH_GENDER_SUCCESS',
    FETCH_GENDER_FAIL : 'FETCH_GENDER_FAIL',

    FETCH_POSITION_SUCCESS:'FETCH_POSITION_SUCCESS',
    FETCH_POSITION_FAIL:'FETCH_POSITION_FAIL',

    FETCH_ROLE_SUCCESS:'FETCH_ROLE_SUCCESS',
    FETCH_ROLE_FAIL:'FETCH_ROLE_FAIL',


    SAVE_USER_SUCCESS:'SAVE_USER_SUCCESS',
    SAVE_USER_FAIL:'SAVE_USER_FAIL',

    FETCH_ALL_USERREDUX_SUCCESS : 'FETCH_ALL_USERREDUX_SUCCESS',
    FETCH_ALL_USERREDUX_FAIL : 'FETCH_ALL_USERREDUX_FAIL',

    FETCH_DELETE_USEREDUX_SUCCESS : 'FETCH_DELETE_USEREDUX_SUCCESS',
    FETCH_DELETE_USEREDUX_FAIL : 'FETCH_DELETE_USEREDUX_FAIL',

    FETCH_EDIT_USERREDUX_SUCCESS : 'FETCH_EDIT_USERREDUX_SUCCESS',
    FETCH_EDIT_USERREDUX_FAIL : 'FETCH_EDIT_USERREDUX_FAIL',

    FETCH_DOCTOR_HOMEPAGE_SUCCESS : ' FETCH_DOCTOR_HOMEPAGE_SUCCESS',
    FETCH_DOCTOR_HOMEPAGE_FAIL : ' FETCH_DOCTOR_HOMEPAGE_FAIL',

    FETCH_ALL_DOCTOR_SUCCESS : ' FETCH_DOCTOR_SUCCESS',
    FETCH_ALL_DOCTOR_FAIL : ' FETCH_DOCTOR_FAIL',


    FETCH_CREATE_DOCTOR_DESC_SUCCESS : ' FETCH_CREATE_DOCTOR_DESC_SUCCESS',
    FETCH_CREATE_DOCTOR_DESC_FAIL : ' FETCH_CREATE_DOCTOR_DESC_FAIL',

    FETCH_ALLCODE_SCHEDULES_TIME_SUCCESS : 'FETCH_ALLCODE_SCHEDULES_TIME_SUCCESS',
    FETCH_ALLCODE_SCHEDULES_TIME_FAIL : 'FETCH_ALLCODE_SCHEDULES_TIME_FAIL',

    FETCH_ALLCODE_SCHEDULES_TIME_SUCCESS : 'FETCH_ALLCODE_SCHEDULES_TIME_SUCCESS',
    FETCH_ALLCODE_SCHEDULES_TIME_FAIL : 'FETCH_ALLCODE_SCHEDULES_TIME_FAIL',
    

    FETCH_DOCTOR_INFOR_APPOINTMENTS_SUCCESS : 'FETCH_DOCTOR_INFOR_APPOINTMENTS_SUCCESS',
    FETCH_DOCTOR_INFOR_APPOINTMENTS_FAIL : 'FETCH_DOCTOR_INFOR_APPOINTMENTS_FAIL',
   
    FETCH_DOCTOR_INFO_GET_INFOMATIONS_SUCCESS : 'FETCH_DOCTOR_INFO_GET_INFOMATIONS_SUCCESS',
    FETCH_DOCTOR_INFO_GET_INFOMATIONS_FAIL : 'FETCH_DOCTOR_INFO_GET_INFOMATIONS_FAIL',

})

export default actionTypes;