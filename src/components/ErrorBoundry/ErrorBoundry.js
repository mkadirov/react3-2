import React, { Component } from 'react'

export default class ErrorBoundry extends Component {
    constructor() {
        super();
        this.state = {error: false}
    }

    componentDidCatch() {
        this.setState({error: true});
    }
    
  render() {

    if(this.state.error) {
        return <p style={{color: 'red'}}>Xatolik sodir bo'ldi</p>
    } 
    return this.props.children
  }
}
