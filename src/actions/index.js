import { normalize, schema } from 'normalizr'
import { camelizeKeys } from 'humps'


const API_ROOT = 'http://api.app.kllect.com/';

const getNextPageUrl = response => {
    console.log("in getNextPageUrl" )
    const link = response.nextPagePath;
    console.log(response.body)
    const countArticles = response.articleCount;
    if(countArticles < 10) return null;
    if (!link) {
        return null
    }

    const nextLink = API_ROOT+link;
    console.log(nextLink);
    return nextLink;
};


const topicSchema = new schema.Entity('topics');
const topicsListSchema = [topicSchema];


const articleSchema = new schema.Entity('articles');


const articlesListSchema = {articles: [ articleSchema ]};

const Schemas = {
    TOPIC: topicSchema,
    TOPIC_ARRAY: topicsListSchema,
    ARTICLE: articleSchema,
    ARTICLE_ARRAY: articlesListSchema

};



const callApi = (endpoint, schema) => {

    return fetch(endpoint)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json)
                }

                const camelizedJson = camelizeKeys(json)
                const nextPageUrl = getNextPageUrl(json)

                return Object.assign({},
                    normalize(camelizedJson, schema),
                    { nextPageUrl }
                )
            })
        )
}



export const TOPICS_REQUEST = 'TOPICS_REQUEST';
export const TOPICS_SUCCESS = 'TOPICS_SUCCESS';
export const TOPICS_FAILURE = 'TOPICS_FAILURE';




export const loadTopics = () => {
  return (dispatch, getState) => {

    dispatch({ type: TOPICS_REQUEST });
    callApi('http://api.app.kllect.com/topics', Schemas.TOPIC_ARRAY)
      .then(
        payload => dispatch({ type: TOPICS_SUCCESS, payload }),
        error => dispatch({ type: TOPICS_FAILURE, error })
      );
  };


};



export const VIDEOS_REQUEST = 'VIDEOS_REQUEST';
export const VIDEOS_SUCCESS = 'VIDEOS_SUCCESS';
export const VIDEOS_FAILURE = 'VIDEOS_FAILURE';

export const loadVideos = (topic) => {

   return (dispatch, getState) => {
       const{
           nextPageUrl=`${API_ROOT}articles/topic/${topic}`,
           pageCount=0
       } = getState().paginate[topic] || {}
     console.log("in dispatch" + nextPageUrl + " - " + pageCount);
     dispatch({
       type: VIDEOS_REQUEST,
       topic
     });
     callApi(nextPageUrl, Schemas.ARTICLE_ARRAY).then(
       payload => dispatch({
         type: VIDEOS_SUCCESS,
         topic,
         payload
       }),
       error => dispatch({
         type: VIDEOS_FAILURE,
         topic,
         error
       })
    );
  };
};


