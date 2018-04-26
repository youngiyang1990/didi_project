import React from 'react'
import {
  Table,Divider,Icon,Select
} from 'antd'
const Option = Select.Option;
export default class CommonTable extends React.Component {
  constructor(props) {
    super(props)
  }

  handleChange(value,id) {
    console.log(id)
    console.log(value)
  }
  componentWillMount(){
    let self = this
    console.log("11")
    console.log(self.props.drivers)
  }
  
  render() {
    const dataSource = [{
      key: '1',
      id:'1',
      name: '徐诗清',
      sex: '男',
      phone: 18820965455,
      idNumber:362528199003010537,
      idAddress:"测试地址地址",
      stayAdress:'',
      licenseType:'C1',
      licenseDate:'2018-9-10',
      status:'已报名'
    }, {
      key: '2',
      id:'2',
      name: '徐诗清',
      sex: '男',
      phone: 18820965455,
      idNumber:362528199003010537,
      idAddress:"测试地址地址",
      stayAdress:'',
      licenseType:'C1',
      licenseDate:'2018-9-10',
      status:'已报名'
    }];
    
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
    }, {
      title: '手机号码',
      dataIndex: 'phone',
      key: 'phone',
    }, {
      title: '身份证号码',
      dataIndex: 'idNumber',
      key: 'idNumber',
    }, 
    // {
    //   title: '身份证住址',
    //   dataIndex: 'idAddress',
    //   key: 'idAddress',
    // }, {
    //   title: '居住证住址',
    //   dataIndex: 'stayAdress',
    //   key: 'stayAdress',
    // }, 
    {
      title: '驾驶证类型',
      dataIndex: 'licenseType',
      key: 'licenseType',
    }, {
      title: '领证日期',
      dataIndex: 'licenseDate',
      key: 'licenseDate',
    },{
      title: '考试状态',
      dataIndex: 'status',
      key: 'status',
      render: (text,record)=>(  
        <div>
          <Select defaultValue={record.status} style={{ width: 100 }} onChange={this.handleChange}>
            <Option value="待考试">已报名</Option>
            <Option value="成绩未出">成绩未出</Option>
            <Option value="考试未通过">考试未通过</Option>
            <Option value="考试通过">考试通过</Option>
          </Select>
        </div>
      ),
    },{
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;"><Icon type="edit" /></a>
          <Divider type="vertical" />
          <a href="javascript:;"><Icon type="delete" /></a>
          <Divider type="vertical" />
        </span>
      ),
    }];
    
    
    return (
      <div className="myy-table">
          <Table dataSource={dataSource} columns={columns} />
      </div>
    )
  }
}
