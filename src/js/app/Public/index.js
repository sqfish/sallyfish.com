import React, { Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

class Public extends Component {
  render() {
    return (
      <div className="Public">
        <div className="Public-content">
            { this.props.children }
        </div>
      </div>
    )
  }
}

Public.propTypes = {
  children: PropTypes.node
}

const mapStateToProps = ({ }) => (
  {
  }
)

export default connect(mapStateToProps)(Public)
