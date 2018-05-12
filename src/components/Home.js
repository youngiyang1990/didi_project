import React from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import { Row, Col,Card } from 'antd';
import { Table } from 'antd';
import { connect } from 'react-redux';
import Auth from '../utils/auth'


class Home extends React.Component {
  state = {
    response:''
  }


  render() {

    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '身份证号码',
      dataIndex: 'idNumber',
      key: 'idNumber',
    }, {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    }, {
      title: '成绩结果',
      dataIndex: 'status',
      key: 'status',
    }];
    const commonStyle = {
      marginTop:60
    }
    const {drivers} = this.props.drivers
    console.log(Auth.isLogin)
    return (
      
     
      <div className="Home"> 
      <Row >
        <Col span={10} offset={7} style={{marginTop:'100'}}>
        <h1 style={commonStyle}>欢迎使用滴滴网约车考试成绩查询系统</h1>
        <SearchBar />
        <div style={commonStyle}>
          <h3>查询结果：</h3>
          <Table dataSource={drivers}   rowKey="_id" pagination={false} columns={columns} />
        </div>
        
        <h3  style={commonStyle}>扫描以下二维码或者更多司机福利</h3>
        <img alt="example" style={{ width: '50%' }} src={require('./images/wanrenchehui.jpeg')} />
        </Col>
      </Row>
        
        
      
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
      drivers:state.DriverList.drivers,
      driver:state.DriverList.driver,
      loading:state.DriverList.loading,
   };
}

export default connect(mapStateToProps)(Home);