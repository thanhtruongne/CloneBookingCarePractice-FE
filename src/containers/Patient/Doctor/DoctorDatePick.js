import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LANGUAGE } from "../../../utils";
import moment from "moment/moment";
import { GetTimeStampSchedulesDoctor } from "../../../services/userServices";
import 'moment/locale/vi';
import './DoctorDatePick.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
class DoctorDatePick extends Component {
  constructor(props) {
    super(props);
    this.state = {
       allDay : [],
       AllTimeSchedules : [],
       currentTimeChoose : ''
    };
  }

  async componentDidMount() {  
       let allDay =   this.setArrDate(this.props.language); 
        for(let i = 0; i < allDay.length; i++) {     
          if(this.props.IdParamsDoctor) {
            let res = await GetTimeStampSchedulesDoctor(allDay[i].value,this.props.IdParamsDoctor);
            if(res && res.errCode === 0) {
              this.setState({
                AllTimeSchedules : res.data,   
              })
              break;
            }
          }
      }
      this.setState({
        allDay : allDay
      })    
  }

 async componentDidUpdate(prevProps,prevState) {
    if(this.props.language != prevProps.language) {
        this.setArrDate(this.props.language);
    }
    if(this.props.IdParamsDoctor != prevProps.IdParamsDoctor) {
      let allday = this.setArrDate(this.props.language)
      let res = await GetTimeStampSchedulesDoctor(allday,this.props.IdParamsDoctor);
      this.setState({
        AllTimeSchedules : res.data ? res.data  : []
      })
    }
 }
  setArrDate =(language) => {
    let allDay = [];
    for(let i = 0 ; i < 7 ; i++) {
          let obj = {};
          if(language === LANGUAGE.VI) {
            if(i === 0) {
              let ValueVi = moment(new Date()).add(i,'days').format('DD/MM');
              let today = `Hôm nay - ${ValueVi}`
              obj.label = today;
            }
            else {
              let ValueVi = moment(new Date()).add(i,'days').format('dddd - DD/MM');
              obj.label = ValueVi.charAt(0).toUpperCase() + ValueVi.slice(1);      
            }
          }
          else {
            if(i === 0) {
              let ValueVi = moment(new Date()).add(i,'days').format('DD/MM');
              let today = `Today - ${ValueVi}`
              obj.label = today;
            }
            else {
              obj.label = moment(new Date()).add(i,'days').locale('en').format('dddd - DD/MM/YYYY');
            }
          }
          obj.value = moment(new Date()).add(i,'days').startOf('day').valueOf();
          allDay.push(obj);
    }
       return allDay;
  }

   handleChangeSchedule =async(e) => {
    let { IdParamsDoctor} = this.props;
    let doctorId = IdParamsDoctor;
    let formatdate = e.target.value; 
    let results = [];
    let response =  await GetTimeStampSchedulesDoctor(formatdate,doctorId);
    if(response && response.errCode === 0) {
      results = response.data;
    }
    this.setState({
      AllTimeSchedules : results
    })
  }

  handleThisBookingAppointment = (time,type) => {
    let id =this.props.IdParamsDoctor;
    this.props.history.push(`/booking-appointments-doctors/${time}/${id}/${type}`);
  }

  render() {
      let { allDay,AllTimeSchedules} = this.state;
   return (
      <React.Fragment>
       <div className="Wrapper_date-picker mb-2">
                 <select className="choose_select"  onChange={(e) => this.handleChangeSchedule(e)}>
                  {allDay && allDay.length > 0 && allDay.map((item,index) => {
                    return (
                        <option
                            value={item.value}
                            key={index}                         
                         >
                           {item.label}
                         </option>
                    )
                  })}
                 </select>
       </div>
       <div className="content_choose-date">
                 <span><FontAwesomeIcon icon={faCalendar}/>Lịch Khám</span>
                 <div className="wrapper_btn">
                 {AllTimeSchedules && AllTimeSchedules.length > 0 ?
                 AllTimeSchedules.map((item,index) => {
                  return (
                    <button className="br" key={index} value={item.date}
                    onClick={() => this.handleThisBookingAppointment(item.date,item.timeType)}
                    >
                    {this.props.language === LANGUAGE.VI
                     ? item.TimeData.valueVi
                     : item.TimeData.valueEn
                    }
                    </button>
                  )
                 }) : <span>Không có lịch hẹn trong thời gian này,vui lòng chọn thời gian khác</span>
                 }
                 
                 </div>
       </div>
        
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language : state.app.language
  };
};
// sử dụng dispatch trong hàm này để sử dụng redux
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorDatePick)) ;
