import axios from '../axios'
import Specialty from '../containers/Homepage/Section/Specialty';

const handeLoginApi = (email, password) => {
    return axios.post('/v1/api/login', { email, password });
}
//[GET] API to User
const handleGetAllUser = (userId) => {
    return axios.get(`/v1/api/getAllUser?id=${userId}`,{params :userId})
}
const handleCreateUser = (data) => {
    return axios.post('/v1/api/createuser', data)
}

const handleDeleteUserClient = (id) => {
    return axios.delete('/v1/api/deleteuser', { data: { id: id } })
}

const handleEditUserClient = (inputdata) => {
    return axios.put('/v1/api/edituser', inputdata);
}
const getAllCodeServices = (inputType) => {
    return axios.get(`v1/allcode?type=${inputType}`, {params : inputType})
}

const getDoctorHomePageLimit =(limitInput) => {
    return axios.get(`/v2/api/getDoctorHomePage?limit=${limitInput}`)
}

const getAllDoctor = () => {
    return axios.get('/v2/api/get-all-Doctor');
}

const CreateDoctorDesc = (data) => {
    return axios.post('/v2/api/saveDoctorDesc', data);
}

const GetDetailDoctorDesc =(id) => {
    return axios.get(`/v2/api/getDetailDoctorDesc?id=${id}`)
}

const PostSchedulesTimeDoctor = (data) => {
    return axios.post('/v2/api/bulk-create-doctor-time',data);
}

const GetTimeStampSchedulesDoctor = (formatedDate,doctorId) => {
   return axios.get(`/v2/api/get_TimeStamp_Doctor_Schedules?date=${formatedDate}&doctorId=${doctorId}`);
}

const GetDoctorInfomationSchedules =(doctorId) => {
    return axios.get(`/v2/api/get_Doctor_Info_Schedules?doctorId=${doctorId}`)
}

const GetTimeBookingDoctorSchedules =(keyMap) => {
    return axios.get(`/v2/api/get_time_booking_doctor_schedule?keyMap=${keyMap}`);
}

const PostBookingDoctorSchedules =(data) => {
   return axios.post('/v2/api/post_booking_doctor_schedules', data)
}

const VertifyingBookingDoctorSchedules =(data) => {
    return axios.post('/v2/api/vertify-booking-doctor-schedules',data);
}

const SaveDoctorSpecialtysAppointment =(data) => {
    return axios.post('/v2/api/PostSaveManagerDoctorAppointments',data);
}

const GetDoctorSpecialtysAppointmentAll =(id) => {
    return axios.get(`/v2/api/GetDoctorSpecialtyAppointments?id=${id}`)
}

const GetDoctorInfoWhereSpecialtyID = (SpecialtyID,Province) => {
    return axios.get(`/v2/api/GetInfoDoctorSpecialtyIdAppointments?specialtyId=${SpecialtyID}&provinceId=${Province}`)
}

const PostClinicsNameManager = (data) => {
    return axios.post('/v2/api/PostClinicManagerDoctor',data);
}

const GetAllClinics = () => {
    return axios.get('/v2/api/getDataClinicDoctorAll');
}

const GetClinicByIdclinicId = (InputID) => {
  return axios.get(`/v2/api/GetClinicDoctorById?clinicId=${InputID}`)
}

const GetListPatientDoctor = (doctorId,date) => {
    return axios.get(`/v2/api/GetDataPatientList?doctorId=${doctorId}&date=${date}`)
}

const SendRemedyPatient = (data) => {
    return axios.post('/v2/api/postSendRemedyPatient',data);
}
export {
    handeLoginApi, 
    handleGetAllUser,
    handleCreateUser,
    handleDeleteUserClient,
    handleEditUserClient,
    getAllCodeServices,
    getDoctorHomePageLimit,
    getAllDoctor,
    CreateDoctorDesc,
    GetDetailDoctorDesc,
    PostSchedulesTimeDoctor,
    GetTimeStampSchedulesDoctor,
    GetDoctorInfomationSchedules,
    GetTimeBookingDoctorSchedules,
    PostBookingDoctorSchedules,
    VertifyingBookingDoctorSchedules,
    SaveDoctorSpecialtysAppointment,
    GetDoctorSpecialtysAppointmentAll,
    GetDoctorInfoWhereSpecialtyID,
    PostClinicsNameManager,
    GetAllClinics,
    GetClinicByIdclinicId,
    GetListPatientDoctor,
    SendRemedyPatient
}