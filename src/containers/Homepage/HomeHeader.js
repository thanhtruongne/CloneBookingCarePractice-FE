import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCircleQuestion, faSearch } from '@fortawesome/free-solid-svg-icons'
import './HomeHeader.scss'
//sử dụng FormarttedMessage của react-until
import { FormattedMessage } from 'react-intl'
import { changelanguageAction } from '../../store/actions/appActions';
import { LANGUAGE } from '../../utils/constant'
class HomeHeader extends Component {
    constructor(props) {
        super(props);
        
    }
    changeActionLanguage = (language) => {
        this.props.ChangeTypeLanguage(language)
    }


    render() {
        return (
            <React.Fragment>
                {/* Header */}
                <div className='Home_header_container'>
                    <div className='Home_header-wrapper'>
                        <div className='Home_header-content'>

                            <div className='Home-container-left'>
                                <FontAwesomeIcon icon={faBars} className='Icon_bars-home' />
                                <div className='Home_icon-logo'></div>
                            </div>

                            <div className='Home-container-center'>
                                <ul className='Home-container-list'>
                                    <li className='Home_container-item'>
                                        <a href=''>
                                            <FormattedMessage id="homeheader.specialtily" />
                                            <span><FormattedMessage id="homeheader.searchingdoctor" /></span>
                                        </a>
                                    </li>
                                    <li className='Home_container-item ml-25'>
                                        <a href=''>
                                            <FormattedMessage id="homeheader.healthfacilities" />
                                            <span><FormattedMessage id="homeheader.Choosehospitalclinic" /></span>
                                        </a>
                                    </li>
                                    <li className='Home_container-item'>
                                        <a href=''>
                                            <FormattedMessage id="homeheader.Doctor" />
                                            <span>  <FormattedMessage id="homeheader.ChooseAgooddoctor" /></span>
                                        </a>
                                    </li>
                                    <li className='Home_container-item'>
                                        <a href=''>
                                            <FormattedMessage id="homeheader.Checkuppackage" />
                                            <span><FormattedMessage id="homeheader.Generalhealthcheck" /></span>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className='Home-container-right'>
                                <div className='Home-Wrapper-support'>
                                    <a className='Home_container-support' href=''>
                                        <FormattedMessage id="homeheader.Support" />
                                    </a>
                                        <div className={this.props.language === LANGUAGE.VI ? "Language_VI active" :"Language_VI" }>
                                            <span onClick={() => this.changeActionLanguage(LANGUAGE.VI)}>
                                                VN
                                            </span>
                                        </div>

                                        |

                                        <div className={this.props.language === LANGUAGE.EN ? "Language_EN active" :"Language_EN" }>
                                            <span onClick={() => this.changeActionLanguage(LANGUAGE.EN)}>
                                                EN
                                            </span>
                                        </div>                                                                       
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Banner */}
                {this.props.ishowBanner === true && <div className='Banner_header'>
                    <div className='Header_content-banner'>
                        <div className='Banner_searching'>
                            <div className='Searching_wrapper'>
                                <h1 className='Searching_banner-title'>
                                    <FormattedMessage id="banner.Medicalbackground" />
                                    <br />
                                    <b><FormattedMessage id="banner.Comprehensivehealthcare" /></b>
                                </h1>
                                <div className='Banner-Looking'>
                                    <div className='Input_Changes'>
                                        <div className='Div_icon'>
                                            <FontAwesomeIcon icon={faSearch} className='Searching_icon' />
                                        </div>
                                        <input type='text'
                                            placeholder="Tìm kiếm tổng quát"
                                            id='Searching_chung'
                                        />
                                    </div>
                                    {/* <div className='Searching_for-list'>
                                        <h3>Chuyên Khoa</h3>
                                        <ul className='List'>
                                            <li className='List_item-searching'><a href=''>Tổng quát</a></li>
                                            <li className='List_item-searching'><a href=''>Tại nhà  </a></li>
                                            <li className='List_item-searching'><a href=''>Ung bướu</a></li>
                                            <li className='List_item-searching'><a href=''>Cúm</a></li>
                                            <li className='List_item-searching'><a href=''>Sốt và dị ứng</a></li>
                                            <li className='List_item-searching'><a href=''>Gan</a></li>
                                            <li className='List_item-searching'><a href=''>Thận</a></li>
                                        </ul>
                                    </div> */}
                                </div>
                                <div className='App_link-Android_IOS'>
                                    <a href=''>
                                        <img
                                            width="180"
                                            height="32"
                                            src='https://bookingcare.vn/assets/icon/google-play-badge.svg' />
                                    </a>
                                    <a href=''>
                                        <img
                                            width="180"
                                            height="32"
                                            src='https://bookingcare.vn/assets/icon/app-store-badge-black.svg' />
                                    </a>
                                </div>

                            </div>
                        </div>
                        <div className='Banner_Choose_Option'>
                            <ul className='Option_list'>
                                <li className='Option_Item'>
                                    <a href=''>
                                        <div className='Icon_image-sub'
                                            style={{ backgroundImage: "url('https://cdn.bookingcare.vn/fo/2023/06/07/161905-iconkham-chuyen-khoa.png')" }}
                                        ></div>
                                        <FormattedMessage id="banner.Specializedexamination" />
                                    </a>
                                </li>
                                <li className='Option_Item'>
                                    <a href=''>
                                        <div className='Icon_image-sub'
                                            style={{ backgroundImage: "url('https://cdn.bookingcare.vn/fo/2023/06/07/161817-iconkham-tu-xa.png')" }}
                                        ></div>
                                        <FormattedMessage id="banner.Remoteexamination" />
                                    </a>
                                </li>
                                <li className='Option_Item'>
                                    <a href=''>
                                        <div className='Icon_image-sub'
                                            style={{ backgroundImage: "url('https://cdn.bookingcare.vn/fo/2023/06/07/161350-iconkham-tong-quan.png')" }}
                                        ></div>
                                        <FormattedMessage id="banner.Generalexamination" />
                                    </a>
                                </li>
                                <li className='Option_Item'>
                                    <a href=''>
                                        <div className='Icon_image-sub'
                                            style={{ backgroundImage: "url('https://cdn.bookingcare.vn/fo/2023/06/07/161340-iconxet-nghiem-y-hoc.png')" }}
                                        ></div>
                                        <FormattedMessage id="banner.Medicaltest" />
                                    </a>
                                </li>
                                <li className='Option_Item'>
                                    <a href=''>
                                        <div className='Icon_image-sub'
                                            style={{ backgroundImage: "url('https://cdn.bookingcare.vn/fo/2023/06/07/161403-iconsuc-khoe-tinh-than.png')" }}
                                        ></div>
                                        <FormattedMessage id="banner.Mentalhealth" />
                                    </a>
                                </li>
                                <li className='Option_Item'>
                                    <a href=''>
                                        <div className='Icon_image-sub'
                                            style={{ backgroundImage: "url('https://cdn.bookingcare.vn/fo/2023/06/07/161410-iconkham-nha-khoa.png')" }}
                                        ></div>
                                        <FormattedMessage id="banner.DentalExamination" />
                                    </a>
                                </li>
                                <li className='Option_Item'>
                                    <a href=''>
                                        <div className='Icon_image-sub'
                                            style={{ backgroundImage: "url('https://cdn.bookingcare.vn/fo/2023/06/07/161421-icongoi-phau-thuat.png')" }}
                                        ></div>
                                        <FormattedMessage id="banner.SurgeryPackage" />
                                    </a>
                                </li>
                                <li className='Option_Item'>
                                    <a href=''>
                                        <div className='Icon_image-sub'
                                            style={{ backgroundImage: "url('https://cdn.bookingcare.vn/fo/2023/06/07/161542-iconsan-pham-y-te.png')" }}
                                        ></div>
                                        <FormattedMessage id="banner.MedicalProducts" />
                                    </a>
                                </li>
                                <li className='Option_Item'>
                                    <a href=''>
                                        <div className='Icon_image-sub'
                                            style={{ backgroundImage: "url('https://cdn.bookingcare.vn/fo/2023/06/07/161442-iconbai-test-suc-khoe2.png')" }}
                                        ></div>
                                        <FormattedMessage id="banner.HealthTest" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>}
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};
// sử dụng dispatch trong hàm này để sử dụng redux
const mapDispatchToProps = dispatch => {
    return {
        ChangeTypeLanguage: (language) => dispatch(changelanguageAction(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
