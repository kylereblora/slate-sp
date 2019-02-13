import authReducer from './authReducer'
import projectReducer from './projectReducer'
import proReducer from './proReducer'
import productReducer from './productReducer'


import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    pro: proReducer,
    product: productReducer,
});

export default rootReducer
