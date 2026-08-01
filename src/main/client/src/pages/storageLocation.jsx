import { useEffect, useState } from "react";
import {
    getStorageLocations,
    createStorageLocation,
    deleteStorageLocation
} from "../service/storageLocationService";

function StorageLocation({onGoHome}) {
    const [showLocations,setShowLocations] = useState(false);
    const [locations, setLocations] = useState([]);

    const [formData, setFormData] = useState({
        storageId: "",
        building: "",
        laboratory: "",
        freezerNumber: "",
        shelf: "",
        box: ""
    });

    const [editId, setEditId] = useState(null);


    // Load data
    const loadLocations = async () => {
        const data = await getStorageLocations();
        setLocations(data);
    };


    useEffect(() => {
        loadLocations();
    }, []);



    // Input changes
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };



    // Add / Update
    const handleSubmit = async (e) => {

        e.preventDefault();


        if(editId){

            await fetch(
                `http://localhost:8080/api/storage-locations/${editId}`,
                {
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(formData)
                }
            );


        }
        else{

            await createStorageLocation(formData);

        }


        setFormData({
            storageId:"",
            building:"",
            laboratory:"",
            freezerNumber:"",
            shelf:"",
            box:""
        });


        setEditId(null);

        loadLocations();

    };





    // Edit button
    const handleEdit = (location)=>{

        setEditId(location.id);


        setFormData({

            storageId: location.storageId || "",
            building: location.building || "",
            laboratory: location.laboratory || "",
            freezerNumber: location.freezerNumber || "",
            shelf: location.shelf || "",
            box: location.box || ""

        });

    };




    // Delete button
    const handleDelete = async(id)=>{

        await deleteStorageLocation(id);

        loadLocations();

    };




    return (

        <div>
            <button onClick={onGoHome}>
                Back to Home
            </button>

            <h1>
                Storage Location Management
            </h1>

            <button onClick={()=>setShowLocations(true)}>
                View Storage Locations
            </button>

            <form onSubmit={handleSubmit}>


                <input
                    name="storageId"
                    placeholder="Storage ID"
                    value={formData.storageId}
                    onChange={handleChange}
                />


                <input
                    name="building"
                    placeholder="Building"
                    value={formData.building}
                    onChange={handleChange}
                />


                <input
                    name="laboratory"
                    placeholder="Laboratory"
                    value={formData.laboratory}
                    onChange={handleChange}
                />


                <input
                    name="freezerNumber"
                    placeholder="Freezer Number"
                    value={formData.freezerNumber}
                    onChange={handleChange}
                />


                <input
                    name="shelf"
                    placeholder="Shelf"
                    value={formData.shelf}
                    onChange={handleChange}
                />


                <input
                    name="box"
                    placeholder="Box"
                    value={formData.box}
                    onChange={handleChange}
                />


                <button type="submit">

                    {editId ? "Update Storage Location" : "Add Storage Location"}

                </button>


            </form>




            <h2>
                Existing Storage Locations
            </h2>



            {
                showLocations && locations.map((location)=>(


                    <div key={location.id}>


                        <p>
                            Storage ID: {location.storageId}
                        </p>

                        <p>
                            Building: {location.building}
                        </p>

                        <p>
                            Laboratory: {location.laboratory}
                        </p>

                        <p>
                            Freezer: {location.freezerNumber}
                        </p>

                        <p>
                            Shelf: {location.shelf}
                        </p>

                        <p>
                            Box: {location.box}
                        </p>



                        <button
                            onClick={()=>handleEdit(location)}
                        >
                            Edit
                        </button>



                        <button
                            onClick={()=>handleDelete(location.id)}
                        >
                            Delete
                        </button>


                        <hr/>


                    </div>


                ))
            }



        </div>


    );

}


export default StorageLocation;