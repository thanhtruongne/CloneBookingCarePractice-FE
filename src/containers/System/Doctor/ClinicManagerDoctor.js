import React, { Component,Fragment } from "react";
import { connect } from "react-redux";
import {CommonUtils} from "../../../utils";
import { LANGUAGE } from "../../../utils";
import {PostClinicsNameManager} from '../../../services/userServices'
import "./ClinicManagerDoctor.scss";
import { toast,ToastContainer } from "react-toastify";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ClinicManagerDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
     ClinicName : '',
     markdownContent : '',
     markdownHTML : '',
     imageBase64 : '',
     address : ''
    };
  }

  async componentDidMount() {
   

  }


  async componentDidUpdate(prevProps, prevState) {
  
  }

  handleEditorChange =({ html, text }) => { 
    this.setState({
        markdownContent : text,
        markdownHTML : html
    })
  }

  handleOnchangeValue =(e,name) => {
   let copyState = {...this.state};
   copyState[name] = e.target.value;
   this.setState({
    ...copyState
   })
  }

  handleOnchangeImage =async(e) => {
    let files = e.target.files;
    if(files) {
        let dataImage = await CommonUtils.getBase64(files[0]);
        this.setState({
         imageBase64 : dataImage
        })
    }
  }

  handleSaveClinicsManager =async() => {
    let response = await PostClinicsNameManager({
        ClinicName : this.state.ClinicName,
        address : this.state.address,
        imagebase64 : this.state.imageBase64,
        markdownContent : this.state.markdownContent,
        markdownHTML : this.state.markdownHTML
    })
    if(response && response.errCode === 0) {
        toast.success(response.message)
    }
    else {
        toast.error(response.message)
    }
  }

  render() {
    console.log(this.state);
   
    return (
        <Fragment>
        <div className="container mt-4">
         <h2 className="text-center text-info">Tạo Phòng Khám Bác Sĩ</h2>
             <div className="d-flex gap-3">
               <div className="content-right">
                 <div class="mb-3 col-10">
                   <label  class="form-label">Phòng Khám</label>
                   <input type="text" class="form-control" name="ClinicName"
                   onChange={(e) => this.handleOnchangeValue(e,'ClinicName')}
                   value={this.state.ClinicName}
                 />
                 </div>
                 <div class="mb-3 col-10">
                   <label  class="form-label">Địa chỉ</label>
                   <input type="text" class="form-control" name="address"
                   onChange={(e) => this.handleOnchangeValue(e,'address')}
                   value={this.state.address}
                 />
                 </div>
               </div>
               <div className="content-left">
                 <div class="mb-3 col-5">
                   <label  class="form-label">Hình Ảnh</label>
                   <input type="file" class="form-control-file"
                   name="imageBase64"
                   onChange={(e) => this.handleOnchangeImage(e)}
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
               onClick={() => this.handleSaveClinicsManager()}
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
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(ClinicManagerDoctor);
