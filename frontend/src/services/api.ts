import axios from "axios"

const baseUrl = axios.create({
    baseURL:"http://localhost:4000/api/",
    withCredentials:true
});

export const createTranscation = async (data:any) => {
    const response = await baseUrl.post("create-transcation",data);
    return response.data;
}
export const getTranscation = async () => {
    const response = await baseUrl.get("get-transcation");
    return response.data;
}