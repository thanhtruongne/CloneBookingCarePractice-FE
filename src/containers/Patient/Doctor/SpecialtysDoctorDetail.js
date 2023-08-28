import React, { Component, Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./SpecialtysDoctorDetail.scss";
import _ from "lodash"
import { LANGUAGE } from "../../../utils";
import HomeHeader from "../../Homepage/HomeHeader";
import { 
  GetDoctorSpecialtysAppointmentAll,
  GetDoctorInfoWhereSpecialtyID,
  getAllCodeServices
 } from "../../../services/userServices";
import DoctorDatePick from "./DoctorDatePick";
import DoctorExtraInfo from "./DoctorExtraInfo";
import ProfileDoctor from "./ProfileDoctor";
class SpecialtysDoctorDetail extends Component {
  constructor(props) {
      super(props);
      this.state = {
      DescSpecialty : '',
      DetailDoctorArr : [],
      ArrayDoctor : [],
      ListProvince : []
    };
    
  }


  async componentDidMount() {
    let id = this.props.match.params.id;
    // Description Specialty
    let SpecialtyIDdoctor = await GetDoctorSpecialtysAppointmentAll(id);
    // Fetch Data Doctor have a specialtyID
    let Doctors = await GetDoctorInfoWhereSpecialtyID(id,"All");
    // Province 
    let Province = await getAllCodeServices("PROVINCE");

    if(SpecialtyIDdoctor && SpecialtyIDdoctor.errCode === 0 &&  Doctors && Doctors.errCode === 0  && Province.errCode === 0 ) {
      let dataProvince = Province.sub;
        dataProvince.unshift({
          keyMap : 'All',
          valueVi : "Toàn quốc",
          valuEn : 'Nationwide'
        })
      let DoctorMap = Doctors.data;
      let arr =[];

      if(DoctorMap && !_.isEmpty(DoctorMap)) {
        DoctorMap.map(item => {
          arr.push(item.doctorId);
        })
      }
      this.setState({
        DescSpecialty : SpecialtyIDdoctor.data,
        ArrayDoctor : DoctorMap ? arr : [],
        ListProvince : dataProvince,
        DetailDoctorArr : DoctorMap
      })
    }

    


  }

  componentDidUpdate(prevProps,prevState) {
     
  } 

  handleChangeProvince = async(e) => {
     if(this.props.match && this.props.match.params && this.props.match.params.id)  {
      let province = e.target.value;
      let CustomData = await GetDoctorInfoWhereSpecialtyID(this.props.match.params.id,province);
      if(CustomData ) {
        let DoctorMap = CustomData.data;
        let arr =[];
        if(DoctorMap && !_.isEmpty(DoctorMap) ) {
          DoctorMap.map(item => {
            arr.push(item.doctorId);
          })
        }
        console.log(DoctorMap);
        this.setState({
          DetailDoctorArr : DoctorMap,
          ArrayDoctor : DoctorMap ? arr: []
        })
      }
     }
  }

  render() {
    let {DescSpecialty,ArrayDoctor,ListProvince,DetailDoctorArr} = this.state
    let html ='';
    if(DescSpecialty && DescSpecialty.markdownHTML) {
      html =`${DescSpecialty.markdownHTML}`;
    }
      return (
       <Fragment>
         <HomeHeader ishowBanner={false}/>
         <div className="desc container mb-4">  
            <div dangerouslySetInnerHTML={{__html: html}}></div>
         </div>
         <div className="background_image">
           <div className="container">
            <div className="wrapper_search">
                <select className="Clinic_search"
                onChange={(e) => this.handleChangeProvince(e)}
                >
                  {ListProvince && ListProvince.length > 0 &&
                  ListProvince.map((item,index) => {
                    return (
                          <option value={item.keyMap} key={index}>
                            {this.props.language === LANGUAGE.VI ? item.valueVi : item.valueEn}
                          </option>
                    )
                  })
                  }
                </select>          
             </div>
         {ArrayDoctor && ArrayDoctor.length > 0 && 
         ArrayDoctor.map((item,index) => {
          return (
            <div className="content_type mt-4" key={item}>
              <div className="Wrapper_Doctor_Info_Specialty d-flex justify-content-between">
                <div className="content-left">
                        <ProfileDoctor 
                        ValueDetailDoctor={item}  
                        isShowSocial={false}
                        />
                      <div className="see_more pl-2">
                          <Link to={`/doctor-detail/${item}`} >Xem thêm</Link>   
                      </div>

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
       </Fragment>
    )
    
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
       
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtysDoctorDetail);
