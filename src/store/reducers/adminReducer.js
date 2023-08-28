import actionTypes from "../actions/actionTypes";

const initialState = {
  genders: [],
  potisions: [],
  roles: [],
  AllUserRedux: [],
  ListAllDoctor: [],
  arrDoctorHomePageLimit: [],
  AllcodeTimeSchedules : [],
  DataDoctorInfomationsSchedules :[],
  isLoadingState: false,
  messageRespone: "",
  DataDoctorAppointments : []
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    //Gender
    case actionTypes.FETCH_GENDER_START:
      let copyState = { ...state };
      copyState.isLoadingState = true;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:

      state.isLoadingState = false;
      state.genders = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAIL:
      state.isLoadingState = false;
      state.genders = [];
      return {
        ...state,
      };

    //Positon
    case actionTypes.FETCH_POSITION_SUCCESS:
     
      state.potisions = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAIL:
      state.potisions = [];
      return {
        ...state,
      };

    //Role
    case actionTypes.FETCH_ROLE_SUCCESS:
   
      state.roles = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAIL:
      
      state.roles = [];
      return {
        ...state,
      };

    // Save User
    case actionTypes.FETCH_ALL_USERREDUX_SUCCESS:
      // console.log('Save ' ,  action)
      state.AllUserRedux = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USERREDUX_FAIL:
      state.AllUserRedux = [];
      return {
        ...state,
      };

    //DELETE USER_REDUX
    case actionTypes.FETCH_DELETE_USEREDUX_SUCCESS:
      // console.log('delete',action.message)
      return {
        ...state,
      };
    case actionTypes.FETCH_DELETE_USEREDUX_FAIL:
      return {
        ...state,
      };

    case actionTypes.FETCH_EDIT_USERREDUX_SUCCESS:
      return {
        ...state,
      };
    case actionTypes.FETCH_EDIT_USERREDUX_FAIL:
      return {
        ...state,
      };
    case actionTypes.FETCH_DOCTOR_HOMEPAGE_SUCCESS:
      state.arrDoctorHomePageLimit = action.dataHomepage;
      return {
        ...state,
      };
    case actionTypes.FETCH_DOCTOR_HOMEPAGE_FAIL:
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
      state.ListAllDoctor = action.dataResponse;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTOR_FAIL:
      state.ListAllDoctor = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_CREATE_DOCTOR_DESC_SUCCESS:
      return {
        ...state,
      };
    case actionTypes.FETCH_CREATE_DOCTOR_DESC_FAIL:
      return {
        ...state,
      };
    case actionTypes.FETCH_ALLCODE_SCHEDULES_TIME_SUCCESS:
        state.AllcodeTimeSchedules = action.data;
      return {
        ...state,
      }; 

    case actionTypes.FETCH_DOCTOR_INFOR_APPOINTMENTS_SUCCESS :     
      state.DataDoctorAppointments = action.data;
      return {
      ...state
      }  
    case actionTypes.FETCH_DOCTOR_INFOR_APPOINTMENTS_FAIL : 
    state.DataDoctorAppointments = [];
      return {
      ...state
      }    
    case actionTypes.FETCH_DOCTOR_INFO_GET_INFOMATIONS_SUCCESS:
       state.DataDoctorInfomationsSchedules  = action.data;
       return {
        ...state
       }     
    default:
      return state;
  }
};

export default adminReducer;
