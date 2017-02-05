import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

/*
 * Application container
 */
class Application extends Component {
  render() {
    return (
      <div className="Application">
        <div className="Application-content">
          { this.props.children }
        </div>
      </div>
    )
  }
}

Application.propTypes = {
  dispatch: PropTypes.func,
  children: PropTypes.node
}

const mapStateToProps = ({ Authentication }, ownProps) => (
    {
        children: ownProps.children
    }
)

export default connect(mapStateToProps)(Application);
