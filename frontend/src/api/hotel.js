import axios from 'axios'

const API=axios.create({
    baseURL:'https://ai-powered-hotel-booking.onrender.com/api/hotel',
    withCredentials:true
})

export const createHotel = async(data) => {
    const res=await API.post("/create", data)
    console.log(res)
    return res;    
};
export const getHotels = async() => {
    const res=await API.get("/getHotel")
    console.log(res)
    return res;

};
export const bookHotel = async (
    hotelId,
    payload
  ) => {
  
    const res = await API.post(
      `/book/${hotelId}`,
      payload
    );
  
    return res.data;
  };

  export const listing=async()=>{
    const res=await API.get('/listing')
    return res;
}

