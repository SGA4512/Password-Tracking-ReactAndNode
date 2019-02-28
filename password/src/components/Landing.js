import React from 'react';
import Add from './Add';
import Edit from './Edit';
import { Route } from 'react-router-dom';
import PasswordList from './PasswordList';


class Landing extends React.Component{
    state = { passwords: [] };

    componentDidMount() {

        const request = new Request('/password/', {
          method: 'GET',  
          crossDomain:true,
          redirect: 'follow',
          credentials: 'same-origin',
          headers: new Headers({'Content-Type': 'application/json'})
        });
  
        fetch(request)
          .then(response => { return response.json(); })
          .then(data => { this.setState({passwords: data })} )
          .catch(errors => { console.log(`Could not fetch previous password entries: ${errors}`);})
      }


    render(){
        return (
            <div className="container landing">
              <div className="col-md-12">
              <Route render={({ history}) => (
            <button
              type='button'
              className="btn btn-primary"
              onClick={() => { history.push('/Add') }}
            >
              Add New Password
            </button>
              )} />
              </div>
              <div className="col-md-6" style={{ marginTop: '20px' }}>
                <PasswordList passwords={ this.state.passwords } onSelectPassword = { this.selectPassword } />
              </div>
              </div>
        )
    }

}

export default Landing;