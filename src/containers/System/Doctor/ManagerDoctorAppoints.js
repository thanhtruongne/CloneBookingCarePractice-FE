import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { FormattedMessage} from "react-intl"
import Header from "../../Header/Header";
import {CommonUtils} from "../../../utils";
import { LANGUAGE } from "../../../utils";
import "./ManagerDoctorAppoints.scss";
import { toast, ToastContainer } from "react-toastify";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { SaveDoctorSpecialtysAppointment } from "../../../services/userServices";
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManagerDoctorAppoints extends Component {
  constructor(props) {
    super(props);
    this.state = {
     markdownHTML :'',
     markdownContent : '',
     NameSpecialty : '',
     imageBase64 : "",
    };
  }

  async componentDidMount() {

  }

  async componentDidUpdate(prevProps, prevState) {

  }

  handleEditorChange =({ html, text }) => {
    this.setState({
      markdownHTML : html,
      markdownContent : text
    })
  }

  hanldegetValueOnchange = (event,state) => {
    let copyState = {...this.state};
    copyState[state] = event.target.value;
    this.setState({
      ...copyState
    })
  }
  
  handleImageFile = async(event) => {
    let image = event.target.files;
    if(image) {
      let filesImage = await CommonUtils.getBase64(image[0]);
      this.setState({
        imageBase64 : filesImage,
      })
    }
  }

  handleSaveDoctorAppointment= async() => {
   let valueChoose = await SaveDoctorSpecialtysAppointment({
    name : this.state.NameSpecialty,
    image : this.state.imageBase64,
    markdownHTML : this.state.markdownHTML,
    markdownContent : this.state.markdownContent,
   })
   if(valueChoose && valueChoose.errCode === 0) {
    toast.success(valueChoose.message);
    this.setState({
      markdownHTML :'',
      markdownContent : '',
      NameSpecialty : '',
      imageBase64 : ''
    })
   }
   else {
    toast.error(valueChoose.message);
   }
  }

  render() {
    return (
        <Fragment>
           <div className="container mt-4">
            <h2 className="text-center text-info">Tạo Chuyên Khoa Bác sĩ</h2>
                <div className="d-flex gap-3">
                  <div className="content-right">
                    <div class="mb-3 col-10">
                      <label  class="form-label">Chuyên Khoa</label>
                      <input type="text" class="form-control"
                      onChange={(event) => this.hanldegetValueOnchange(event,'NameSpecialty')}
                      value={this.state.NameSpecialty}
                     />
                    </div>
                  </div>
                  <div className="content-left">
                    <div class="mb-3 col-5">
                      <label  class="form-label">Hình Ảnh</label>
                      <input type="file" class="form-control-file"
                      name="imageBase64"
                      onChange={(event) => this.handleImageFile(event)}
                      />
                    </div>
                  </div>
                </div>
                <MdEditor 
                  style={{ height: '500px' }} 
                  renderHTML={text => mdParser.render(text)} 
                  onChange={this.handleEditorChange} 
                  value={this.state.markdownContent}
                />
               <div className="Proccess_Log">
                  <button className="btn btn-primary mt-3"
                  onClick={() => this.handleSaveDoctorAppointment()}
                  >
                    Save Changes
                  </button>
                </div>
           
           </div>
           <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
               />
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
  return {};
};

export default connect( mapStateToProps,mapDispatchToProps)(ManagerDoctorAppoints);
