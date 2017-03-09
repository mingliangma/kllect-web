import * as ActionTypes from '../actions';
import merge from 'lodash/merge';
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import paginate from './paginate';

// Updates an entity cache in response to any action with response.entities

const entities = (state = { topics: {}, articles: {}}, action ) => {
    if(action.payload && action.payload.entities){
        return merge({}, state, action.payload.entities)
    }

    return state;
};

// Updates error message to notify about the failed fetches.


const rootReducer = combineReducers({
    paginate,
    entities,
    routing
})

export default rootReducer
