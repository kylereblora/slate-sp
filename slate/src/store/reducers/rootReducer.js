import authReducer from './authReducer'
import projectReducer from './projectReducer'
import proReducer from './proReducer'
import productReducer from './productReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    pro: proReducer,
    product: productReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer
