import { useState } from "react";
import { UserContext } from "./UserContext.js";
import axios from "axios";

const url = process.env.REACT_APP_API_URL;


export default function UserProvider({ children }) {
    const userFromSessionStorage= sessionStorage.getItem('user');
    const [user, setUser] = useState(userFromSessionStorage ? JSON.parse(userFromSessionStorage) :{email:'', password:''});
console.log(user);
    const signUp = async () => {
        const json = JSON.stringify(user);
        const headers = {headers: {'Content-Type': 'application/json'}};
        try {
            await axios.post (url+'/user/register', json, headers).then(response => {
                console.log(response.data)
            });
            // setUser({email:'', password:''});
        } catch (error) {
            throw error
            
        }
    }


 const signIn = async () => {
    const json = JSON.stringify(user);
    const headers = {headers: {'Content-Type': 'application/json'}};
    try {
        await axios.post(url+'/user/login', json, headers).then(response => {
            console.log(response.data)
            const token = response.data.token;
            console.log(token)
            setUser(response.data)
            sessionStorage.setItem('user', JSON.stringify(response.data));
        });
    } catch (error) {
        console.error('Login error', error.response? error.response.data.error : error);
        setUser({email:'', password:''});
        throw error;
    }
  }

 



 return (
    <UserContext.Provider value = {{user, setUser, signUp, signIn}}>
        {children}
    </UserContext.Provider>
  )
}


