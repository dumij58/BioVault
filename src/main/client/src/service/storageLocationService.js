const API_URL = "http://localhost:8080/api/storage-locations";


const authHeader = {
    "Authorization": "Basic " + btoa("admin:admin123"),
    "Content-Type": "application/json"
};



export const getStorageLocations = async () => {

    const response = await fetch(API_URL,{
        headers: authHeader
    });

    return response.json();
};

export const updateStorageLocation = async(id, location)=>{
    const response = await fetch(`${API_URL}/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(location)
    });

    return response.json();
};

export const createStorageLocation = async(location)=>{

    const response = await fetch(API_URL,{
        method:"POST",
        headers: authHeader,
        body:JSON.stringify(location)
    });

    return response.json();

};



export const deleteStorageLocation = async(id)=>{

    await fetch(`${API_URL}/${id}`,{
        method:"DELETE",
        headers:authHeader
    });

};