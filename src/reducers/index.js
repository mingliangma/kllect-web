import * as actionTypes from '../actions';
import merge from 'lodash/merge';
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import paginate from './paginate';
import initialState from './initialState';


// Updates an entity cache in response to any action with response.entities

const entities = (state  = initialState.entities, action ) => {
    if(action.payload && action.payload.entities){
        return merge({}, state, action.payload.entities)
    }

    return state;
};

const currentSelectedTopic = (state = initialState.currentSelectedTopic, action) => {
    if (action.type ==actionTypes.VIDEOS_REQUEST) {
        const {topic} = action;
        return topic;
    }
    else return state;


};


// Updates error message to notify about the failed fetches.


const rootReducer = combineReducers({
    paginate,
    entities,
    routing,
    currentSelectedTopic
})

export default rootReducer
