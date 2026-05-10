import axios from 'axios'

const API=axios.create({
    baseURL:'http://localhost:3000/api',
    withCredentials:true
})

export const loginUser=async(data)=>{
    
    const res=await API.post('/auth/login',data)
    console.log(res)
    return res
    
}

export const registerUser=async(data)=>{
    const res=await API.post('/auth/register',data)
    // console.log(res.data.user)
    return res;
}

export const getMe=async()=>{
    const res=await API.get('/auth/me');
    return res;
}

export const logoutUser=async()=>{
    const res=await API.post('/auth/logout');
    return res;
}

