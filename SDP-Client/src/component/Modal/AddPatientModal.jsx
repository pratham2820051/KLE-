import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import "./Modal.scss";
import { ADD_PATIENT } from "../../utils/apiConstant";
import axios from "axios";
import toast from "react-hot-toast";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: var(--green);
  left: calc(50% - 75px);
  position: fixed;
  z-index: 2001;
`;

function AddPatientModal({
  showModal,
  setShowModal,
  data,
  setData,
  setTrigger,
  camp,
}) {
  const [name, setName] = useState();

  let [loading] = useState(false);
  let [color] = useState("#000000");

  useEffect(() => {
    if (data) {
      setName(data.name);
    }
  }, [data]);

  const handleUpdate = async () => {
    if (!camp || !camp[0] || !camp[0].locationId) {
      toast.error("Camp information is missing. Please select a camp first.");
      return;
    }

    const obj = {
      name: name,
      campId: camp[0].locationId,
      allocated: "no",
    };

    const auth = localStorage.getItem("auth");

    const headers = {
      Authorization: `Bearer ${auth}`,
    };

    try {
      const datum = await axios.post(
        ADD_PATIENT,
        { obj: obj },
        { headers: headers }
      );

      if (datum) {
        // setLoading(false)
        toast.success("Patient added successfully");
      }
    } catch (err) {
      // setLoading(false)

      toast.error("some error occured please try again");
      console.log(err);
    }
    closeModal();
  };

  const close = () => {
    setName();
    setData();
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
              <h2>Add Patient </h2>
              <button>
                <img src="./Assets/x.svg" alt="" />
              </button>
            </div>
            <hr />
            <div className="modal_body">
              <div className="row">
                <div className="col">
                  <label className="input-lebel">Name</label>
                  <input
                    type="text"
                    // value={status}
                    className="form-control"
                    placeholder="Enter the name"
                    onChange={(e) => setName(e.target.value)}
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
                      <input
                        type="submit"
                        value="Submit"
                        onClick={() => handleUpdate()}
                      />
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

export default AddPatientModal;
