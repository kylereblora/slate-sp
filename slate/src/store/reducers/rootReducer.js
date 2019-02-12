import authReducer from './authReducer'
import projectReducer from './projectReducer'
import proReducer from './proReducer'

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    pro: proReducer,
});

export default rootReducer
