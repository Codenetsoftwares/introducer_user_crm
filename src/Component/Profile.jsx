import React, { useState, useEffect } from "react";
import { useAuth } from "../Utils/Auth";
import verify from "../Assets/verify.png";
import "./Profile.css";
import Add from "../Assets/Addd.png";
import Edit from "../Assets/editt.png";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import ModalBank from "./ModalBank";
import AccountsService from "../Services/AccountsService";
import ModalBankView from "./ModalBankView";

const Profile = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const id = auth.user.id;
  console.log("This is Auth=>", auth);
  const [userAuth, setUserAuth] = useState([]);
  const [profiledata, setProfiledata] = useState([]);
  const [FoundObject, setFoundObject] = useState([]);

  const handleLogout = () => {
    const response = true;
    if (response) {
      alert("You are going to Logout from this site");
      auth.logout();
      navigate("/");
    }
  };

  useEffect(() => {
    AccountsService.getprofile(auth.user).then((res) =>
      setProfiledata(res.data)
    );
  }, [auth, id]);
  console.log("This is Profile Data =>>>", profiledata);

  // useEffect(() => {
  //   AccountsService.getprofile(auth.user)
  //     .then((res) => {
  //       setProfiledata(res.data);

  //       const userWithId = res.data.find((user) => user._id === id);

  //       setFoundObject(userWithId);
  //     })
  //     .catch((error) => {
  //       // Handle error
  //       console.error("Error fetching user data:", error);
  //     });
  // }, [auth, id]);

  // console.log("This is profile data ==>>>", profiledata);
  const handeleditprofile = () => {
    navigate(`/editprofile/${profiledata._id}`);
  };
  return (
    <div
      style={{
        backgroundImage:
          " linear-gradient(90deg, rgba(236,208,146,1) 0%, rgba(252,255,131,0.9500175070028011) 50%, rgba(236,208,146,1) 100%)",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <section className="mt-5 pt-5">
        <div className="container py-5">
          <div className="row">
            <div className="col">
              <nav
                aria-label="breadcrumb"
                className="bg-light rounded-3 p-3 mb-4"
              >
                <ul className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <a href="#">
                      <b>Your Profile</b>
                    </a>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/transaction">
                      <b>Your Transactions</b>
                    </Link>
                  </li>
                  {/* <li className="breadcrumb-item active" aria-current="page">
                    Log Out
                  </li> */}
                </ul>
              </nav>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4" style={{ height: "31.8rem" }}>
                <div className="card-body text-center">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle img-fluid"
                    style={{ width: "150px" }}
                  />
                  <h5 className="my-3 pt-3">Hi!&nbsp;{profiledata.firstname}</h5>
                  <p className="text-muted mb-1 pt-3">{profiledata.email}</p>
                  <p className="text-muted mb-4 ">
                    <img
                      src={verify}
                      style={{
                        width: "20px",
                        border: "2px #20b1f5",
                        borderRadius: "15px",
                      }}
                    />
                    &nbsp;Verified By Happy Wave
                  </p>
                  <div className="d-flex justify-content-center mb-2 pt-3">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>

                    {/* <button
                      type="button"
                      className="btn btn-outline-primary ms-1"
                      onClick={handeleditprofile}
                    >
                      <small>Edit Profile</small>
                    </button> */}

                  </div>
                </div>
              </div>
              {/* ... Other content ... */}
            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <p>
                    <h6>
                      Name:&nbsp;{profiledata.firstname}&nbsp;
                      {profiledata.lastname}{" "}
                    </h6>
                    <br />
                    <h6>Introducer Id:&nbsp;{profiledata.introducerId}</h6>
                    <br />
                    <div className="d-flex flex-row">
                      {/* <h6>
                        Payment Info:&nbsp;
                        <button
                          style={{
                            border: "none",
                            backgroundColor: "white",
                            color: "blue",
                          }}
                          data-bs-toggle="modal"
                          data-bs-target="#modalbkview"
                        >
                          Click Here
                        </button>
                      </h6> */}
                      <h6>Introducer Percentage:&nbsp;{profiledata.introducerPercentage}</h6>
                    </div>
                    <br />
                    {/* {profiledata.webSiteDetail &&
                      profiledata.webSiteDetail.length > 0 ? (
                      <div className="d-flex flex-row">
                        <h6>
                          Website Info:&nbsp;
                          {`${profiledata.webSiteDetail}`}
                        </h6>
                      </div>
                    ) : null} */}
                    {/* <br /> */}
                    <h6>wallet: &nbsp;{profiledata.wallet}</h6>
                    <br />
                    <h6>Role: &nbsp;{profiledata.role}</h6>
                  </p>
                </div>
              </div>
              {/* <div className="row">
                <div className="col-md-6">
                  <div className="card mb-4 mb-md-0">
                    <div className="card-body">
                      <p className="d-flex justify-content-center">
                        <h6>Add Payment Deatils</h6>{" "}
                      </p>
                      <p className="d-flex justify-content-center">
                        <button
                          style={{ border: "none", backgroundColor: "white" }}
                          data-bs-toggle="modal"
                          data-bs-target="#modalbk"
                        >
                          <img
                            className="img"
                            src={Add}
                            style={{
                              width: "55px",
                              filter: "brightness(1.2) contrast(1.3)",
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.transform = "scale(1.4)";
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.transform = "scale(1)";
                            }}
                          />
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card mb-4 mb-md-0">
                    <div className="card-body">
                      <p className="d-flex justify-content-center">
                        <h6>Add Website Deatils</h6>
                      </p>
                      <p className="d-flex justify-content-center">
                        <button
                          style={{ border: "none", backgroundColor: "white" }}
                          data-bs-toggle="modal"
                          data-bs-target="#modalweb"
                        >
                          <img
                            className="img"
                            src={Add}
                            style={{
                              width: "55px",
                              filter: "brightness(1.2) contrast(1.3)",
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.transform = "scale(1.4)";
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.transform = "scale(1)";
                            }}
                          />
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
      <ModalBankView />
      <Modal />
      <ModalBank />
    </div>
  );
};

export default Profile;
