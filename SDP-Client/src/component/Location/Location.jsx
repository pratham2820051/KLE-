import React, { useState, useEffect } from "react";
import { GET_LOCATIONS } from "../../utils/apiConstant";
import PatientModal from "../Modal/PatientModal";
import "./Location.scss";
import axios from "axios";

function Location({ setLoading, location, setTrigger }) {
  const [manufacturer, setManufacturer] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState();
  // const [trigger, setTrigger] = useState(false)

  const auth = localStorage.getItem("auth");

  const headers = {
    Authorization: `Bearer ${auth}`,
  };

  // const getData = async () => {
  //     setLoading(true)
  //     await axios.get(GET_LOCATIONS, {headers: headers})
  //         .then(res => {
  //             console.log(res)
  //             setManufacturer(res.data.data)
  //         })
  //         .catch(err => {
  //             console.log(err)
  //         })

  //         setLoading(false)
  // }

  // useEffect(() => {

  //     getData();

  // }, [trigger])

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div className="content">
      <PatientModal
        showModal={showModal}
        setShowModal={setShowModal}
        data={data}
        setData={setData}
        setTrigger={setTrigger}
      />
      <div className="header">
        <h4>Availiable Locations</h4>
        <button className="add-btn" onClick={openModal}>
          Add Location
        </button>
      </div>
      <div className="table-div">
        <table class="table">
          <thead className="table-header">
            <tr>
              <th scope="col">SNO.</th>
              {/* <th scope="col">ID</th> */}
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {location
              ? location.map((data, key) => {
                  return (
                    <tr>
                      <th scope="row">{key + 1}</th>
                      {/* <td>{data.id}</td>                             */}
                      <td>
                        <p>{data.name}</p>
                      </td>
                      <td>
                        <p>{data.address}</p>
                      </td>
                      <td>
                        <button
                          className="edit-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            setData(data);
                            openModal();
                          }}
                        >
                          <i class="bi bi-pencil-square"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Location;
