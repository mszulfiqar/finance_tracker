import axios from "axios"

const axiosInstance = axios.create({
    baseURL:"http://localhost:4000/api/",
    withCredentials:true
});

export const getTranscation = async () => {
    const response = await axiosInstance.get("get-transcation");
    return response.data;
}