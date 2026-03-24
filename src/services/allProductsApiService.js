import apiService from "../api/apiService"

//get products api called by Products component
export const getAllProductsAPI = async () => {
    return await apiService("GET", "/products", {})
}

//get product api called by ProductView component
export const getProductAPI = async (id) => {
    return await apiService("GET", `/products/${id}`, {})
}

//add order called by Order component
export const addOrderAPI = async (data) => {
    return await apiService("POST", "/orders", data)
}