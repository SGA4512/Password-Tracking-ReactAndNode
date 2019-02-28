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

   onDeletePassword = (password) =>{

        const request = new Request('/password/delete/' + password.id, {
            crossDomain:true,
            method: 'DELETE',  
            redirect: 'follow',
            headers: new Headers({'Content-Type': 'application/json'}),
            credentials: 'same-origin'
          });
    
          fetch(request)
            .then(response => { return response.json(); })
            .then(data => { this.setState({passwords: data}) ; console.log(data) })
            .catch(errors => { console.log(`Could not fetch previous password entries: ${errors}`);})
    }

    render(){
        return (
            <div className="container landing">
              <div className="col-md-offset-3 col-md-6">
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
              <div className="col-md-offset-3 col-md-6" style={{ marginTop: '20px' }}>
                <PasswordList passwords={ this.state.passwords } onSelectPassword = { this.selectPassword } onDeletePassword={this.onDeletePassword} />
              </div>
              </div>
        )
    }

}

export default Landing;