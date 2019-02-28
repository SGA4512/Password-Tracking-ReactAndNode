import React from 'react';
import { Route, Link } from 'react-router-dom';


class PasswordList extends React.Component{

delete = (name) =>{
    const request = new Request('/password/delete/' + name, {
        crossDomain:true,
        method: 'DELETE',  
        redirect: 'follow',
        headers: new Headers({'Content-Type': 'application/json'}),
        credentials: 'same-origin'
      });

      fetch(request)
        .then(response => { return response.json(); })
        .then(data => { console.log(data)})
        .catch(errors => { console.log(`Could not fetch previous password entries: ${errors}`);})
}

render(){
    return this.props.passwords.map((password) => {
        return( 
            <div className="list-group">
            <div className="list-group-item">
              <h4 className="list-group-item-heading">Web Site Name: <b>{ password.website } </b></h4>
              <p className="list-group-item-text">Password: <b>{ password.password } </b></p><br/>
              <Link to={"/Edit/"+ password.website } className="btn btn-success">Edit</Link>
              <button onClick={() => this.delete(password.website) } className="btn btn-danger" style={{ marginLeft: '10px' }} >Delete</button>
            </div>
          </div>
        )
    })
}
}

export default PasswordList; 