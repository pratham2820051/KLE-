import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import "./Modal.scss";
import axios from "axios";
import { ADD_FACULTY, GET_LOCATIONS } from "../../utils/apiConstant";
import toast from "react-hot-toast";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: var(--green);
  left: calc(50% - 75px);
  position: fixed;
  z-index: 2001;
`;

function CategoryModal({ showModal, setShowModal, data, setData, setTrigger }) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [role, setRole] = useState();

  const [locationId, setLocationId] = useState();

  let [loading] = useState(false);
  let [color] = useState("#000000");

  const auth = localStorage.getItem("auth");

  const headers = {
    Authorization: `Bearer ${auth}`,
  };


  //////////////////My code/////////////////

  const getCamps = async () => {
    try {
      const locRes = await axios.get(GET_LOCATIONS, { headers });
      if (locRes.data?.data?.length > 0) {
        setLocationId(locRes.data.data[0]._id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  ///////////////////End//////////////////

  useEffect(() => {
    if (data) {
      setName(data.name);
      setEmail(data.email);
      setPassword(data.password);
      setRole(data.role);
      setLocationId(data.locationId);
    }
  }, [data]);

  const handleSubmit = async () => {
    // console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiii");
    getCamps();
    console.log(locationId);
    if (!name || !email || !password) {
      toast.error("Please fill all the fields");
      return;
    }

    const obj = {
      name: name,
      email: email,
      password: password,
      role: role,
      locationId: locationId,
    };

    await axios
      .post(ADD_FACULTY, obj, { headers: headers })
      .then((res) => {
        console.log("Faculty addittion", res.data);
        toast.success("Faculty added successfully");
        setTrigger((prev) => !prev);
        closeModal();
      })
      .catch((err) => {
        console.log(err);
        toast.success("Faculty updated successfully");
      });
  };

  const handleUpdate = async () => {
    const obj = {
      name,
      email,
      password,
      role,
    };

    await axios
      .put(`${ADD_FACULTY}/${data.id}`, obj, { headers: headers })
      .then((res) => {
        toast.error("Some error occured");
        setTrigger((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
        toast.error("some error occured");
      });
  };

  const close = () => {
    setName();
    setEmail();
    setPassword();
    setRole();
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
        <div className="modal" onClick={closeModal}>
          <div className="modal_content" onClick={(e) => e.stopPropagation()}>
            <div className="modal_top">
              <h2>Add Counsellor</h2>
              <button onClick={closeModal}>✕</button>
            </div>
            <hr />
            <div className="modal_body">
              <div className="row">
                <div className="col">
                  <label className="input-lebel">Name</label>
                  <input
                    type="text"
                    value={name}
                    className="form-control"
                    placeholder="Enter the Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label className="input-lebel">Email</label>
                  <input
                    type="email"
                    value={email}
                    className="form-control"
                    placeholder="Enter the email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label className="input-lebel">Role</label>
                  <select
                    value={role}
                    class="form-select form-select-lg"
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">Please select</option>
                    <option value="faculty">Counsellor</option>
                    <option value="nurse">Nurse</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label className="input-lebel">Password</label>
                  <input
                    type="text"
                    value={password}
                    className="form-control"
                    placeholder="Enter the Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

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
        </div>
      ) : null}
    </>
  );
}

export default CategoryModal;
