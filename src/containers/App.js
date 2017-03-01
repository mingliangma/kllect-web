import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import {resetErrorMessage, loadTopics} from '../actions'
import Select from 'react-select';
import {bindActionCreators} from 'redux';
class App extends Component {
    static propTypes = {
        // Injected by React Redux //LEARN HOW THIS HAPPENS
        errorMessage: PropTypes.string,
        resetErrorMessage: PropTypes.func.isRequired,
        inputValue: PropTypes.string.isRequired,
        // Injected by React Router
        children: PropTypes.node
    }

    componentWillMount() {
        this.props.loadTopics()
    }

    handleDismissClick = e => {
        this.props.resetErrorMessage()
        e.preventDefault()
    }

    handleChange = nextValue => {
        browserHistory.push(`/${nextValue}`)
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
        const { children, inputValue } = this.props
        return (
            <div>
                <Select
                                 name="form-field-name"
                                 value={this.state.selectedTopic}
                                 options={this.props.topics}
                                 onChange={this.loadVideosByTopic}
                             />
                <hr />
                {this.renderErrorMessage()}
                {children}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    errorMessage: state.errorMessage,
    inputValue: ownProps.location.pathname.substring(1)
})



export default connect(mapStateToProps,
    {resetErrorMessage, loadTopics}
)(App)
