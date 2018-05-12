import React,{Component} from 'react'
import reactDom from 'react-dom'
import FormModal from '../modalForm/modal'
import { Button, message, Modal, Divider,Table,Icon,Select,Tooltip,Spin,Row,Col } from 'antd'
import moment from 'moment'
import {getDriverList,getDriverItem, updateDriver,deleteDriver,changeDriverStatus, getTotal, addDriver} from '../../redux/actions/driver'
import {allSex, AllLicenseType} from '../../utils/config'
import { connect } from 'react-redux';
import SearchBar from '../SearchBar/SearchBar';
const Option = Select.Option;
const confirm = Modal.confirm
class Driver extends Component {
  constructor(props) {
    super(props)
    this.state = {
        tData: [],
        item: {},
        loading: true,
        modalShow: false,
        modalShowEdit: false,
        drivers:[],
        currentPage:1,
        totalCount:10,
        condition: {},
    }
}

  handlePageChange(page, pageSize){
    console.log(page)
    console.log(pageSize)
    const { dispatch } = this.props
    dispatch(getDriverList(page,pageSize))
  }

  add = () => {
    this.setState({
        modalShow: true
    })
  }

  onOk = (params) => {
    const { dispatch,message } = this.props
    dispatch(addDriver(params))
    this.onCancel()
    if(message === "相同手机号已经存在,新增失败"){
      message.error(message)
    }else{
      message.success('增加司机成功')
    }
    dispatch(getDriverList())
  }

  onCancel = () => {
    this.setState({
        modalShow: false
    })
  }
  onOkEdit = (params) => {
    const {driver,dispatch} = this.props
    dispatch(updateDriver(driver,params))
    this.setState({
        modalShowEdit: false
    })
    message.success('编辑成功')
  }
  onCancelEdit = () => {
    this.setState({
        modalShowEdit: false
    })
  }


  getValue(){
    const {driver} = this.props
   let data = driver.licenseType
    let arr = []
    for (var i in data) {
        arr.push(data[i]); 
    }
    return arr
  }


    

