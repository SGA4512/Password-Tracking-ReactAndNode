import React from 'react';
import { Route } from 'react-router-dom';


class Add extends React.Component{

    state = {website: "", password: ""}

    onFormSubmit = (event) => {
        event.preventDefault();

        const request = new Request('/password/add/', {
          crossDomain:true,
          method: 'POST',  
          redirect: 'follow',
          headers: new Headers({'Content-Type': 'application/json'}),
          credentials: 'same-origin',
          body: JSON.stringify({
              'website': this.state.website,
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
              <h2>Add new record</h2>
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
                <button type="submit" className="btn btn-primary">Submit</button>
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

export default Add;