import React from 'react';
import { Route } from 'react-router-dom';


class Edit extends React.Component{

    state = {website: "", password: ""}

    componentDidMount() {
    
        const request = new Request('/password/' + this.props.match.params.website , {
            method: 'GET',  
            crossDomain:true,
            redirect: 'follow',
            credentials: 'same-origin',
            headers: new Headers({'Content-Type': 'application/json'})
          });
    
          fetch(request)
            .then(response => { return response.json(); })
            .then(data => { 
                console.log(data);
                this.setState({website: data[0].website, password: data[0].password })
            } )
            .catch(errors => { console.log(`Could not fetch previous password entries: ${errors}`);})

    }


    onFormSubmit = (event) => {
        event.preventDefault();

        const request = new Request('/password/edit/' + this.state.website, {
          crossDomain:true,
          method: 'PUT',  
          redirect: 'follow',
          headers: new Headers({'Content-Type': 'application/json'}),
          credentials: 'same-origin',
          body: JSON.stringify({
              'password': this.state.password
          })
        });
  
        fetch(request)
          .then(response => { return response.json(); })
          .then(data => { console.log(data)})
          .catch(errors => { console.log(`Could not fetch previous password entries: ${errors}`);})


          this.props.history.push('/');
    }

    render(){
        return(
          <div className="container">
            <div className="col-md-offset-3 col-md-6">
              <h2>Edit Password</h2>
          <form onSubmit={this.onFormSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Website address</label>
                    <input type="text" className="form-control" placeholder="Website" 
                        value={ this.state.website } 
                        onChange = {e => this.setState({website: e.target.value})}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="text" className="form-control" placeholder="Password"  
                    value={ this.state.password } 
                    onChange = {e => this.setState({password: e.target.value})}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
                <Route render={({ history}) => (
            <button
              type='button'
              className="btn btn-primary"
              style={{ marginLeft: '10px' }}
              onClick={() => { history.push('/') }}
            >
              Cancel
            </button>
              )} />
            </form>
            </div>
            </div>
        )
    }
}

export default Edit;