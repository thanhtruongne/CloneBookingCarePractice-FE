import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import * as actions from "../../../store/actions/index";
import "./Manage-Doctor.scss";
import { LANGUAGE, ACTION_CRUD } from "../../../utils/constant";
import Select from "react-select";
import MarkdownIt from "markdown-it";
import _ from "lodash";
import MdEditor from "react-markdown-editor-lite";
import {
  GetDetailDoctorDesc,
  GetDoctorSpecialtysAppointmentAll,
  GetAllClinics
} from '../../../services/userServices'
// import style manually
import "react-markdown-editor-lite/lib/index.css";
// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentHTML: '',
      contentMarkdown: '',
      description: '',
      selectedOption: '',
      GetAlldoctor: [],
      HasOldData : false,
      action :'', 
      payment :'',
      price :'',
      province :'',
      ListPrice :[],
      ListProvince :[],
      ListPayment :[],
      ListSpecialty :[],
      ListClinicDoctor : [],
      ClinicName : '',
      addressClinic :'',
      Clinic:'',
      Note :'',
      SpecialtyID : '',
    };
  }

  async componentDidMount() {
    await this.props.ListAlldoctor();
    await this.props.AllDataAppointments();
    let data = await GetAllClinics();
  }

  

  InspectDataAllDoctor = (inputData,type) => {
    let results = [];
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let { language } = this.props;
        let obj = {};
        if(type === 'USER') {
          obj.value = item.id;
          let nameEn = `${item.lastName} ${item.firstName}`;
          let nameVi = `${item.firstName} ${item.lastName}`;
          obj.label = language === LANGUAGE.VI ? nameVi : nameEn;
        }
        if(type === 'PRICE' || type === 'PROVINCE' || type === 'PAYMENT') {
          obj.label = language === LANGUAGE.VI ? item.valueVi : item.valueEn;
          obj.value = item.keyMap;
        }
        if(type === 'SPECIALTYS' || type ==='CLINIC') {
          obj.label = item.name
          obj.value = item.id;
        }

        results.push(obj);
      });
    }
    return results;
  };

 async componentDidUpdate(prevProps, prevState) {
    if (prevProps.AllDoctor !== this.props.AllDoctor) {
      let dataset = this.InspectDataAllDoctor(this.props.AllDoctor,'USER');
      this.setState({
        GetAlldoctor: dataset,
      });
    }
    if(prevProps.DataDoctorAppointments !== this.props.DataDoctorAppointments) {
      let data = this.props.DataDoctorAppointments;
      let Clinic = await GetAllClinics();
      let dataSpecialtys = await GetDoctorSpecialtysAppointmentAll('All');
      let valueProvince =  this.InspectDataAllDoctor(data.DataProvince,'PROVINCE');
      let valuePrice = this.InspectDataAllDoctor(data.DataPrice,'PRICE');
      let valuePayment = this.InspectDataAllDoctor(data.DataPayment,'PAYMENT');
      let specialtys = this.InspectDataAllDoctor(dataSpecialtys.data,'SPECIALTYS')
      let clinicDoc = this.InspectDataAllDoctor(Clinic.data,'CLINIC');
      this.setState({
        ListPayment : valuePayment,
        ListPrice : valuePrice,
        ListProvince :valueProvince,
        ListSpecialty : specialtys,
        ListClinicDoctor : clinicDoc
      })
    }
    if(prevProps.language !== this.props.language) {
      let dataset = this.InspectDataAllDoctor(this.props.AllDoctor,'USER');
      let data = this.props.DataDoctorAppointments;
      let valueProvince =  this.InspectDataAllDoctor(data.DataProvince,'PROVINCE');
      let valuePrice = this.InspectDataAllDoctor(data.DataPrice,'PRICE');
      let valuePayment = this.InspectDataAllDoctor(data.DataPayment,'PAYMENT');

      this.setState({
        GetAlldoctor: dataset,
        ListPayment : valuePayment,
        ListPrice : valuePrice,
        ListProvince :valueProvince,
         
      })
    }
  }

  handleOnchangeDesc = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  handleChange = async(selectedOption) => {
    this.setState({ selectedOption });
    let {ListPayment,ListProvince,ListPrice,ListSpecialty} = this.state;
    let response = await GetDetailDoctorDesc(selectedOption.value);
    console.log(response);
    if(response && response.errCode == 0 && response.data && response.data.Markdown 
      && response.data.Markdown.contentHTML !=null && response.data.Markdown.description !=null
      ) {
        let markdown = response.data.Markdown;
        let addressClinic = '',nameClinic = '',note = '',
        priceId = '',provinceId = '',paymentId = '',specialtyId='',
        clinic='',selectClinic='',
        selectPrice = '',selectProvice = '',selectPayment = '',selectSpecialty = '';
       if(response && response.data.doctor_info) {
        let DoctorInfo = response.data.doctor_info;
        addressClinic = DoctorInfo.addressClinic;
        nameClinic  = DoctorInfo.nameClinic;
        priceId = DoctorInfo.priceId;
        provinceId = DoctorInfo.provinceId;
        paymentId = DoctorInfo.paymentsId;
        specialtyId = DoctorInfo.specialtyId;
        //find item array choose

       selectSpecialty = ListSpecialty.find(item => {
         return item && item.value === +specialtyId;
       })

       selectPrice = ListPrice.find(item => {
        return item && item.value === priceId;
       })

       selectProvice = ListProvince.find(item => {
        return item && item.value === provinceId;
       })

       selectPayment = ListPayment.find(item => {
        return item && item.value === paymentId;
       })

      }
      this.setState({
        contentHTML :  markdown.contentHTML === null ? '' :  markdown.contentHTML,
        contentMarkdown :  markdown.contentMarkdown  === null ? '' : markdown.contentMarkdown,
        description : markdown.description  === null ? '' :  markdown.description,
        payment :selectPayment,
        price :selectPrice,
        province :selectProvice,
        SpecialtyID : selectSpecialty,
        addressClinic : addressClinic === null ? '':addressClinic ,
        ClinicName :nameClinic === null ? '' : nameClinic,
        HasOldData : true
      })
    }
        else {
          this.setState({
            contentHTML : '',
            contentMarkdown : '',
            description : '',          
            payment :'',
            price :'',
            province :'',
            addressClinic : '',
            ClinicName : '',
            SpecialtyID : '',
            HasOldData : false
          }) 
        }
      

  };
    //note addresClinic, Clinic
  handleDoctorInfoClinic = (e,name) => {
    let copyState = {...this.state};
     copyState[name] = e.target.value;

     this.setState({
      ...copyState
    })  
  }

  handleChangeSelectDoctor = (selectOptions,name) => {
    let StateName = name.name;
    let stateCopy =  {...this.state};
    stateCopy[StateName] = selectOptions
     
    this.setState({
      ...stateCopy
    })

  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
  };

  checkValidate = () => {
    const arrData = 
    [
      'description','price','payment','province','Clinic',
      'addressClinic','Note','SpecialtyID','contentHTML','contentMarkdown',
    ]
    let isValid = false,element = '';
    for(let i = 0 ;  i < arrData.length; i++) {
      if(!this.state[arrData[i]]) {
        isValid =true;
        element =`Missing parameter ${arrData[i]}`;
        break;
      }
    }
    return {
      isValid,element
    }
  }

  handleSaveContentMarkdown = async() => {
    let  {HasOldData} = this.state
    let Valid = this.checkValidate();
    if(Valid.isValid === true) {
      toast.warn(Valid.element);
      return ;
    }
    else {
     let ConstValue = await this.props.CreateDoctorDesc({
        contentHTML : this.state.contentHTML,
        contentMarkdown : this.state.contentMarkdown,
        description : this.state.description,
        doctorId : this.state.selectedOption.value,
        selectedOption : this.state.selectedOption,
        addressClinic : this.state.addressClinic,
        Clinic : this.state.ClinicName,
        Note : this.state.Note,
        price : this.state.price.value,
        province :this.state.province.value,
        payment :this.state.payment.value,
        note : this.state.Note,
        specialtyId  :this.state.SpecialtyID.value,
        clinicId : this.state.Clinic.value,
        action : HasOldData === true ? ACTION_CRUD.UPDATE : ACTION_CRUD.CREATE
      })  
      toast.success('Successfully created');
    }
  };

  render() {

    return (
      <Fragment>
        <div className="container mt-4" style={{ height: "120vh" }}>
          <h2 className="text-center text-info">Tạo infomations Bác sĩ</h2>
          <div className="Wrapper_title">
            <div className="content-left">
              <label className="title_left mb-2"><FormattedMessage id="menu.doctor.Choose_Doctor"/> </label>
              <Select
                value={this.state.selectedOption}
                onChange={this.handleChange}
                options={this.state.GetAlldoctor}
                placeholder ={<FormattedMessage id={"menu.doctor.Choose_Doctor"} />}
                name="Choose_Doctor"
              />
            </div>
            <div className="content-right">
              <label className="title_left mb-2"><FormattedMessage id="menu.doctor.Info_Doctor"/> </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                cols="50"
                onChange={(e) => this.handleOnchangeDesc(e)}
                value={this.state.description}
              >

              </textarea>
            </div>
          </div>

          <div className="mt-4 mb-4 row">
          <div class="mb-3 col-4">
            <label  class="form-label"><FormattedMessage id="menu.doctor.Choose_price"/></label>
            <Select
                value={this.state.price}
                onChange={this.handleChangeSelectDoctor}
                options={this.state.ListPrice}
                placeholder ={<FormattedMessage id={"menu.doctor.Choose_price"} />}
                name="price"
              />
          </div>
          <div class="mb-3 col-4">
            <label  class="form-label"><FormattedMessage id="menu.doctor.Payment_method"/></label>
            <Select
                value={this.state.payment}
                onChange={this.handleChangeSelectDoctor}
                options={this.state.ListPayment}
                placeholder ={<FormattedMessage id={"menu.doctor.Payment_method"} />}
                name="payment"
              />
          </div>    
          <div class="mb-3 col-4">
            <label  class="form-label"><FormattedMessage id="menu.doctor.Choose_Province"/></label>
            <Select
                value={this.state.province}
                onChange={this.handleChangeSelectDoctor}
                options={this.state.ListProvince}
                placeholder ={<FormattedMessage id={"menu.doctor.Choose_Province"} />}
                name="province"
              />
          </div>
          </div>

          <div className="mt-4 mb-4 row">
          <div class="mb-3 col-4">
            <label  class="form-label"><FormattedMessage id="menu.doctor.Clinic_name"/></label>
            <input type="text" class="form-control"
            onChange={(e) =>this.handleDoctorInfoClinic(e,'ClinicName')}
            value={this.state.ClinicName}
            />
      
          </div>
          <div class="mb-3 col-4">
            <label  class="form-label"><FormattedMessage id="menu.doctor.Address_Clinic"/></label>
            <input type="text" class="form-control" 
             onChange={(e) =>this.handleDoctorInfoClinic(e,'addressClinic')}
             value={this.state.addressClinic}
            />
          </div>
          <div class="mb-3 col-4">
            <label  class="form-label"><FormattedMessage id="menu.doctor.Note"/></label>
            <input type="text" class="form-control" 
             onChange={(e) =>this.handleDoctorInfoClinic(e,'Note')}
             value={this.state.Note}
            />
          </div>
          <div class="mb-3 col-4">
            <label  class="form-label"><FormattedMessage id="menu.doctor.Specialty_Doctor"/></label>
            <Select
                value={this.state.SpecialtyID}
                onChange={this.handleChangeSelectDoctor}
                options={this.state.ListSpecialty}
                placeholder ={<FormattedMessage id={"menu.doctor.Specialty_Doctor"} />}
                name="SpecialtyID"
              />
          </div>
          <div class="mb-3 col-4">
            <label  class="form-label">Bệnh Viện Khám</label>
            <Select
                value={this.state.Clinic}
                onChange={this.handleChangeSelectDoctor}
                options={this.state.ListClinicDoctor}
                placeholder ="Bệnh Viện Khám"
                name="Clinic"
              />
          </div>
          </div>

          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
           
          />
          <div className="Proccess_Log">
            <button
              className= {this.state.HasOldData === true ? "btn btn-warning mt-3" :"btn btn-primary mt-3"}  
              onClick={() => this.handleSaveContentMarkdown()}
            >
              {this.state.HasOldData === true ? ' Save Change' : 'Create New'}
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
    AllDoctor: state.admin.ListAllDoctor,
    DataDoctorAppointments : state.admin.DataDoctorAppointments
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ListAlldoctor: () => dispatch(actions.fetchAllDoctor()),
    CreateDoctorDesc : (data) => dispatch(actions.fetchCreateDoctorDesc(data)),
    AllDataAppointments : () => dispatch(actions.fetchDoctorInfoAppointment())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
