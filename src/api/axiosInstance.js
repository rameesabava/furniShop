import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"https://furnishop-server.onrender.com",
    timeout:5000
})

// response interceptors
axiosInstance.interceptors.response.use(
    (response)=>{
        console.log("Response received!!!");
        return response
        
    },
    (error)=>{
        if(error.response){
            const status=error.response.status
            if(status==401){
                console.log("Unauthorised Access - Redirect to Login!!");
                
            }else if(status==404){
                console.log("API not found!!");
                
            }else if(status==500){
                console.log("Server error!!");
                
            }else if(error.request){
                console.log("No response from server");
                
            }else{
                console.log("Error : "+error.message);
                
            }
            return Promise.reject(error)
        }
    }
)

export default axiosInstance