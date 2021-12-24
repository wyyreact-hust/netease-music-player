import axios, { AxiosRequestConfig, ResponseType, AxiosInstance } from "axios";
import { Snackbar } from "@mui/material";
import { SERVER } from '../constants/server'

const TIMEOUT = 40000
const MIME_TYPE: IDictionary<ResponseType> = {
  JSON: 'json',
}
const createInstance = () => {
    const instance = axios.create({
      baseURL: SERVER,
      withCredentials: true, //表示发送请求时附带cookie
      timeout: TIMEOUT,
      responseType: MIME_TYPE.JSON, //以json格式发送查询返回值
    })
    //由axios拦截response请求并调用对应函数处理
    instance.interceptors.response.use(handleResponse, handleError)
    return instance
}

const handleResponse = (response: any) => {
    return response.data
}
const handleError = (error: any) => {
    const { response, message } = error
    return Promise.reject(response ? new Error(response.data.message || message) : error)
}

const toastError = (error: any) => {
    const { response, message } = error;
    console.error(error);
    //这里没有实现用mui控件报错
    window.alert(response?.data?.message || message);
    return Promise.reject(error);
}
//定义axios实例类型
interface Instance extends AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>
}
export const requestWithoutErrorToast: Instance = createInstance()

const request: Instance = createInstance()
request.interceptors.response.use(undefined, toastError)

export default request
  