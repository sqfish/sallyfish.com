import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'

class Home extends Component {
  render() {
    return (
      <div className="Home">
      </div>
    )
  }
}

Home.propTypes = {
}

const mapStateToProps = ({ }) => (
  {
  }
)

export default connect(mapStateToProps)(Home)