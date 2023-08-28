import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import './RemedyPatient.scss'
import { CommonUtils } from '../../../utils';
class RemedyPatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
           email : '',
           imageBase64 : '',
           dataParent : {}
        }
      

    }
  
    

   async componentDidMount() {
 
        if(this.props.dataModal) {
            this.setState({
                email : this.props.dataModal.email,
                dataParent : this.props.dataModal
            })
        }
    }

    componentDidUpdate(prevProps,prevState) {
      if(prevProps.dataModal != this.props.dataModal)  {
        this.setState({
            email : this.props.dataModal.email,
            dataParent : this.props.dataModal
        })
      }
    }

    toggle = () => {
        this.props.isOpenModal();
    }

    handleOnChangeEmail =(e) => {
        this.setState({
            email : e.target.value
        })
    }

    handleOnChangeImage =async(e) => {
        let files = e.target.files
        if(files[0]) {
            let Image64= await CommonUtils.getBase64(files[0]);
            this.setState({
                imageBase64 : Image64
            })
        }
    }

    SendRemedy =() => {
      this.props.SendRemedy(this.state);
    }

    render() {
    
        return (
            <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }} size='lg' centered
                className='Modal_container'
            >
                <ModalHeader toggle={() => { this.toggle() }}>Gửi Phương Thuốc Cho Bệnh Nhân </ModalHeader>
                <ModalBody>
                    <div className='mt-4'>
                        <div className='container'>
                            <div className='row'>
                                <div class="form-row">
                                    <div class="col-md-5 form-group">
                                        <label class="form-label">Email</label>
                                        <input type="email"
                                            class="form-control" name="email" required
                                            onChange={(e) => this.handleOnChangeEmail(e)}
                                            value={this.state.email}        
                                        />
                                    </div>
                                    <div class="col-md-5">
                                        <label class="form-label">File đơn thuốc</label>
                                        <input                                      
                                         type="file" class="form-control" name="file" required
                                         onChange={(e) => this.handleOnChangeImage(e)}   
                                        />
                                    </div>
                                </div>                               
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button    
                        color="primary" className='px-3'
                        onClick={() => this.SendRemedy(this.state)}
                        >
                      Send
                    </Button>
                    <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>

        )
    }

}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyPatient);
