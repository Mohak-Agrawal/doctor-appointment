import React, { Component, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { database, auth } from "../firebase";
import { Modal, Button, Form } from "react-bootstrap";
import emailjs from "emailjs-com";
import "../index.css";
import { useEffect } from "react";
import { useAuth } from "../contexts/Auth";
import firebase from "firebase";

const CalendarComponent = () => {
  const [name, setName] = useState("");
  const [day, setDay] = useState("");
  const [startDate, setStartDate] = useState("T08:00:00+01:00");
  const [show, setShow] = useState(false);

  const [doctorList, setDoctorList] = useState([]);
  const [doctor, setDoctor] = useState();
  const [events, setEvents] = useState([]);
  const { userDetails } = useAuth();
  const [times, setTimes] = useState([
    {
      id: "1",
      start: "08:00:00",
      end: "08:30:00",
    },
    {
      id: "2",
      start: "08:30:00",
      end: "09:00:00",
    },
    {
      id: "3",
      start: "09:00:00",
      end: "09:30:00",
    },
    {
      id: "4",
      start: "09:30:00",
      end: "10:00:00",
    },
    {
      id: "5",
      start: "10:00:00",
      end: "10:30:00",
    },
    {
      id: "6",
      start: "10:30:00",
      end: "11:00:00",
    },
    {
      id: "7",
      start: "11:00:00",
      end: "11:30:00",
    },
    {
      id: "8",
      start: "11:30:00",
      end: "12:00:00",
    },
    {
      id: "9",
      start: "12:00:00",
      end: "12:30:00",
    },
    {
      id: "10",
      start: "12:30:00",
      end: "13:00:00",
    },
    {
      id: "11",
      start: "13:00:00",
      end: "13:30:00",
    },
    {
      id: "12",
      start: "13:30:00",
      end: "14:00:00",
    },
    {
      id: "13",
      start: "14:00:00",
      end: "14:30:00",
    },
    {
      id: "14",
      start: "14:30:00",
      end: "15:00:00",
    },
    {
      id: "15",
      start: "15:00:00",
      end: "15:30:00",
    },
    {
      id: "16",
      start: "15:30:00",
      end: "16:00:00",
    },
  ]);

  useEffect(() => {
    const subscriber = firebase
      .firestore()
      .collection("appointments")
      .where(
        userDetails?.role == "doctor" ? "docId" : "uid",
        "==",
        auth.currentUser.uid
      )
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

  useEffect(() => {
    const subscriber = firebase
      .firestore()
      .collection("users")
      .where("role", "==", "doctor")
      .onSnapshot((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((documentSnapshot) => {
          list.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setDoctorList(list);
        console.log({ list });
      });

    return () => subscriber();
  }, []);

  const handleEventRemove = (clickInfo) => {
    if (window.confirm(`Are you sure you want to delete this appointment`)) {
      clickInfo.event.remove();
    }
  };

  const handleEventInfo = (e) => {
    alert(
      "Name of Client : " + e.event.title + "\n" + "Time : " + e.event.start
    );
  };

  const renderEventContent = (e) => {
    return (
      <div>
        <b> {e.event.title} </b>
      </div>
    );
  };

  const addAppointment = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const submitEvent = (e) => {
    //stock appointement
    if (doctor == "") return alert("Please select doctor!!!");

    const isExist = events.find(
      (event) => event.start === day + "" + startDate
    );

    if (isExist) {
      //Show alert message
      alert("Already taken");
    } else {
      console.log("Doctor Id", doctor);
      firebase
        .firestore()
        .collection("appointments")
        .add({
          title: name,
          start: day + "" + startDate,
          uid: auth.currentUser.uid,
          docId: doctor,
          start_Date: startDate,
          day: day,
        })
        .then(() => {
          // const events = [];
          // Object.assign(events, events);
          // events.push({
          //   start: day + "" + startDate,
          //   title: name,
          //   uid: auth.currentUser.uid,
          //   doctor: doctor,
          // });

          // setEvents(events);
          alert("Appointment saved");
        })
        .catch(function (error) {
          console.log(error.message);
          console.log(error.code);
        });

      //send mail to doctor
      emailjs
        .sendForm("gmail", "template", e.target, "user_ZfMOqTgjCdALX7916gbj2")
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
    }
    handleClose();
    return false;
  };

  return (
    <div className="col">
      <div className="row">
        <div className="col mb-3">
          <div className="card">
            <div className="card-body">
              {userDetails?.role == "patient" ? (
                <Button
                  onClick={addAppointment}
                  style={{ float: "right", marginLeft: "10px" }}
                >
                  Make Appointment
                </Button>
              ) : null}

              <div className="e-profile">
                <FullCalendar
                  headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "",
                  }}
                  plugins={[timeGridPlugin, interactionPlugin]}
                  initialView="timeGridWeek"
                  themeSystem="bootstrap"
                  allDaySlot={false}
                  // weekends={false}
                  slotMinTime="08:00:00"
                  slotMaxTime="16:00:00"
                  height="auto"
                  eventContent={renderEventContent}
                  eventBackgroundColor="#9368E9"
                  eventBorderColor="#9368E9"
                  eventClick={handleEventInfo}
                  events={events}
                />

                <Modal
                  className="modal"
                  show={show}
                  onHide={handleClose}
                  animation={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title className="font-weight-bold">
                      Make Appointment
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="col mb-4">
                      <div className="card">
                        <div className="card-body">
                          <Form onSubmit={submitEvent}>
                            <Form.Group>
                              <Form.Label>full name</Form.Label>
                              <Form.Control
                                type="text"
                                className="form-control"
                                placeholder="Enter your name"
                                onChange={(e) => {
                                  const name = e.target.value;
                                  setName(name);
                                }}
                                name="name"
                                required
                              />
                            </Form.Group>
                            <Form.Group>
                              <Form.Label>date</Form.Label>
                              <Form.Control
                                type="date"
                                name="SelectedDate"
                                required
                                placeholder="Choose a date"
                                onChange={(e) => {
                                  const dayS = e.target.value;
                                  setDay(dayS);
                                }}
                              />
                            </Form.Group>
                            <Form.Group>
                              <Form.Label>available time</Form.Label>
                              <Form.Control
                                as="select"
                                name="time"
                                required
                                onChange={(e) => {
                                  const startD =
                                    "T" + e.target.value + "+01:00";
                                  const sDate = startD;
                                  setStartDate(sDate);
                                }}
                              >
                                <option value disabled>
                                  Choose an available time
                                </option>
                                {times.map((time) => (
                                  <option key={time.id} value={time.start}>
                                    from {time.start}
                                  </option>
                                ))}
                              </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                              <Form.Label>Select Doctor</Form.Label>
                              <Form.Control
                                as="select"
                                defaultValue={"Select"}
                                value={doctor ?? ""}
                                required
                                onChange={(e) => {
                                  const doctor = e.target.value;
                                  console.log({ doctor });
                                  setDoctor(doctor);
                                }}
                              >
                                <option value="">Select Doctor</option>
                                {doctorList.map(
                                  ({ prename, name, uid }, index) => (
                                    <option value={uid}>
                                      {"Dr " + prename + " " + name}
                                    </option>
                                  )
                                )}
                              </Form.Control>
                            </Form.Group>

                            <Button variant="primary" type="submit" block>
                              Save
                            </Button>
                          </Form>
                        </div>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
