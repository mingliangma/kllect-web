import { CALL_API, Schemas } from '../middleware/api'


export const TOPICS_REQUEST = 'TOPICS_REQUEST';
export const TOPICS_SUCCESS = 'TOPICS_SUCCESS';
export const TOPICS_FAILURE = 'TOPICS_FAILURE';


// fetches list of topics
// Relies on the custom API middleware defined in ../middleware/api.js.


const fetchTopics = ()=>({
    [CALL_API]:{
        types: [ TOPICS_REQUEST, TOPICS_SUCCESS, TOPICS_FAILURE],
        endpoint: 'topics',
        schema:Schemas.TOPIC_ARRAY

    }
});

export const loadTopics = (dispatch)=>{
    return dispatch(fetchTopics());
};


export const VIDEOS_REQUEST = 'VIDEOS_REQUEST'
export const VIDEOS_SUCCESS = 'VIDEOS_SUCCESS'
export const VIDEOS_FAILURE = 'VIDEOS_FAILURE'

// Fetches a page of videos by a particular topic.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchVideos = (topic, nextPageUrl) => ({
    topic,
    [CALL_API]: {
        types: [ VIDEOS_REQUEST, VIDEOS_SUCCESS, VIDEOS_FAILURE ],
        endpoint: nextPageUrl,
        schema: Schemas.ARTICLE_ARRAY
    }
})

// Fetches a page of starred repos by a particular user.
// Bails out if page is cached and user didn't specifically request next page.
// Relies on Redux Thunk middleware.
export const loadVidoes = (topic, nextPage) => (dispatch, getState) => {
    const {
        nextPageUrl = `/articles/topic/${topic}`,
        pageCount = 0
    } = getState().pagination.videosByTopic[topic] || {}

    if (pageCount > 0 && !nextPage) {
        return null
    }

    return dispatch(fetchVideos(topic, nextPageUrl))
}


export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
    type: RESET_ERROR_MESSAGE
})


