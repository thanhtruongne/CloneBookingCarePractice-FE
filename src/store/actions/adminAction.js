import actionTypes from "./actionTypes";
import {
  getAllCodeServices,
  handleCreateUser,
  handleGetAllUser,
  handleDeleteUserClient,
  handleEditUserClient,
  getDoctorHomePageLimit,
  getAllDoctor,
  CreateDoctorDesc,
  GetDoctorInfomationSchedules
} from "../../services/userServices";
import { toast } from "react-toastify";
import { get } from "lodash";
// Gender
export const fetchGenderStart = () => {
  //Hàm này dc gọi đến và xử lý đầu tiên && sau đó  truyền xuống SUCCESS OR FAIL
  // return về một hàm
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      let gender = await getAllCodeServices("gender");
      // (gender)
      if (gender) {
        dispatch(fetchGenderSuccess(gender.sub));
      } else {
        dispatch(fetchGenderFail());
      }
    } catch (error) {
      console.log("Error", error);
    }
  };
};
export const fetchGenderSuccess = (dataGender) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: dataGender,
});
export const fetchGenderFail = () => ({
  type: actionTypes.FETCH_GENDER_FAIL,
});

// Position
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let position = await getAllCodeServices("position");
      // (gender)
      if (position) {
        dispatch(fetchPositionSuccess(position.sub));
      } else {
        dispatch(fetchPositionFail());
      }
    } catch (error) {
      console.log("Error", error);
    }
  };
};
export const fetchPositionSuccess = (dataPosition) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: dataPosition,
});
export const fetchPositionFail = () => ({
  type: actionTypes.FETCH_POSITION_FAIL,
});

// Role
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let role = await getAllCodeServices("role");
      if (role) {
        dispatch(fetchRoleSuccess(role.sub));
      } else {
        dispatch(fetchRoleFail());
      }
    } catch (error) {
      console.log("Error", error);
    }
  };
};
export const fetchRoleSuccess = (dataRole) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: dataRole,
});
export const fetchRoleFail = () => ({
  type: actionTypes.FETCH_ROLE_FAIL,
});

// Save User
export const SaveUserStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let dataUser = await handleCreateUser(data);
      if (dataUser) {
        toast.success("Create User Successfully");
        dispatch(SaveUserStart(dataUser));
      } else {
        toast.error("Create User Fail");
        dispatch(SaveUserFail());
      }
    } catch (error) {
      console.log("Error", error);
    }
  };
};
export const SaveUserSuccess = (dataUserCreate) => ({
  type: actionTypes.SAVE_USER_SUCCESS,
  data: dataUserCreate,
});
export const SaveUserFail = () => ({
  type: actionTypes.SAVE_USER_FAIL,
});

//FETCH_DATA_UserRedux
export const FetchAllUserReduxStart = () => {
  return async (dispatch, getState) => {
    try {
      let fetchDataRedux = await handleGetAllUser("All");
      if (fetchDataRedux) {
        dispatch(FetchAllUserReduxSuccess(fetchDataRedux.data.reverse()));
      } else {
        dispatch(FetchAllUserReduxSuccess());
      }
    } catch (error) {
      console.log("Error", error);
    }
  };
};
export const FetchAllUserReduxSuccess = (fetchDataRedux) => ({
  type: actionTypes.FETCH_ALL_USERREDUX_SUCCESS,
  data: fetchDataRedux,
});
export const FetchAllUserReduxFail = () => ({
  type: actionTypes.FETCH_ALL_USERREDUX_FAIL,
});

//FETCH_DELETE_USER_REDUX
export const FetchDeleteUserReduxStart = (id) => {
  return async (dispatch, getState) => {
    try {
      let data = await handleDeleteUserClient(id);
      if (data) {
        dispatch(FetchDeleteUserReduxSuccess(data.message));
      } else {
        dispatch(FetchAllUserReduxFail());
      }
    } catch (error) {
      console.log("Error", error);
    }
  };
};
export const FetchDeleteUserReduxSuccess = (dataMessage) => ({
  type: actionTypes.FETCH_DELETE_USEREDUX_SUCCESS,
  message: dataMessage,
});
export const FetchDeleteUserReduxFail = () => ({
  type: actionTypes.FETCH_DELETE_USEREDUX_FAIL,
});

