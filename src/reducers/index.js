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


const rootReducer = combineReducers({
    entities,
    routing
})

export default rootReducer