  fields = () => {
  const phoneReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;    
  const idReg = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2]\d)|(3[0-1]))((\d{4})|(\d{3}[Xx]))$/;



    return [{
          label: '姓名',
          type: 'input',
          name: 'name',
          options: {
              rules: [{
                  required: true,
                  message: '姓名必填!',
              }]
          }
      },
      {
        label: '性别',
        type: 'select',
        name: 'sex',
        defaultValue: '保密',
        items: () => allSex.map(ele => ({
          value: ele.value
      })),
        options: {
            rules: [{
                required: true,
                message: '性别必填!',
            }]
        }
    },{
      label: '本人手机号',
      type: 'input',
      name: 'phone',
      options: {
          rules: [{
              pattern:phoneReg,
              required: true,
              message: '请输入正确的手机号!',
          }]
      }
    },{
      label: '身份证号码',
      type: 'input',
      name: 'idNumber',
      options: {
          rules: [{
              pattern:idReg,
              required: true,
              message: '请输入正确的身份证号码!',
          }]
      }
    },{
      label: '身份证住址',
      type: 'input',
      name: 'idAddress',
      options: {
          rules: [{
              required: false,
          }]
      }
    },{
      label: '居住证号',
      type: 'input',
      name: 'stayAdressId',
      options: {
          rules: [{
              required: false,
          }]
      }
    },{
      label: '居住证住址',
      type: 'input',
      name: 'stayAdress',
      options: {
          rules: [{
              required: false,
          }]
      }
    },{
      label: '驾驶证类型',
      type: 'select',
      mode:"tags",
      name: 'licenseType',
      items: () => AllLicenseType.map(ele => ({
        value: ele.value
    })),
      options: {
          rules: [{
              required: true,
              message: '驾驶证必填!',
              
          }]
      }
    },{
      label: '初领证时间',
      type: 'datetime',
      name: 'licenseDate',
      options: {
          rules: [{
              required: true,
              message: '时间必填!',
          }]
      }
    }]
  }

  fieldsEdit = () => {
    const {driver} = this.props
  const phoneReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;    
  const idReg = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2]\d)|(3[0-1]))((\d{4})|(\d{3}[Xx]))$/;
    return [{
          label: '姓名',
          type: 'input',
          name: 'name',
          options: {
            initialValue:driver.name,
            rules: [{
                required: true,
                message: '姓名必填!',
            }]
          }
      },
      {
        label: '性别',
        type: 'select',
        name: 'sex',
        defaultValue: '保密',
        items: () => allSex.map(ele => ({
          value: ele.value
      })),
        options: {
            initialValue:driver.sex,
            rules: [{
                required: true,
                message: '性别必填!',
            }]
        }
    },{
      label: '本人手机号',
      type: 'input',
      name: 'phone',
      options: {
          initialValue:driver.phone,
          rules: [{
              pattern:phoneReg,
              required: true,
              message: '请填入正确的手机号!',
          }]
      }
    },{
      label: '身份证号码',
      type: 'input',
      name: 'idNumber',
      options: {
        initialValue:driver.idNumber,
          rules: [{
              pattern:idReg,
              required: true,
              message: '请填写正确的身份证号码!',
          }]
      }
    },{
      label: '身份证住址',
      type: 'input',
      name: 'idAddress',
      options: {
        initialValue:driver.idAddress,
          rules: [{
              required: false,
          }]
      }
    },{
      label: '居住证号',
      type: 'input',
      name: 'stayAdressId',
      options: {
        initialValue:driver.stayAdressId,
          rules: [{
              required: false,
          }]
      }
    },{
      label: '居住证住址',
      type: 'input',
      name: 'stayAdress',
      options: {
        initialValue:driver.stayAdress,
          rules: [{
              required: false,
          }]
      }
    },{
      label: '驾驶证类型',
      type: 'select',
      mode:"tags",
      name: 'licenseType',
      items: () => AllLicenseType.map(ele => ({
        value: ele.value
    })),
      options: {
        initialValue:this.getValue(),
          rules: [{
              required: true,
              message: '驾驶证必填!',
              
          }]
      }
    },{
      label: '初领证时间',
      type: 'datetime',
      name: 'licenseDate',
      options: {
        initialValue:moment(driver.licenseDate),
          rules: [{
              required: true,
              message: '时间必填!',
          }]
      }
    }]
  }
  onClickUpdate(id){
    this.props.dispatch(getDriverItem(id))
    this.setState({
      modalShowEdit: true
  })
  }
  onClickDelete(id){
    let self = this
    confirm({
      title: '确定删除该司机的所有资料吗？?',
      content: '请谨慎操作',
      onOk() {
        self.props.dispatch(deleteDriver(id))
        message.success('删除成功')
      },
      onCancel() {
      },
    });
  }
  changeStatus(id,value){
    let self = this
    confirm({
      title: '确定更改该司机的所有成绩状态吗？?',
      content: '请谨慎操作',
      onOk() {
        console.log(value)
        self.props.dispatch(changeDriverStatus(id,value))
        message.success('更新成绩成功')
      },
      onCancel() {
      },
    });
  }

  componentDidMount(){
    const {total} = this.props
    this.props.dispatch(getTotal())
    this.props.dispatch(getDriverList())
    
  }


  
 render(){
  const actionStyle = {
    fontSize: 16, color: '#08c'
  };
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
    render:(text,record)=>(
      <div>
          <span>{moment(record.licenseDate).format('YYYY-MM-DD').toString()}</span>
      </div>
    )
  },{
    title: '考试状态',
    dataIndex: 'status',
    key: 'status',
    render: (text,record)=>(  
      <div>
        <Select defaultValue={record.status} style={{ width: 100 }} onChange={ (value) => this.changeStatus(record._id,value)} >
          <Option value="审查中">审查中</Option>
          <Option value="审查通过">审查通过</Option>
          <Option value="审查未通过">审查未通过</Option>
          <Option value="未缴费">未缴费</Option>
          <Option value="已缴费">已缴费</Option>
          <Option value="考试未通过">考试未通过</Option>
          <Option value="考试通过">考试通过</Option>
          <Option value="已拿证">已拿证</Option>
        </Select>
      </div>
    ),
  },{
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
          <span>
            <Tooltip placement="topLeft" title="编辑" arrowPointAtCenter>
              <Button shape="circle" onClick={ () => this.onClickUpdate(record._id)}  icon="edit"  style={actionStyle} />
            </Tooltip>
            <span className="ant-divider" />
            <Tooltip placement="topLeft" title="删除" arrowPointAtCenter>
              <Button shape="circle" onClick={ () => this.onClickDelete(record._id)} icon="delete" style={actionStyle} />
            </Tooltip>
          </span>
      </span>
    ),
  }];

  const { driver,drivers,loading } = this.props
  const buttoStyle = {
    marginLeft:10,
    marginRight:10,
    marginTop:30,
    marginBottom:30
  }
  const SearchBarStyle={
    marginLeft:10,
    marginRight:55,
    marginTop:37
  }
   return (
     
     <div>
       <div>
         <div style={SearchBarStyle}>
          <SearchBar  />
        </div>
        <Button style={buttoStyle} onClick={this.add}  type="primary" className="addButton">添加司机</Button>
        <Button onClick={this.importExcel}  type="primary" className="addButton">批量导入</Button>
       </div>
      <div className='tableBox'>

          <div>
              <Table
                  rowKey="_id"
                  onCtrlClick={ this.tableAction }
                  dataSource={drivers.drivers}
                  loading={ loading }
                  columns={columns} 
                  pagination={{
                    defaultPageSize: 10,
                    total: this.props.total,
                    onChange: (page, defaultPageSize)=> this.handlePageChange(page, defaultPageSize),
                    defaultCurrent: this.state.currentPage
                  }}
              />
          </div>
      </div>

                <FormModal
                    modalKey="add"
                    visible={this.state.modalShow}
                    title="新增司机"
                    onOk={this.onOk}
                    fields={this.fields()}
                    onCancel={this.onCancel}
                    okText="保存"
                />
                <FormModal
                    modalKey="Edit"
                    visible={this.state.modalShowEdit}
                    title="修改司机"
                    fields={this.fieldsEdit()}
                    onOk={this.onOkEdit}
                    onCancel={this.onCancelEdit}
                    okText="保存"
                />
       
     </div>
   )
  }
}


function mapStateToProps(state) {
  return {
      drivers: state.DriverList.drivers,
      driver:state.DriverList.driver,
      loading:state.DriverList.loading,
      total:state.DriverList.total,
      message:state.DriverList.message
   };
}

export default connect(mapStateToProps)(Driver);
