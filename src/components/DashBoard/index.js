import React from 'react'
import { Row, Col, Card, Timeline, Icon } from 'antd'
import EchartsViews from './EchartsViews'
import EchartsProjects from './EchartsProjects'
import b1 from '../images/minren.jpg'
import b2 from '../images/zuozu.jpg'
import b3 from '../images/xiaoying.jpg'
import b4 from '../images/chutian.jpg'
import './dashboard.less'
import { connect } from 'react-redux';
import { getTotal } from '../../redux/actions/driver';

class DashBoard extends React.Component {
    componentDidMount(){
        this.props.dispatch(getTotal())
    }
    
    render() {
        const total = this.props
        return (
            <div>
                <Row gutter={16}>
                    <Col span={4}>
                        <div className="cloud-box">
                            <Card>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="heart" className="text-2x text-danger" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">总司机数量</div>
                                        <h2>{total.total}</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="cloud-box">
                            <Card>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="cloud" className="text-2x" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">待统计数据</div>
                                        <h2>1111</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Col>
                    <Col span={4}>
                        <div className="cloud-box">
                            <Card>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="camera" className="text-2x text-info" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">待统计数据</div>
                                        <h2>1111</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="cloud-box">
                            <Card>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="mail" className="text-2x text-success" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">待统计数据</div>
                                        <h2>1111</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Col>
                    <Col span={16}>
                        <div className="cloud-box">
                            <Card className={'no-padding'}>
                                <EchartsProjects />
                            </Card>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className="cloud-box">
                            <Card>
                                <div className="pb-m">
                                    <h3>建站日志</h3>
                                    <small>2个待完成，1个正在进行中</small>
                                </div>
                                <a className="card-tool"><Icon type="sync" /></a>
                                <Timeline>
                                    <Timeline.Item color="#108ee9">
                                        <p>更多模块开发中</p>
                                    </Timeline.Item>
                                    <Timeline.Item color="red">
                                        <p>Excel导入数据(正在开发)</p>
                                    </Timeline.Item>
                                    <Timeline.Item color="green">封装Ajax实现跨域请求</Timeline.Item>
                                    <Timeline.Item color="green">引人Redux,Fetch</Timeline.Item>
                                    <Timeline.Item color="green">引人Less,React-Router(4.x)</Timeline.Item>
                                    <Timeline.Item color="green">初始化项目</Timeline.Item>
                                </Timeline>
                            </Card>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className="cloud-box">
                            <Card>
                                <div>待开发模块</div>
                                <div>待开发模块</div>
                                <div>待开发模块</div>
                                <div>待开发模块</div>
                                <div>待开发模块</div>
                                <div>待开发模块</div>
                                <div>待开发模块</div>
                            </Card>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className="cloud-box">
                            <Card>
                                <div className="pb-m">
                                    <h3>访问量统计</h3>
                                    <small>最近7天用户访问量</small>
                                </div>
                                <a className="card-tool"><Icon type="sync" /></a>
                                <EchartsViews />
                            </Card>
                        </div>
                    </Col>
                </Row>
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
        message:state.DriverList.insertState
     };
  }
  
  export default connect(mapStateToProps)(DashBoard);