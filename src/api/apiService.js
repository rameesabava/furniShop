import axiosInstance from "./axiosInstance";

const apiService=async (httpMethod,url,reqBody)=>{
    const reqConfig = {
        method:httpMethod,
        url,        //key and value same, so write only key  
        data:reqBody
    }

    try{
        const response = await axiosInstance(reqConfig)
        return response
    }catch(err){
        throw err
    }
}

export default apiService