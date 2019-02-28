import React from 'react';
import { Route, Link } from 'react-router-dom';


const Password = ({password, onDeletePassword}) => {


 return(
    <div className="list-group-item">
              <h4 className="list-group-item-heading">Web Site Name: <b>{ password.website } </b></h4>
              <p className="list-group-item-text">Password: <b>{ password.password } </b></p><br/>
              <Link to={"/Edit/"+ password.website } className="btn btn-success">Edit</Link>
              <button onClick={() => onDeletePassword(password) } className="btn btn-danger" style={{ marginLeft: '10px' }} >Delete</button>
    </div>
 ) 

}

export default Password;