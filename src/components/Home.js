import React from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import { Row, Col } from 'antd';
import { Table } from 'antd';

class Home extends React.Component {
  state = {
    response:''
  }
  // componentDidMount(){
  //   this.callApi()
  //   .then(res => this.setState({ response: res.express }))
  //   .catch(err => console.log(err));
  // }
  // callApi = async () => {
  //   const response = await fetch('/api/hello');
  //   const body = await response.json();

  //   if (response.status !== 200) throw Error(body.message);

  //   return body;
  // };
  

  render() {
    const dataSource = [{
      key: '1',
      name: '杨铁锤',
      age: 362528199003010537,
      address: '18026938187',
      result:'已报名'
    }];
    
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '身份证号码',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: '电话',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '成绩结果',
      dataIndex: 'result',
      key: 'result',
    }];
    const commonStyle = {
      marginTop:60
    }
    return (
      <div className="Home"> 
      <Row >
        <Col span={10} offset={7} style={{marginTop:'100'}}>
        <h1 style={commonStyle}>欢迎使用滴滴网约车考试成绩查询系统</h1>
        <SearchBar />
        <div style={commonStyle}>
          <h3>查询结果：</h3>
          <Table dataSource={dataSource}  pagination={false} columns={columns} />
        </div>
        
        <h3  style={commonStyle}>扫描以下二维码或者更多司机福利</h3>
        <img alt="example" style={{ width: '50%' }} src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' />
        </Col>
      </Row>
        
        
      
      </div>
    );
  }
}

export default Home;
