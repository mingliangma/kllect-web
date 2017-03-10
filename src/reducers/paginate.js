import initialState from './initialState';
import union from 'lodash/union';
import * as actionTypes from '../actions';


const paginate = (state = initialState.articlesPaginatedByTopic, action) => {

    const updatePagination=(state = {
        nextPageUrl: undefined,
        pageCount: 0,
        ids: [],
        },action)=>{
        switch(action.type){
            case actionTypes.VIDEOS_REQUEST:
                return {
                    ...state,
                    isFetching: true
                };
            case actionTypes.VIDEOS_SUCCESS:
                return{
                    ...state,
                    isFetching:false,
                    ids: union(state.ids, action.payload.result.articles), //or action.payload.result.articles ?
                    nextPageUrl:action.payload.nextPageUrl,
                    pageCount: state.pageCount +1
                };
            case actionTypes.VIDEOS_FAILURE:
                return{
                    ...state,
                    isFetching:false
                };
            default:
                return state
        }

    };

    switch (action.type){
        case actionTypes.VIDEOS_REQUEST:
        case actionTypes.VIDEOS_SUCCESS:
        case actionTypes.VIDEOS_FAILURE:
            const {topic,payload} = action;
            return {
                ...state,
                [topic]: updatePagination(state[topic], action)
            };
        default:
            return state;
            }
};



 export default paginate;



