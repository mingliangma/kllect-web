/**
 * Created by sriharshabolisetti on 2017-03-12.
 */

import React, { PropTypes } from 'react';
import ReactPlayer from 'react-player';

const VideoItem = ({article}) => {
    const imageURl = article.imageUrl;
    return (
        // <ReactPlayer url={article.articleUrl} playing />
        <li className= "media">
            <div className="media-left">
                <ReactPlayer className="media-object" url={article.articleUrl} playing={false} />

            </div>
        </li>
    );
};

VideoItem.propTypes = {
    article: PropTypes.object.isRequired
};

export default VideoItem;
