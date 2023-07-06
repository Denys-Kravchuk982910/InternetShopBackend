import axios from "axios";
import { BACKEND_URL } from "../constants/default";




class AxiosService {

    setProduct = async (skipped) => {
        let result = await axios.get(BACKEND_URL + "api/product/get?skipped=" + skipped);
        return result;
    }

    setProductFilter = async (data) => {
        let result = await axios.post(BACKEND_URL + "api/product/getbyfilter", data);
        return result;
    }

    getProductCount = async () => {
        let result = await axios.get(BACKEND_URL + "api/product/count");
        return result;
    }

    getProductCountByFilter = async (data) => {
        let result = await axios.post(BACKEND_URL + "api/product/countbyfilter", data);
        return result;
    }

    getTop = async () => {
        let result = await axios.get(BACKEND_URL + "api/product/gettop");
        return result.data;
    }

    getInitFilters = async (id) => {
        let result = await axios.get(BACKEND_URL + "api/filter/get?getFilter=" + id);
        return result.data;
    }

    getProductById = async (id) => {
        let result = await axios.get(BACKEND_URL + "api/product/getbyid?id=" + id);
        return result.data;
    }

    pushOrder = async (values) => {
        let result = await axios.post(BACKEND_URL + "api/order/push", values);
        return result.data;
    }

    getSizes = async (id) => {
        
        let result = await axios.get(BACKEND_URL + "api/product/getsize?id=" + id);
        return result.data;
    }

    getUserInfo = async (token) => {
        let result = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
        return result.data;
    }

    isFeedback = async (email) => {
        let result = await axios.get(BACKEND_URL + "api/feedback/exist?email=" + email);
        return result.data;
    }

    addFeedback = async (obj) => {
        
        let result = await axios.post(BACKEND_URL + "api/feedback/add", obj);
        return result.data;
    }

    getFeedback = async () => {
        
        let result = await axios.get(BACKEND_URL + "api/feedback/get");
        return result.data;
    }

    updateFeedback = async (obj) => {
        let result = await axios.post(BACKEND_URL + "api/feedback/update", obj);
        return result.data;
    }

    getStories = async () => {
        let result = await axios.get(BACKEND_URL + "api/story/get");
        return result.data;
    }

    getPosts = async () => {
        let result = await axios.get(BACKEND_URL + "api/post/get");
        return result.data;
    }
}


export default new AxiosService();