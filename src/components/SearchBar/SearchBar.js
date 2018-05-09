import React from 'react';
import { Input,message } from 'antd';
import { Row, Col } from 'antd';
import { searchDriver } from '../../redux/actions/driver';

import { connect } from 'react-redux';

const Search = Input.Search;

class SearchBar extends React.Component {
  search(value){
    let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;    
    if(reg.test(value)){
      this.props.dispatch(searchDriver(value))
    }else{
      message.warning('手机号码格式错误，请输入正确的手机号', 10);
    } 
  }

  
  render() {
    return (
      <div className="Home">
      <Row>
        <Col >
          <Search placeholder="请输入手机号查询" 
          enterButton="Search" size="large"  
          onSearch={value => this.search(value)} />
        </Col>
      </Row>
        
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
      DriverList:state.DriverList.drivers,
      driver:state.DriverList.driver,
      loading:state.DriverList.loading,
   };
}

export default connect(mapStateToProps)(SearchBar);