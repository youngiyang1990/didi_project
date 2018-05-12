import { EXPECT_DRIVER_LIST, DRIVER_LIST_FAIL,DRIVER_LIST_SUCCESS,EXPECT_DRIVER_ITEM,DRIVER_ITEM_SUCCESS,DRIVER_ITEM_FAIL,EXPECT_SEARCH_DRIVER,SEARCH_DRIVER_SUCCESS,GET_TOTAL_SUCCESS,ADD_DRIVER_SUCCESS, ADD_DRIVER_FAIL
} from '../actions/driver'




  function DriverList(state = {
    loading: true,
    drivers: [],
    message:'',
    driver:{
      createdAt : '',
      idNumber : '',
      licenseDate : '',
      licenseType : '',
      name : '默认值',
      phone : '',
      sex : '',
      updatedAt : '',
      _id : ''
    },
    total:'',
  },action){
    console.log(action.type);
    switch (action.type) {
        case EXPECT_DRIVER_LIST:
          return Object.assign({}, state, {
            loading: true,
          })
        case DRIVER_LIST_SUCCESS:
          return Object.assign({}, state, {
            loading: false,
            drivers:action.drivers
          })
          case EXPECT_DRIVER_ITEM:
          return Object.assign({}, state, {
            loading: true,
          })
          case DRIVER_ITEM_SUCCESS:
          return Object.assign({}, state, {
            loading: false,
            driver: {...action.driver}
          })
          case EXPECT_SEARCH_DRIVER:
          return Object.assign({}, state, {
            loading: true,
          })
          case SEARCH_DRIVER_SUCCESS:
          return Object.assign({}, state, {
            loading: false,
            drivers:action.driver
          })
          case GET_TOTAL_SUCCESS:
          return Object.assign({}, state, {
            total:action.total
          })
          case ADD_DRIVER_SUCCESS:
          return Object.assign({}, state, {
            message:action.message
          })
          case ADD_DRIVER_FAIL:
          return Object.assign({}, state, {
            message:action.message
          })
        default:
          return state
      }
}

export default DriverList
