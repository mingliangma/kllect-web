import { CALL_API, Schemas } from '../middleware/api'


export const TOPICS_REQUEST = 'TOPICS_REQUEST';
export const TOPICS_SUCCESS = 'TOPICS_SUCCESS';
export const TOPICS_FAILURE = 'TOPICS_FAILURE';


// fetches list of topics
// Relies on the custom API middleware defined in ../middleware/api.js.


const fetchTopics = ()=>({
    [CALL_API]:{
        types: [ TOPICS_REQUEST, TOPICS_REQUEST, TOPICS_REQUEST],
        endpoint: 'topics',
        schema:Schemas.TOPIC_ARRAY

    }
});

export const loadTopics = (dispatch)=>{
    return dispatch(fetchTopics());
};


export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
    type: RESET_ERROR_MESSAGE
})