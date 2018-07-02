import Vue from "vue"
import axios from "axios"
console.log(process.env.NODE_ENV)

const testUrl = "http://169.254.165.188:3000"

const onlineUrl = "http://169.254.165.188:3000"|| 'http:m.jd.com'
let httpInstance = axios.create({
    header:{ 
        "Content-Type":"application/json"
        //"Content-Type":"application/x-www-fprm-urlencoded"
    },
    baseURL:process.env.NODE_ENV === "development"?testUrl:onlineUrl
})

httpInstance.interceptors.request.use((config) => {
    
    return config
}, (err) => {
    console.log()
})

httpInstance.interceptors.response.use((response) => {
    if(response.status === 200){
        return response.data
    }else{
        return response
    }
})

const anotherInstance = axios.create({})
export {httpInstance,anotherInstance}

export default{
    install(Vue) {
        Object.defineProperty(Vue.prototype, "$http", {
            value: httpInstance
        })
    }
}