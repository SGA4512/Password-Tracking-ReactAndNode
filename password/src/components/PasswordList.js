import React from 'react';
import Password from './Password';

const PasswordList = ({passwords, onDeletePassword}) => {


if(passwords.length === 0){
    return <div>No record found</div>
}

const passwordHtml = passwords.map((password) => {
    return <Password key={password.id} password={password} onDeletePassword={ onDeletePassword} />
})

    return( 
        <div className="list-group">
             {passwordHtml}
        </div>
    )
}


export default PasswordList; 