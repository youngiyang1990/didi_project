import axios from 'axios'
export const EXPECT_DRIVER_LIST = "EXPECT_DRIVER_LIST";
export const DRIVER_LIST_SUCCESS = "DRIVER_LIST_SUCCESS";
export const DRIVER_LIST_FAIL = "DRIVER_LIST_FAIL";


export function expectGetDriverList(){
  return {
    type:EXPECT_DRIVER_LIST
  }
}

export function getDriverListSuccess(drivers){
  return {
    type:DRIVER_LIST_SUCCESS,
    drivers
  }
}

export function getDriverList(page=1,pageSize=10){
  console.log('重新渲染数据')
  return (dispatch) => {
    dispatch(expectGetDriverList())
     axios('./drivers',{ 
       params: {
        page:page,
        pageSize:pageSize
      }
      })
    .then(res =>
      dispatch(getDriverListSuccess(res.data))
    )
  }
}


export const EXPECT_DRIVER_ITEM = "EXPECT_DRIVER_ITEM";
export const DRIVER_ITEM_SUCCESS = "DRIVER_ITEM_SUCCESS";
export const DRIVER_ITEM_FAIL = "DRIVER_ITEM_FAIL";

export function expectGetDriverItem(){
  return {
    type:EXPECT_DRIVER_ITEM
  }
}

export function getDriverItemSuccess(driver){
  return {
    type:DRIVER_ITEM_SUCCESS,
    driver
  }
}

export function getDriverItem(id){
  return (dispatch) => {
    dispatch(expectGetDriverItem())
     axios.get(`./driver/${id}`)
    .then(res =>{
      dispatch(getDriverItemSuccess(res.data.driver))
    })
    .catch(err=>{ console.log(err) })
  }
}

export const EXPECT_UPDATE_DRIVER = "EXPECT_UPDATE_DRIVER";
export const UPDATE_DRIVER_SUCCESS = "UPDATE_DRIVER_SUCCESS";


export function expectUpdateDriver(){
  return {
    type:EXPECT_UPDATE_DRIVER
  }
}
export function updateDriverSuccess(){
  return {
    type:UPDATE_DRIVER_SUCCESS
  }
}
export function updateDriver(driver,params){
  return (dispatch) => {
    dispatch(expectUpdateDriver())
    axios.put(`./driver/${driver._id}`,params)
    .then(
      res => {
        dispatch(updateDriverSuccess())
        dispatch(getDriverList(1,10))
      }
    )
  }
}

export const EXPECT_DELETE_DRIVER = "EXPECT_DELETE_DRIVER";
export const DELETE_DRIVER_SUCCESS = "DELETE_DRIVER_SUCCESS";


export function expectDeleteDriver(){
  return {
    type:EXPECT_UPDATE_DRIVER
  }
}
export function deleteDriverSuccess(){
  return {
    type:DELETE_DRIVER_SUCCESS
  }
}
export function deleteDriver(id){
  return (dispatch) => {
    dispatch(expectDeleteDriver())
    axios.put(`./delete_driver/${id}`)
    .then(
      res => {
        dispatch(deleteDriverSuccess())
        dispatch(getDriverList(1,10))
      })
    .catch(err=>{ console.log(err) })
  }
}

export const EXPECT_CHANGE_DRIVER_STATUS = "EXPECT_CHANGE_DRIVER_STATUS";
export const CHANGE_DRIVER_STATUS_SUCCESS = "CHANGE_DRIVER_STATUS_SUCCESS";


export function expectchangeDriverStatus(){
  return {
    type:EXPECT_CHANGE_DRIVER_STATUS
  }
}
export function changeDriverStatusSuccess(){
  return {
    type:CHANGE_DRIVER_STATUS_SUCCESS
  }
}
export function changeDriverStatus(id,value){
  return (dispatch) => {
    dispatch(expectchangeDriverStatus())
    axios.put(`./change_driver/${id}`,{
      params: {
        status: value
      }
    })
    .then(
      res => {
        dispatch(changeDriverStatusSuccess())
        dispatch(getDriverList(1,10))
      })
    .catch(err=>{ console.log(err) })
  }
}

export const EXPECT_SEARCH_DRIVER= "EXPECT_SEARCH_DRIVER";
export const SEARCH_DRIVER_SUCCESS = "SEARCH_DRIVER_SUCCESS";


export function expectSearchDriver(){
  return {
    type:EXPECT_SEARCH_DRIVER
  }
}
export function searchDriverSuccess(driver){
  return {
    type:SEARCH_DRIVER_SUCCESS,
    driver
  }
}
export function searchDriver(phone){
  return (dispatch) => {
    dispatch(expectSearchDriver())
    axios.get(`./search_driver/${phone}`)
    .then(
      res => {
        dispatch(searchDriverSuccess(res.data))
      })
    .catch(err=>{ console.log(err) })
  }
}


export const EXPECT_GET_TOTAL= "EXPECT_GET_TOTAL";
export const GET_TOTAL_SUCCESS = "GET_TOTAL_SUCCESS";

export function expectGetTotal(){
  return {
    type:EXPECT_GET_TOTAL
  }
}

export function getTotalSuccess(total){
  return {
    type:GET_TOTAL_SUCCESS,
    total
  }
}

export function getTotal(){
  return (dispatch) => {
    dispatch(expectGetTotal())
    axios.get('/all_drivers')
    .then(
      res =>{
        console.log(res.data.count)
        dispatch(getTotalSuccess(res.data.count))
      }
    )
  }
}

export const EXPECT_ADD_DRIVER = 'EXPECT_ADD_DRIVER'
export const ADD_DRIVER_SUCCESS = 'ADD_DRIVER_SUCCESS'
export const ADD_DRIVER_FAIL = 'ADD_DRIVER_FAIL'


export function expectAddDriver(){
  return{
    type:EXPECT_ADD_DRIVER
  }
}
export function addDriverSuccess(message){
  return {
    type: ADD_DRIVER_SUCCESS,
    message
  }
}
export function addDriverFail(message){
  return {
    type: ADD_DRIVER_FAIL,
    message
  }
}

export function addDriver(params){
  return (dispatch) => {
    dispatch(expectAddDriver())
    axios.post('/driver',{
      params
    })
    .then( 
      res => dispatch(addDriverSuccess(res.data))
    )
    .catch(function (error) {
      dispatch(addDriverFail('相同手机号已经存在,新增失败'))
    });
  }
}