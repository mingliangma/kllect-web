import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as actions from '../actions'
import Select from 'react-select'
import 'react-select/dist/react-select.css';
import {bindActionCreators} from 'redux';
import values from 'lodash/values';
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

      this.setState({selectedTopic: val.value}, () => {
        console.log('selected topic (after component setstate: ', this.state.selectedTopic)
        this.props.loadVideos(this.state.selectedTopic);
      });
    }

    handleDismissClick = e => {
      this.props.resetErrorMessage();
      e.preventDefault();
    }

    handleChange = nextValue => {
      browserHistory.push(`/${nextValue}`);
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
        const { children } = this.props
        return (
            <div>
                <Select
                    name="form-field-name"
                    value={this.state.selectedTopic}
                    options={this.props.topicsForDropdown}
                    onChange={this.loadVideosByTopic}
                             />
                <hr />
                {this.renderErrorMessage()}
                {children}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { entities: { topics, articles } } = state;

    const topicsForDropdown = values(topics).map((id) => {
      return {
        value: id.topic,
        label: id.displayName
      }
    });

    return { topicsForDropdown };
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
