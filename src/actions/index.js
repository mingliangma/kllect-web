import { normalize, schema } from 'normalizr'
import { camelizeKeys } from 'humps'

const getNextPageUrl = response => {
    const link = response.body.nextPagePath;
    const countArticles = response.body.articleCount;
    if(countArticles < 10) return null;
    if (!link) {
        return null
    }

    const nextLink = link.split('offset=')[1];

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
                const nextPageUrl = getNextPageUrl(response)

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




//when i kept in this form results are not even populated is not accessible
//
// export function loadTopics() {
//     return function (dispatch,getState) {
//         console.log(getState)
//         let {topics} = getState().entities.topics;
//         if(topics){
//             console.log(topics);
//             //There is cached data! Don't do anything!!
//             return topics;
//         }
//         callApi('http://api.app.kllect.com/topics', Schemas.TOPIC_ARRAY).then(
//             response => dispatch({
//                 type: TOPICS_SUCCESS,
//                 response
//             }),
//             error => dispatch({
//                 type: TOPICS_FAILURE,
//                 error
//             })
//         );
//
//
//
//     }
//
// }
//when i kept in this form getstate is not accessible
export const loadTopics = () => {
  return (dispatch, getState) => {
    console.log('loadTopics - getState -> ', getState);

    dispatch({ type: TOPICS_REQUEST });
    callApi('http://api.app.kllect.com/topics', Schemas.TOPIC_ARRAY)
      .then(
        response => dispatch({ type: TOPICS_SUCCESS, response }),
        error => dispatch({ type: TOPICS_FAILURE, error })
      );
  };

  //   //why is getState() not accessible ??
  //   console.log(getState)
  //  //  let {topics} = getState().entities.topics;
  //   // if(topics){
  //   //     console.log(topics);
  //   //     //There is cached data! Don't do anything!!
  //   //     return;
  //   // }
  //   dispatch({
  //       type: TOPICS_REQUEST
  //   })
  //   callApi('http://api.app.kllect.com/topics', Schemas.TOPIC_ARRAY).then(
  //       response => dispatch({
  //           type: TOPICS_SUCCESS,
  //           response
  //       }),
  //       error => dispatch({
  //           type: TOPICS_FAILURE,
  //           error
  //       })
  //   );
};



export const VIDEOS_REQUEST = 'VIDEOS_REQUEST';
export const VIDEOS_SUCCESS = 'VIDEOS_SUCCESS';
export const VIDEOS_FAILURE = 'VIDEOS_FAILURE';

export const loadVideos = (topic) => {
   console.log("in loadVideos");

   return (dispatch, getState) => {
     console.log("in dispatch");
     dispatch({
       type: VIDEOS_REQUEST,
       topic
     });

     callApi(`http://api.app.kllect.com/topic/{topic}`, Schemas.ARTICLE_ARRAY).then(
       response => dispatch({
         type: VIDEOS_SUCCESS,
         topic,
         response
       }),
       error => dispatch({
         type: VIDEOS_FAILURE,
         topic,
         error
       })
    );
  };
};


//
// export function loadVideos(topic) {
//     console.log("in loadVideos" + topic);
//     return function (dispatch, getState) {
//         console.log("in loadVideos");
//         callApi(`http://api.app.kllect.com/topic/{topic}`, Schemas.ARTICLE_ARRAY).then(
//             response => dispatch({
//                 type: VIDEOS_SUCCESS,
//                 response
//             }),
//             error => dispatch({
//                 type: VIDEOS_FAILURE,
//                 error
//             })
//         );
//     }
// }



// Fetches a page of videos by a particular topic.
// Relies on the custom API middleware defined in ../middleware/api.js.
// const fetchVideos = (topic, nextPageUrl) => ({
//     [CALL_API]: {
//         types: [ VIDEOS_REQUEST, VIDEOS_SUCCESS, VIDEOS_FAILURE ],
//         endpoint: nextPageUrl,
//         schema: Schemas.ARTICLE_ARRAY
//     }
// })
