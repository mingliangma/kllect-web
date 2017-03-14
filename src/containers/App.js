import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as actions from '../actions'
import Select from 'react-select'
import 'react-select/dist/react-select.css';
import values from 'lodash/values';
import VideoList from '../components/VideoList';
class App extends Component {
    static propTypes = {
        // Injected by React Redux //LEARN HOW THIS HAPPENS
        errorMessage: PropTypes.string,
        // Injected by React Router
        children: PropTypes.node
    }
    state = {selectedTopic: null}
    componentWillMount() {
        this.props.loadTopics()
    }

    loadVideosByTopic = val => {
      console.log("Selected: " + val.value);
      // this.props.loadVideos(val.value);
        this.props.loadVideos(val.value);
    }

    handleDismissClick = e => {
      this.props.resetErrorMessage();
      e.preventDefault();
    }

    handleChange = nextValue => {
      browserHistory.push(`/${nextValue}`);
    }

    handleLoadMoreClick=() => {
        this.props.loadVideos(this.props.currentSelectedTopic);
    }



    renderErrorMessage() {
        const { errorMessage } = this.props
        if (!errorMessage) {
            return null
        }

        return (
            <p style={{ backgroundColor: '#e99', padding: 10 }}>
                <b>{errorMessage}</b>
                {' '}
                (<a href="#"
                    onClick={this.handleDismissClick}>
                Dismiss
            </a>)
            </p>
        )
    }


    render() {
        return (
            <div>
                <Select
                    name="form-field-name"
                    value={this.props.currentSelectedTopic}
                    options={this.props.topicsForDropdown}
                    onChange={this.loadVideosByTopic}
                             />
                <hr />
                {this.renderErrorMessage()}
                <VideoList items={this.props.articlesInArray} onLoadMoreClick={this.handleLoadMoreClick}/>

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { entities: { topics, articles } } = state;
    const {currentSelectedTopic, paginate} = state;


    const topicsForDropdown = values(topics).map((id) => {
        return {
            value: id.topic,
            label: id.displayName
        }
    });

      // const articlesInArray = values(articles).map((articles) => {
      //     return{
      //       articleUrl: articles.articleUrl,
      //         title: articles.title,
      //         id:articles.id
      //     }
      // });

      const pagination = paginate[currentSelectedTopic] || {nextPageUrl:'', pageCount:0, ids:[], isFetching:false}

        const articlesInArray = pagination.ids.map((article) => {
          return articles[article];
        })
    return { topicsForDropdown, articlesInArray, currentSelectedTopic, pagination};
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopics: function () {
      return dispatch(actions.loadTopics());
    },
    loadVideos: function(topic)  {
      return dispatch(actions.loadVideos(topic));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

/*
 <List items = {this.props.pagination.ids}
 onLoadMoreClick={this.handleLoadMoreClick()}
 loadingLabel={'Loading '}
 nextPageUrl={this.props.pagination.nextPageUrl}
 isFetching={this.props.pagination.isFetching}
 pageCount={this.props.pagination.pageCount}
 />
 />
 */