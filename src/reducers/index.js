import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import paginate from './paginate'


// Updates an entity cache in response to any action with response.entities

const entities = (state = { topics: {}, articles: {}}, action ) => {
    if(action.response && action.response.entities){
        return merge({}, state, action.response.entities)
    }

    return state;
};

// Updates error message to notify about the failed fetches.

const errorMessage = (state = null, action) => {
    const {type, error} = action;

    if(type === ActionTypes.RESET_ERROR_MESSAGE){
        return null;
    }
    else if(error){
        return error;
    }

    return state;
};

const pagination = {
    videosByTopic: paginate({
        mapActionToKey: action => action.topic,
        types: [
            ActionTypes.VIDEOS_REQUEST,
            ActionTypes.VIDEOS_SUCCESS,
            ActionTypes.VIDEOS_FAILURE
        ]
    })
}
const rootReducer = combineReducers({
    pagination,
    entities,
    errorMessage,
    routing
})

export default rootReducer
