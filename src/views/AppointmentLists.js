import React, { useEffect, useState } from "react";
import "../index.css";
import { database, auth } from "../firebase";
import firebase from "firebase";

const MyReservations = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const subscriber = firebase
      .firestore()
      .collection("appointments")
      .where("docId", "==", auth.currentUser.uid)
      // .orderBy("start", "asc")
      .onSnapshot((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((documentSnapshot) => {
          list.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setEvents(list);
        console.log({ list });
      });

    return () => subscriber();
  }, []);

  return (
    <div className="content">
      <div className="content">
        <div className="col">
          <div className="row">
            <div className="col mb-3">
              <div className="card">
                <table className="content-table">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Patient Name</th>
                      <th>Date</th>
                      <th>Start time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events?.map(({ day, title, start_Date }, index) => {
                      return (
                        <tr>
                          <td>{++index}</td>
                          <td>{title}</td>
                          <td>{day}</td>
                          <td>{start_Date}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReservations;
