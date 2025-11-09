import { create } from "zustand";
import axios from "axios";
import useAuth from "./authStore";
const API=import.meta.env.VITE_API_URL;

const useTodos=create((set,get)=>({
    todos:[],
    loading:false,
    error:null,

    loadTodos:async()=>{
        set({loading:true,error:null});
        try {
            const token=get().getToken();
            const res=await axios.get(`${API}/todos`,{headers:{Authorization:`Bearer ${token}`}});
            set({todos:res.data,loading:false});
        } catch (err) {
            set({loading:false,error:err?.response?.data?.message || err.message});
        }
    },
    addTodo:async(text)=>{
        set({loading:true,error:null});
        try {
            const token=get().getToken();
            const res=await axios.post(`${API}/todos`,{text},{headers:{Authorization:`Bearer ${token}`}});
            set((state)=>({todos:[res.data,...state.todos],loading:false}));
        } catch (err) {
            set({loading:false,error:err?.response?.data?.message || err.message});
        }
    },
    toggleTodo:async(id,completed)=>{
        set({loading:true,error:null});
        try {
            const token=get().getToken();
            const res=await axios.put(`${API}/todos/${id}`,{completed},{headers:{Authorization:`Bearer ${token}`}});
            set((state)=>({todos:state.todos.map(t=>t._id===id?res.data:t),loading:false}));
        } catch (err) {
            set({loading:false,error:err?.response?.data?.message || err.message});
        }
    },
    deleteTodo:async(id)=>{
        set({loading:true,error:null});
        try {
            const token=get().getToken();
            await axios.delete(`${API}/todos/${id}`,{headers:{Authorization:`Bearer ${token}`}});
            set((state)=>({todos:state.todos.filter(t=>t._id!=id),loading:false}));
        } catch (err) {
            set({loading:false,error:err?.response?.data?.message || err.message});
        }
    },
    getToken:()=>{
        const auth=useAuth.getState();
        return auth.token;
    }
}))

export default useTodos;