import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./DetailClinic.scss";
import { LANGUAGE } from "../../../utils";
import HomeHeader from "../../Homepage/HomeHeader";
import { 
  GetClinicByIdclinicId,
  GetDetailDoctorDesc
} from "../../../services/userServices";
import moment from "moment";
import _ from'lodash';
import * as actions from '../../../store/actions/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DoctorDatePick from "./DoctorDatePick";
import DoctorExtraInfo from "./DoctorExtraInfo";
import ProfileDoctor from "./ProfileDoctor";
class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
       ArrDoctor : [],
       Descriptions : ''
    };
 
  }


  async componentDidMount() {
   if(this.props.match && this.props.match.params && this.props.match.params.id) {
    let CustomClinic = await GetClinicByIdclinicId(this.props.match.params.id);
    if(CustomClinic && CustomClinic.errCode ===0) {
      let Push = CustomClinic.data.response;
      let arr = [];
      if(Push && !_.isEmpty(Push)) {
        Push.map(item =>{
          arr.push(item.doctorId)
        })
      }
      this.setState({
        ArrDoctor : arr ? arr : [],
        Descriptions : CustomClinic.data.descriptionHTML
      })
    }
   }
  }

  render() {
  console.log(this.state); 
  let {Descriptions,ArrDoctor} = this.state;
  
      return (
        <React.Fragment>
          <HomeHeader ishowBanner={false} />
              <div className="desc container mb-4">  
                <div dangerouslySetInnerHTML={{__html:Descriptions }}></div>
              </div>
              <div className="background_image">
           <div className="container">
            <h2 className="text-info">Bác sĩ Khu vực</h2>
         {ArrDoctor && ArrDoctor.length > 0 && 
         ArrDoctor.map((item,index) => {
          return (
            <div className="content_type mt-4" key={item}>
              <div className="Wrapper_Doctor_Info_Specialty d-flex justify-content-between">
                <div className="content-left">
                        <ProfileDoctor 
                        ValueDetailDoctor={item}  
                        isShowSocial={false}
                        />
                      <div className="see_more pl-2">
                      </div>
                          <Link to={`/doctor-detail/${item}`} >Xem thêm</Link>   
                </div>
                <div className="content_right">
                  <div className="right_content">
                    <div className="Time_schedules">
                      <DoctorDatePick IdParamsDoctor={item}/>
                    </div>
                    <div className="Address_Province_Price">
                      <DoctorExtraInfo DoctorInfoId={item} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
          
         })
         }
          </div>
         </div>
      
      
        </React.Fragment>
    )
    
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
 
  };
};
// sử dụng dispatch trong hàm này để sử dụng redux
const mapDispatchToProps = (dispatch) => {
  return {
       
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
