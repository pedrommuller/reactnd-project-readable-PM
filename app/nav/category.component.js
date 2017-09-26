import React from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class Categories extends React.Component {
  render() {
    return (
      <div>
        Categories
        <hr />
        <ul>
          {
            this.props.list.map((e)=>
              <li key={e}>
                <a href="#">{e}</a>
              </li>
            )
          }
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state){
    return {
    'list':state.categories.list
  };
}

export default connect(mapStateToProps)(Categories)

Categories.propTypes = {
};
