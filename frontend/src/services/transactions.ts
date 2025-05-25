import axios from "axios"

const baseUrl = axios.create({
    baseURL:"http://localhost:4000/api/",
    withCredentials:true
});


// Creation of Transaction
export const createTranscation = async (data:any) => {
    const response = await baseUrl.post("create-transcation",data);
    return response.data;
}

// get Tranactions
export const getTranscation = async () => {
    const response = await baseUrl.get("get-transcation");
    return response.data;
}

// delete Tranactions
export const deleteTranscation = async (id:any) => {
    const response = await baseUrl.delete(`/delete-transcation/${id}`);
    return response.data;
}

// update Transaction
export const upadteTranscation = async ({id,data}:any) => {
    const response = await baseUrl.put(`/update-transcation/${id}`,data);
    return response.data;
}

// Budget

// create budget
export const createBudget = async (data:any) => {
    const response = await baseUrl.post(`/create-budget`,data);
    return response.data;
}

// get budget
export const getBudget = async () => {
    const response = await baseUrl.get(`/get-budget`);
    return response.data;
}
// update budget
export const updateBudget = async (data:any) => {
    const response = await baseUrl.put(`/update-budget`,data);
    return response.data;
}

export const deleteBudget = async (item:any) => {
    const response = await baseUrl.delete(`/delete-budget/${item}`,);
    return response.data;
}

export const getBudgetStats = async () => {
    const response = await baseUrl.get(`/get-budgetstats`);
    return response.data;
}
export const getTransactionOverview = async () => {
    const response = await baseUrl.get(`/get-transcation-overview`);
    return response.data;
}
export const getExpensenOverview = async () => {
    //   console.log("Fetching expenses overview...");
    const response = await baseUrl.get(`/get-expense-overview`);
    return response.data;
}