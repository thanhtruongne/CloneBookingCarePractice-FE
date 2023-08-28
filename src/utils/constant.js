export const path = {
    HOME: '/',
    HOMEPAGE :'/home',
    LOGIN: '/login',
    LOG_OUT: '/logout',
    SYSTEM: '/system',
    DOCTOR_DETAIL:'/doctor-detail/:id',
    BOOKING_APPOINTMENTS : '/booking-appointments-doctors/:time/:id/:type',
    DOCTOR_SCHEDULE :'/doctor/',
    VERTIFY_BOOKING_SCHEDULES : '/vertify-booking-schedules/',
    SPECIALTYS_DOCTOR : '/specialtys-doctors/:id',
    CLINIC_DOCTOR : '/clinics-doctor/:id'
};

export const ACTION_CRUD ={
    CREATE :'CREATE',
    READ :'READ',
    UPDATE:'UPDATE',
    EDIT:'EDIT',
    DELETE :'DELETE',
}

export const LANGUAGE = {
    VI: 'vi',
    EN: 'en'
};

export const USER_ROLE ={
    ADMIN : 'R1',
    DOCTOR : 'R2',
    PATIENT :'R3'
}
 
export const manageActions = {
    ADD: "ADD",
    EDIT: "EDIT",
    DELETE: "DELETE"
};

export const dateFormat = {
    SEND_TO_SERVER: 'DD/MM/YYYY'
};

export const YesNoObj = {
    YES: 'Y',
    NO: 'N'
}