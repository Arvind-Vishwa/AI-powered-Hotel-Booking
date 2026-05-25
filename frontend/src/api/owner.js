import axios from 'axios'

const API=axios.create({
    baseURL:'https://ai-powered-hotel-booking.onrender.com/api',
    withCredentials:true
})


export const fetchOwnerDashboard=async()=>{

    const res=await API.get('/owner')
    console.log(res)
    return res
}