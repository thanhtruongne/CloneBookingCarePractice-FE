import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailDoctor.scss";
import { GetDetailDoctorDesc } from "../../../services/userServices";
import { LANGUAGE } from "../../../utils";
class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ProfileDescDoc : {}
    };
  }

  async componentDidMount() {
    if(this.props.ValueDetailDoctor) {
      let Value = await GetDetailDoctorDesc(this.props.ValueDetailDoctor);
      if(Value && Value.errCode === 0) {
        this.setState({
          ProfileDescDoc : Value.data
        })
    }
    }
  }

  render() { 
    let { ProfileDescDoc} = this.state;
    let nameVi= '', nameEn = '',markdown ='',description =''
    if(ProfileDescDoc && ProfileDescDoc.postisionData) {
        nameVi = `${ProfileDescDoc.postisionData.valueVi},${ProfileDescDoc.lastName} ${ProfileDescDoc.firstName}`
        nameEn = `${ProfileDescDoc.postisionData.valueEn},${ProfileDescDoc.firstName} ${ProfileDescDoc.lastName}`
    }
    if(ProfileDescDoc && ProfileDescDoc.Markdown) {
      markdown = `${ProfileDescDoc.Markdown.contentMarkdown}`;
      description = `${ProfileDescDoc.Markdown.description}`
    }
    
    return (
      <React.Fragment>
        {ProfileDescDoc &&
          <div className="content_detail-wrapper">
            <div className="wrapper_left d-flex">
                <div className="content_image_detail"
                style={{backgroundImage :`url(${ProfileDescDoc.image})`}}
                ></div>
                <div className="content_detail-title">
                <h2>{LANGUAGE.VI === this.props.language ? nameVi : nameEn}</h2>
                    <span className="content_detail-span">
                        {description}
                    </span>
                    {this.props.isShowSocial === true && 
                      <div className="wrapper_btn">
                          <button className="btn btn-primary">Thích</button>
                          <button className="btn btn-primary" style={{marginLeft:'12px'}}>Chia sẻ</button>
                      </div>           
                    }
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
