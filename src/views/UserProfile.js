import React from "react";
import { Alert } from "react-bootstrap";
import "../assets/css/dashboard.css";
import { database, auth } from "../firebase";
import user from "../assets/img/user.png";
import firebase from "firebase";
import { useState } from "react";
import { useAuth } from "../contexts/Auth";

const UserProfile = () => {
  const { logout, userDetails } = useAuth();
  const [userData, setuserData] = useState({ ...userDetails });
  const [userImage, setuserImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("password");
  const [visible, setVisible] = useState("false");
  // constructor(props) {
  //   super(props);

  //   state = {
  //     users: {
  //       name: "",
  //       prename: "",
  //       address: "",
  //       tel: "",
  //       uid: "",
  //       password: "",
  //       email: "",
  //     },
  //     image: "",
  //     error: "",
  //     loading: false,
  //     type: "password",
  //     visible: "false",
  //   };
  //   handleSubmit = handleSubmit.bind(this);
  //   handleImageChange = handleImageChange.bind(this);
  // }

  const handleImageChange = (e) => {
    setuserImage(URL.createObjectURL(e.target.files[0]));
  };

  const showHide = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setType(type === "text" ? "password" : "text");
  };

  // componentDidMount() {
  //   mapUserDetailsToState();
  // }

  // mapUserDetailsToState() {
  //   firebase
  //     .firestore()
  //     .collection("users")
  //     .doc(auth.currentUser.uid)
  //     .then((documentSnapshot) => {
  //       if (documentSnapshot.exists) {
  //         const data = documentSnapshot.data();
  //         setState({
  //           users: {
  //             name: data.name,
  //             prename: data.prename,
  //             address: data.address,
  //             tel: data.tel,
  //             uid: auth.currentUser.uid,
  //             password: data.password,
  //             email: data.email,
  //           },
  //           image: data.image,
  //         });
  //       }
  //     });
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    const userRef = database.ref("users/" + auth.currentUser.uid);

    userRef.set({
      name: userData.name ? userData.name : "",
      prename: userData.prename ? userData.prename : "",
      address: userData.address ? userData.address : "",
      tel: userData.tel ? userData.tel : "",
      uid: userData.uid ? userData.uid : "",
      password: userData.password ? userData.password : "",
      email: userData.email ? userData.email : "",
      image: userImage ? userImage : user,
    });
    try {
      setError("");
      setLoading(true);

      alert("Profile Updated successfully");
    } catch {
      setError("Failed to Log in");
    }

    setLoading(false);
  };

  return (
    <div className="content">
      <div className="col">
        <div className="row">
          <div className="col mb-3">
            <div className="card">
              <div className="card-body">
                <div className="e-profile">
                  {error && <Alert variant="danger">{error}</Alert>}
                  <div className="row">
                    <div className="col-12 col-sm-auto mb-3">
                      <div className="mx-auto" style={{ width: "140px" }}>
                        <div className="d-flex justify-content-center align-items-center rounded">
                          <img
                            src={userImage ? userImage : user}
                            style={{
                              width: "140px",
                              height: "140px",
                              borderRadius: "50%",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                      <div className="text-center text-sm-left mb-2 mb-sm-0">
                        <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">
                          <span style={{ color: "#9368E9" }}>
                            {userData.prename} {userData.name}
                          </span>
                        </h4>
                        <p className="mb-0">
                          <span> {userData.email} </span>
                        </p>
                        <div className="mt-2">
                          <span
                            className="file-input btn btn-primary btn-file"
                            style={{ cursor: "pointer" }}
                          >
                            <input
                              accept="image/*"
                              type="file"
                              id="image_file"
                              name="image"
                              onChange={handleImageChange}
                            />
                            browse
                          </span>
                        </div>
                      </div>
                      <div className="text-center text-sm-right">
                        <div className="text-muted">
                          <small>
                            Joined {auth.currentUser.metadata.creationTime}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ul className="nav nav-tabs">
                    <li className="nav-item">
                      <a
                        className="active nav-link"
                        style={{ color: "#9368E9" }}
                      >
                        Settings
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content pt-3">
                    <div className="tab-pane active">
                      <form className="form" noValidate onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col">
                            <div className="row">
                              <div className="col">
                                <div className="form-group">
                                  <label>First Name</label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="name"
                                    placeholder="Smith"
                                    value={userData.prename}
                                    onChange={(e) => {
                                      var users = { ...userData };
                                      users.prename = e.target.value;

                                      setuserData(users);
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="col">
                                <div className="form-group">
                                  <label>Last Name</label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="prename"
                                    placeholder="john"
                                    value={userData.name}
                                    onChange={(e) => {
                                      var users = { ...userData };
                                      users.name = e.target.value;
                                      setuserData(users);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col">
                                <div className="form-group">
                                  <label>Address</label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="address"
                                    placeholder="Ain Chock, Casablanca"
                                    value={userData.address}
                                    onChange={(e) => {
                                      var users = { ...userData };
                                      users.address = e.target.value;
                                      setuserData(users);
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="col">
                                <div className="form-group">
                                  <label>Phone Number</label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="numTel"
                                    placeholder="+1-202-555-0155"
                                    value={userData.tel}
                                    onChange={(e) => {
                                      var users = { ...userData };
                                      users.tel = e.target.value;
                                      setuserData(users);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col">
                                <div className="form-group">
                                  <label>Email</label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    placeholder="user@example.com"
                                    value={userData.email}
                                    readOnly
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 col-sm-6 mb-3">
                            <div className="row">
                              <div className="col">
                                <div className="form-group password">
                                  <label>Current Password</label>
                                  <input
                                    className="form-control input-fields"
                                    type={type}
                                    placeholder="••••••"
                                    // ref={passwordRef}
                                    defaultValue={userData.password}
                                    onChange={(e) => {
                                      var users = { ...userData };
                                      users.password = e.target.value;

                                      setuserData(users);
                                    }}
                                    readOnly
                                  />
                                  <i
                                    onClick={showHide}
                                    className={
                                      type === "password"
                                        ? "fa fa-eye-slash icon"
                                        : "fa fa-eye icon"
                                    }
                                  ></i>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-sm-5 offset-sm-1 mb-3"></div>
                        </div>
                        <div className="row">
                          <div className="col d-flex justify-content-end">
                            <button className="btn btn-primary" type="submit">
                              Save Changes
                            </button>
                            <a
                              className="btn btn-danger"
                              href="/profile"
                              style={{ marginLeft: "10px" }}
                            >
                              Cancel
                            </a>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
