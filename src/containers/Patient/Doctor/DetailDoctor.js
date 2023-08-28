import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../Homepage/HomeHeader";
import "./DetailDoctor.scss";
import { GetDetailDoctorDesc } from "../../../services/userServices";
import { LANGUAGE } from "../../../utils";
import DoctorDatePick from "./DoctorDatePick";
import DoctorExtraInfo from "./DoctorExtraInfo";
import _ from 'lodash'
import ProfileDoctor from "./ProfileDoctor";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ProfileDoctorDesc: {},

    };
  }

  async componentDidMount() {
    if(this.props.match && this.props.match.params && this.props.match.params.id) {
      let DoctorId = this.props.match.params.id;
      let respones = await GetDetailDoctorDesc(DoctorId);
      if (respones && respones.errCode === 0) {
        this.setState({
            ProfileDoctorDesc : respones.data,
        })
      }
    }
  }

  render() { 
    let { ProfileDoctorDesc} = this.state;
    let id = ProfileDoctorDesc.id;
    let html ='';
    if(ProfileDoctorDesc && ProfileDoctorDesc.Markdown) {
      html = `${ProfileDoctorDesc.Markdown.contentHTML}`;
    }
    return (
      <React.Fragment>
        <HomeHeader ishowBanner={false} />
        {!_.isEmpty(ProfileDoctorDesc)  &&  
          <div className="container">
           <ProfileDoctor 
              ValueDetailDoctor={id}
              isShowSocial={true}
            />
            <div className="Wrapper_infomation">
              <div className="date_picker">            
                <DoctorDatePick  IdParamsDoctor ={id}/>               
              </div>

              <div className="Clinic_info">            
                  <DoctorExtraInfo DoctorInfoId ={id} /> 
              </div>
            </div>   
            <div className="description_detail-doctor mt-4">
                  <div dangerouslySetInnerHTML={{__html: html}}></div>
            </div>  
          </div>
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
