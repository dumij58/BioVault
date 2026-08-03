import { Env } from "../config/Env";
import { getAuthHeader } from "./authHeader";

const API_URL = Env.API_BASE_URL + "/storage-locations";

export const getStorageLocations = async () => {

    const response = await fetch(API_URL,{
        headers: getAuthHeader()
    });

    return response.json();
};

export const updateStorageLocation = async(id, location)=>{
    const response = await fetch(`${API_URL}/${id}`,{
        method:"PUT",
        headers:{
            ...getAuthHeader(),
            "Content-Type":"application/json"
        },
        body:JSON.stringify(location)
    });

    return response.json();
};

export const createStorageLocation = async(location)=>{

    const response = await fetch(API_URL,{
        method:"POST",
        headers: {
            ...getAuthHeader(),
            "Content-Type":"application/json"
        },
        body:JSON.stringify(location)
    });

    return response.json();

};



export const deleteStorageLocation = async(id)=>{

    await fetch(`${API_URL}/${id}`,{
        method:"DELETE",
        headers: getAuthHeader()
    });

};