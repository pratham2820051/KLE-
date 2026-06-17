import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import "./Modal.scss";
import {
  ADD_CAMP,
  GET_FACULTY,
  GET_LOCATIONS,
  HEADERS,
} from "../../utils/apiConstant";
import axios from "axios";
import Select from "react-select";
import cogoToast from "cogo-toast";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: var(--green);
  left: calc(50% - 75px);
  position: fixed;
  z-index: 2001;
`;

function ProductModal({
  showModal,
  setShowModal,
  data,
  setData,
  setTrigger,
  location,
  faculty,
}) {
  const [name, setName] = useState();
  const [locationItem, setLocationItem] = useState(null);
  const [facultyItem, setFacultyItem] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#000000");
  const [selectedFaculty, setSelectedFaculty] = useState([]);

  const auth = localStorage.getItem("auth");

  const headers = {
    Authorization: `Bearer ${auth}`,
  };

  const handleSubmit = async () => {
    if (!name || !facultyItem) {
      cogoToast.error("Please enter all the field!");
      return;
    }

    const obj = {
      name: name,
      // locationId: locationItem,
    };

    var arr2 = [];

    for (var j of facultyItem) {
      arr2.push(j.value);
    }

    obj.faculty = arr2;
    obj.startDate = startDate;
    // obj.endDate = endDate;

    await axios
      .post(ADD_CAMP, obj, { headers: headers })
      .then((res) => {
        console.log(res.data);
        cogoToast.success("Camp Added successfully");
        setTrigger((prev) => !prev);
        closeModal();
      })
      .catch((err) => {
        cogoToast.error("Some error occured");
        console.log(err);
      });
  };

  useEffect(() => {
    if (data) {
      console.log(data);
      setName(data.name);
      setEndDate(data.endDate);
      setStartDate(data.startDate);
      setLocationItem(data.locationId);
      setSelectedFaculty(data.faculty);
    }
  }, [data]);

  const handleUpdate = async () => {
    const obj = {
      name: name,
      locationId: locationItem,
      startDate: startDate,
      endDate: endDate,
      faculty: facultyItem
        ? facultyItem?.map((dat) => dat.value)
        : selectedFaculty,
    };

    await axios
      .put(`${ADD_CAMP}/${data._id}`, obj, { headers: headers })
      .then((res) => {
        console.log(res.data);
        cogoToast.success("camp updated successfully");
        setTrigger((prev) => !prev);
        closeModal();
      })
      .catch((err) => {
        console.log(err);
        cogoToast.error("some error occured");
      });
  };

  const close = () => {
    setName();
    setFacultyItem();
    setLocationItem();
    setEndDate();
    setStartDate();
    setData("");
  };

  const closeModal = () => {
    close();
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <>
        {loading ? (
          <div className="loader">
            <ClipLoader
              color={color}
              loading={true}
              css={override}
              size={150}
            />{" "}
          </div>
        ) : null}
      </>
      {showModal ? (
        <>
          <div className="modal"></div>
          <div className="modal_content">
            <div className="modal_top">
              <h2>Add Camp </h2>
              <button>
                <img src="./Assets/x.svg" alt="" />
              </button>
            </div>
            <hr />
            <div className="modal_body">
              <div className="row">
                {/* <div className="col">
                  <label class="input-lebel" for="">
                    Location
                  </label>
                  <select
                    class="form-select form-select-lg"
                    id="year"
                    value={locationItem}
                    onChange={(e) => setLocationItem(e.target.value)}
                  >
                    <option>Please select a Location</option>
                    {location &&
                      location.map((data, key) => {
                        return (
                          <option key={key} value={data._id}>
                            {data.name}
                          </option>
                        );
                      })}
                  </select>
                </div> */}
              </div>

              <div className="row">
                <div className="col">
                  <label class="input-lebel" for="">
                    Faculty
                  </label>
                  <Select
                    closeMenuOnSelect={false}
                    isMulti
                    options={faculty}
                    // value={facultyItem}
                    defaultValue={faculty.map((data) =>
                      selectedFaculty?.includes(data.value) ? data : null
                    )}
                    onChange={(e) => setFacultyItem(e)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label className="input-lebel">Patient Name</label>
                  <input
                    type="text"
                    value={name}
                    className="form-control"
                    placeholder="Enter the name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label className="input-lebel">Start Date</label>
                  <input
                    type="date"
                    value={startDate?.split("T")[0]}
                    className="form-control"
                    placeholder="Enter the End Date"
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
              </div>

              {/* <div className="row">
                <div className="col">
                  <label className="input-lebel">End Date</label>
                  <input
                    type="date"
                    value={endDate?.split("T")[0]}
                    className="form-control"
                    placeholder="Enter the End Date"
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div> */}

              <div className="row">
                <div className="col"></div>
                <div className="col">
                  <div className="form_buttons">
                    <button
                      className="btn btn-primary"
                      onClick={() => closeModal()}
                    >
                      Cancel
                    </button>

                    {data ? (
                      <input
                        type="submit"
                        value="update"
                        onClick={() => handleUpdate()}
                      />
                    ) : (
                      <input type="submit" onClick={() => handleSubmit()} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default ProductModal;
