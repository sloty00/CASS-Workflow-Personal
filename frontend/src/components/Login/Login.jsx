import React from 'react';
import Sistema from './Sistema';

const Login = () => {
    return (
        <div className='sign-in-container max-wg-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300'>
            <div className='titleContainer' style={{display:'flex', justifyContent:'center', alignItems:'center', width: '-webkit-fill-available',}}>
                <h1>Sistema de Login</h1>
            </div><br></br>
                <Sistema />
        </div>
    );
};

export default Login;