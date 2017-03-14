import React, { Component, PropTypes } from 'react'
import VideoItem from './VideoItem';


export default class VideoList extends Component{
    static propTypes ={
        items: PropTypes.array,
        onLoadMoreClick: PropTypes.func,
    }

    videoItems = this.props.items.map((video) => {
        return <VideoItem key={video.id} article={video.articleUrl}/>
    });

    renderVideoItems(){
        const {items} = this.props;
        return items.map((video) => {
            return <VideoItem key={video.id} article={video}/>
        });


    }
    renderLoadMore() {
        const isFetching=false;
        const {  onLoadMoreClick } = this.props;
        return (
            <button style={{ fontSize: '150%' }}
                    onClick={onLoadMoreClick}
                    disabled={isFetching}>
                {isFetching ? 'Loading...' : 'Load More'}
            </button>
        )
    }
    render(){
        return (
            <div>
            <ul className="media-list">
                {this.renderVideoItems()}

            </ul>
                {this.renderLoadMore()}
            </div>

        );
    }


}