// FETCH_EDIT_USER_REDUX_SUCCESS
export const FetchEditUserReduxStart = (user) => {
  return async (dispatch, getState) => {
    try {
      let userData = await handleEditUserClient(user);
  
      if (userData && userData.errCode === 0) {
        dispatch(FetchEditUserReduxSuccess(userData));
      } else {
        toast.error(userData.errCode);
        dispatch(FetchAllUserReduxFail());
      }
    } catch (error) {
      console.log.log("Error", error);
    }
  };
};
export const FetchEditUserReduxSuccess = (user) => ({
  type: actionTypes.FETCH_EDIT_USERREDUX_SUCCESS,
  data: user,
});

export const FetchEditUserReduxFail = (user) => ({
  type: actionTypes.FETCH_EDIT_USERREDUX_FAIL,
});

//FETCH_DOCTOR_HOMEPAGE
export const fetchDoctorHomePage = () => {
  return async (dispatch, getState) => {
    try {
      let dataResponse = await getDoctorHomePageLimit("10");
      if (dataResponse) {
        dispatch({
          type: actionTypes.FETCH_DOCTOR_HOMEPAGE_SUCCESS,
          dataHomepage: dataResponse,
        });
      } else {
        dispatch({ type: actionTypes.FETCH_DOCTOR_HOMEPAGE_FAIL });
      }
    } catch (error) {
      console.log("Error", error);
    }
  };
};

//FETCH_DOCTOR
export const fetchAllDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let response = await getAllDoctor();
      if (response && response.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
          dataResponse: response.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_FAIL,
        });
      }
    } catch (error) {
      console.log("Error", error);  
    }
  };
};

//FETCH_CREATE_DOCTOR_DESC
export const fetchCreateDoctorDesc = (data) => {
  return async (dispatch, getState) => {
    try {
      let response = await CreateDoctorDesc(data);    
      if (response && response.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_CREATE_DOCTOR_DESC_SUCCESS,
          dataCreate: response.data,
        });
      } else {
        dispatch({ type: actionTypes.FETCH_CREATE_DOCTOR_DESC_FAIL });
      }
    } catch (error) {
      console.log("Error", error);
    }
  };
};

export const fetchAllcodesSchedulesTime =(data) => {
  return async(dispatch,getState) => {
    try {
      let response = await getAllCodeServices("TIME");
      if(response && response.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULES_TIME_SUCCESS,
          data : response.sub
        })
      }
      else {
        dispatch({ type: actionTypes.FETCH_ALLCODE_SCHEDULES_TIME_FAIL,})
      }
    } catch (error) {
      console.log("Error", error);
    }
  }
}

//FETCH_DOCTOR_INFO_APPOINTSMENTS
export const fetchDoctorInfoAppointment = () => {
  return async(dispatch,getState) => {
      try {
        let province = await getAllCodeServices("PROVINCE");
        let price = await getAllCodeServices("PRICE");
        let payment = await getAllCodeServices("PAYMENT");
        if(province && province.errCode === 0 && price && price.errCode === 0 && payment && payment.errCode === 0) {
          let DataProvince = province.sub; let DataPrice = price.sub;  let DataPayment = payment.sub
          dispatch({type :actionTypes.FETCH_DOCTOR_INFOR_APPOINTMENTS_SUCCESS,
          data :{
            DataProvince,
            DataPrice,
            DataPayment
          }
          })
        }
        else {
          dispatch({type :actionTypes.FETCH_DOCTOR_INFOR_APPOINTMENTS_FAIL });
        }
        
      } catch (error) {
        console.log("Error", error);
      }
  }
}

//GET INFOMATION DOCTOR_TO INFO
export const fetchDoctorInfomationsSchedules =(doctorId) => {
    return async(dispatch,getState) => {
        try {
          let response = await GetDoctorInfomationSchedules(doctorId);
          console.log.log(response);
          if(response && response.errCode == 0) {
            dispatch({
              type : actionTypes.FETCH_DOCTOR_INFO_GET_INFOMATIONS_SUCCESS,
              data : response.data
            })
          }
          else {
            dispatch({type : actionTypes.FETCH_DOCTOR_INFO_GET_INFOMATIONS_FAIL})
          }
        } catch (error) {
          console.log.log(error);
        }
    }
}

