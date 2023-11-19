import { backendUrl } from "./src/Components/config";

export const addUser = async (userData)=>{
    const response =await fetch(
        `${backendUrl}/auth/addtask`,
    {
        method:'put',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(userData)
            }

    );
    const user= await response.json();

    return user;
}