import axios from "axios";
import { create } from "zustand";
const API=import.meta.env.VITE_API_URL;
// Zustand provides global state which means we can access token and user anywhere in the app by using useAuth fn
const useAuth=create((set)=>({
    token:localStorage.getItem('token') || null,
    user:localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null,
    loading:false,
    error:null,
    setAuth:(user,token)=>{
        localStorage.setItem('token',token);
        localStorage.setItem('user',JSON.stringify(user));
        set({user,token,error:null});
    },
    logout:(user,token)=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({user:null,token:null});
    },
    register:async(name,email,password)=>{
        set({loading:true,error:null}); // For loading spinners and disabling buttons
        try {
            const res=await axios.post(`${API}/users/register`,{name,email,password});
            set({loading:false});
            const {token,name:n,email:e,_id}=res.data;
            const user={name:n,email:e,_id};
            useAuth.getState().setAuth(user,token);
            return {ok:true};
        } catch (err) {
            const msg=err?.response?.data?.message || err.message;
            set({loading:false,error:msg});
            return {ok:false,error:msg};
        }
    },
    login:async(email,password)=>{
        set({loading:true,error:null});
        try {
            const res=await axios.post(`${API}/users/login`,{email,password});
            set({loading:false});
            const {token,name:n,email:e,_id}=res.data;
            const user={name:n,email:e,_id};
            useAuth.getState().setAuth(user,token);
            return {ok:true};
        } catch (err) {
            const msg=err?.response?.data?.message || err.message;
            set({loading:false,error:msg});
            return {ok:false,error:msg};
        }
    }
}))

export default useAuth;