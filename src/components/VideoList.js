import React, { Component, PropTypes } from 'react'
import VideoItem from './VideoItem';


export default class VideoList extends Component{
    static propTypes ={
        items: PropTypes.array,
        onLoadMoreClick: PropTypes.func,
        isFetching: PropTypes.bool,
        nextPageUrl: PropTypes.string,
        pageCount: PropTypes.number
    };

    static defaultProps = {
        isFetching: true
    };



    renderVideoItems(items){
        return items.map((video) => {
            return <VideoItem key={video.id} article={video}/>
        });


    }
    renderLoadMore() {
        const {  isFetching, onLoadMoreClick } = this.props;
        {console.log(isFetching)}
        return (
            <button style={{ fontSize: '150%' }}
                    onClick={onLoadMoreClick}
                    disabled={isFetching}>
                {isFetching ? 'Loading...' : 'Load More'}
            </button>
        )
    }
    render(){
        const {
            isFetching, nextPageUrl, pageCount,
            items
        } = this.props;

        const isEmpty = items.length === 0;
        if (isEmpty && isFetching) {
            return <h2><i>'Loading...'</i></h2>
        }


        const isLastPage = !nextPageUrl
        if (isEmpty && isLastPage) {
            return <h1><i>Nothing here!</i></h1>
        }


        return (
            <div>
            <ul className="media-list">
                {this.renderVideoItems(items)}

            </ul>
                {pageCount > 0 && !isLastPage && this.renderLoadMore()}
            </div>

        );
    }


}