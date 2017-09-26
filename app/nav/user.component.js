import React from 'react'
import {connect} from 'react-redux'
import Badge from '../shared/badge.component'

class UserList extends React.Component {
  render() {
    const {list} = this.props;
    return (
      <div>
        Select user:
        <hr />
        <ul className="no-bullet">
          {
            Object.values(list).map((e)=>
                <li key={e.initials+e.name}>
                  <Badge
                    color={e.color}
                    initials={e.initials}
                    name={e.name} />
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
    'list':state.users.list
  };
}

export default connect(mapStateToProps)(UserList)
