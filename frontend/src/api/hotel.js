import axios from 'axios'

const API=axios.create({
    baseURL:'http://localhost:3000/api/hotel',
    withCredentials:true
})

export const createHotel = async(data) => {
    const res=await API.post("/create", data)
    return res;    
};
export const getHotels = async() => {
    const res=await API.get("/getHotel")
    
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

