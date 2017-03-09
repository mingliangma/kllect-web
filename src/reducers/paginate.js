
import union from 'lodash/union';
import * as actionTypes from '../actions';

function updatePagination(state = {
        nextPageUrl: undefined,
        pageCount: 0,
        ids: []
    },  payload) {
    const {result} = payload;
    const {articles,articleCount,nextPageUrl } = result;

    return {
        ...state,
        ids: union(state.ids, articles),
        nextPageUrl,
        pageCount: state.pageCount+1

    }

}

function paginate(state={}, action) {
    const {topic, payload} = action;
    switch(action.type){
        case actionTypes.VIDEOS_SUCCESS:
            return{
                ...state,
                articlesPaginatedByTopic: {
                    ...state[articlesPaginatedByTopic],
                    [topic]:updatePagination(state[topic][articlesPaginatedByTopic],payload)
                }
            }
    }
}

export default paginate;