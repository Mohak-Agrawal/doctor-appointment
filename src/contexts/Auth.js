import React, { useState, useEffect, useContext } from "react";
import { auth, database } from "../firebase.js";
import firebase from "firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");
  const [userDetails, setUserDetails] = useState(null);

  function signup(email, password, name, prename, address, tel, role) {
    const db = firebase.firestore();
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then(function (res) {
        var user = firebase.auth().currentUser;
        var valueUid = user.uid;
        db.collection("users")
          .doc(valueUid)
          .set({
            uid: valueUid,
            name: name,
            prename: prename,
            address: address,
            tel: tel,
            email: email,
            password: password,
            role: role,
          })
          .catch(function (error) {
            console.log(error.message);
            console.log(error.code);
          });
      });
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(auth?.currentUser?.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log("User data: ", documentSnapshot.data());
          setUserDetails(documentSnapshot.data());
        }
      });
  }, [auth?.currentUser]);

  // useEffect(() => {
  //   database
  //     .ref("users/" + auth?.currentUser?.uid)
  //     .once("value")
  //     .then((snapshot) => {
  //       const data = snapshot.val();
  //       console.log({ data });
  //       setRole(data?.role);
  //     });
  // }, [auth?.currentUser]);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    role,
    userDetails,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
