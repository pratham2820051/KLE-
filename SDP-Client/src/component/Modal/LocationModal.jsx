import React, { useState, useEffect } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import "./Modal.scss"
import { ADD_LOCATION, ADD_LOCATIONS } from '../../utils/apiConstant';
import axios from "axios"
import cogoToast from 'cogo-toast';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: var(--green);
  left: calc(50% - 75px);
  position: fixed;
  z-index: 2001;
`;

function ManufacturerModal({ showModal, setShowModal, data, setData, setTrigger }) {


    const [id, setId] = useState();
    const [name, setName] = useState();
    const [address, setAddress] = useState();

    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#000000");


    useEffect(() => {

        if (data) {
            setId(data._id)
            setName(data.name)
            setAddress(data.address)
        }

    }, [data])


    const handleSubmit = async () => {

        if(!name || !address){
            cogoToast.error("please fill all the fields")
            return;
        }

        const obj = {
            id: id,
            name: name,
            address: address,
        }

        const auth = localStorage.getItem("auth");

        const headers = {
            "Authorization": `Bearer ${auth}`
        }

        await axios.post(ADD_LOCATIONS, obj, {headers: headers})
            .then(res => {
                console.log(res.data);
                setTrigger(prev => !prev)
                cogoToast.success("Location added successfully!")
                closeModal()

            })
            .catch(err => {
                console.log(err);
            })
    }


    const handleUpdate = async () => {

        const obj = {
            name: name,
            address: address,
        }
        const auth = localStorage.getItem("auth");

        const headers = {
            "Authorization": `Bearer ${auth}`
        }


        await axios.put(`${ADD_LOCATIONS}/${data._id}`, obj, {headers: headers})
            .then(res => {
                console.log(res.data);
                cogoToast.success("Location Updated Successfully")
                setTrigger(prev => !prev)
                closeModal()
            })
            .catch(err => {
                console.log(err);
            })
    }



    const close = () => {
        setName();
        setAddress();
    }


    const closeModal = () => {

        close()
        setShowModal(prev => !prev)
        setData("")

    }


    return (
        <>
            <>{loading ?
                <div className='loader'>
                    <ClipLoader color={color} loading={true} css={override} size={150} /> </div> : null}</>
            {showModal ? <>

                <div className="modal" >
                </div>
                <div className="modal_content">
                    <div className="modal_top">
                        <h2>Add LOCATION</h2>
                        <button  ><img src="./Assets/x.svg" alt="" /></button>
                    </div>
                    <hr />
                    <div className="modal_body">


                        <div className="row">
                            <div className="col">
                                <label className="input-lebel">
                                    Name
                                </label>
                                <input type="text" value={name} className="form-control" placeholder="Enter the name" onChange={(e) => setName(e.target.value)} />
                            </div>
                        </div>



                        <div className="row">
                            <div className="col">
                                <label className="input-lebel">
                                    Address
                                </label>
                                <input type="text" value={address} className="form-control" placeholder="Enter the Address" onChange={(e) => setAddress(e.target.value)} />
                            </div>
                        </div>


                        <div className="row">
                            <div className="col"></div>
                            <div className="col">
                                <div className="form_buttons">
                                    <button className="btn btn-primary" onClick={() => closeModal()} >Cancel</button>

                                    {data ? <input type="submit" value="update" onClick={() => handleUpdate()} /> : <input type="submit" onClick={() => handleSubmit()} />}

                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </> : null}

        </>
    )
}

export default ManufacturerModal