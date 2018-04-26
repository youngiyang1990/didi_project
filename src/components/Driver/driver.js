import React,{Component} from 'react'
import reactDom from 'react-dom'
import FormModal from '../modalForm/modal'
import { Button, message, Modal, Divider } from 'antd'
import CommonTable from '../table'
import moment from 'moment'




class Driver extends Component {
  constructor(props) {
    super(props)
    this.state = {
        tData: [],
        item: {},
        loading: true,
        modalShow: false,
        modalShowEdit: false,
        drivers:[]
    }
}
  add = () => {
    this.setState({
        modalShow: true
    })
  }

  onOk = (params) => {
    console.log(params)
    let request = new Request('driver', {
      method: 'POST', 
      mode: 'no-cors',
      body:JSON.stringify(params),
      headers:{'Content-Type':'application/json'}
      });
      fetch(request)
      .then(function(request) {
        // res instanceof Response == true.
        if (request.ok) {
          request.json().then(function(data) {
            console.log(data.entries);
          });
        } else {
          console.log("Looks like the response wasn't perfect, got status", request.status);
        }
      }, function(e) {
        console.log("Fetch failed!", e);
      });
      this.onCancel()
  }
  onCancel = () => {
    this.setState({
        modalShow: false
    })
  }
  onOkEdit = (param) => {
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
  fields = () => {
    const allSex = [
      {
        value:0,
        mean:"保密"
      },      {
        value:1,
        mean:"男"
      },      {
        value:2,
        mean:"女"
      }
    ]
    const AllLicenseType = [
      {
        value:0,
        mean:"A1"
      },{
        value:1,
        mean:"A2"
      },{
        value:2,
        mean:"A3"
      },{
        value:3,
        mean:"B1"
      },{
        value:4,
        mean:"B2"
      },{
        value:5,
        mean:"C1"
      },{
        value:6,
        mean:"C2"
      },{
        value:7,
        mean:"C3"
      }
    ]
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
    //   {
    //     label: '性别',
    //     type: 'select',
    //     name: 'sex',
    //     defaultValue: '保密',
    //     items: () => allSex.map(ele => ({
    //       key: ele.value,
    //       value: ele.mean
    //   })),
    //     options: {
    //         rules: [{
    //             required: true,
    //             message: '性别必填!',
    //         }]
    //     }
    // },{
    //   label: '本人手机号',
    //   type: 'input',
    //   name: 'phone',
    //   options: {
    //       rules: [{
    //           required: true,
    //           message: '手机号必填!',
    //       }]
    //   }
    // },{
    //   label: '身份证号码',
    //   type: 'input',
    //   name: 'idNumber',
    //   options: {
    //       rules: [{
    //           required: true,
    //           message: '身份证号码必填!',
    //       }]
    //   }
    // },{
    //   label: '身份证住址',
    //   type: 'input',
    //   name: 'idAddress',
    //   options: {
    //       rules: [{
    //           required: false,
    //       }]
    //   }
    // },{
    //   label: '居住证住址',
    //   type: 'input',
    //   name: 'stayAdress',
    //   options: {
    //       rules: [{
  //             required: false,
  //         }]
  //     }
  //   },{
  //     label: '驾驶证类型',
  //     type: 'select',
  //     mode:"multiple",
  //     name: 'licenseType',
  //     defaultValue: 'C1',
  //     items: () => AllLicenseType.map(ele => ({
  //       key: ele.value,
  //       value: ele.mean
  //   })),
  //     options: {
  //         rules: [{
  //             required: true,
  //             message: '性别必填!',
              
  //         }]
  //     }
  //   },{
  //     label: '初领证时间',
  //     type: 'datetime',
  //     name: 'licenseDate',
  //     options: {
  //         rules: [{
  //             required: true,
  //             message: '时间必填!',
  //         }]
  //     }
  // }
]
  }

  componentDidMount(){

  }


  
 render(){

   return (
     <div>
      <div className='tableBox'>
          <Button onClick={this.add}  type="primary" className="addButton">添加</Button>
        
        <div style={{marginTop:20}}>
          <CommonTable/>
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
                    title="修改音乐"
                    onOk={this.onOkEdit}
                    onCancel={this.onCancelEdit}
                    okText="保存"
                />
       
     </div>
   )
  }
}
export default Driver;
