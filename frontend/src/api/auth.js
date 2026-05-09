import axios from 'axios'

const API=axios.create({
    baseURL:'http://localhost:3000/api',
    withCredentials:true
})

export const loginUser=async(data)=>{
    
    const res=await API.post('/auth/login',data)
    return res
    
}

export const registerUser=(data)=>{
    API.post('/auth/register',data)
}

export const getMe=()=>{
    API.get('/auth/me');
}

// export const logoutUser=()=>{
//     API.post('/auth/logout')
// }