import { UserDetails } from "../../../../Server/controller/user.controller"; 


export const baseURL="http://localhost:5000";
const SummaryApi={
    register:{
        url:`/api/user/register`,
        method:"POST"
    },
    UserDetails:{
        url:`/api/user/details`,
        method:"GET"
    }
}
export default SummaryApi

