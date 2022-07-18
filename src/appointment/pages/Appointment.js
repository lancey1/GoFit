import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ErrorModal from "../../shared/components/ErrorModal";
import styles from "./Appointment.module.css";
import Map from "../../shared/UI/Map";
import ReviewsList from "../../review/components/ReviewsList";

function Appointment(props) {
  const { appointmentId } = useParams();
  const auth = useContext(AuthContext);

  const history = useHistory();
  const [appointment, setAppointment] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const viewProfile = () => {
    history.push(`/user/${appointment.creator.id}`);
  };

  const acceptBtnHandler = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        process.env.REACT_APP_BACKEND + `/appointments/accept`,
        {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
            Authorization: "Bearer " + auth.token,
          },
          body: JSON.stringify({
            userId: auth.userId,
            appointmentId: appointmentId,
          }),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      history.push(`/${auth.userId}/accepted`);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const rejectBtnHandler = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        process.env.REACT_APP_BACKEND + `/appointments/reject`,
        {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
            Authorization: "Bearer " + auth.token,
          },
          body: JSON.stringify({
            userId: auth.userId,
            appointmentId: appointmentId,
          }),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setAppointment(responseData.appointment);
      history.push(`/user/${auth.userId}`);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          process.env.REACT_APP_BACKEND + `/appointments/appointment/${appointmentId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "Application/json",
              Authorization: "Bearer " + auth.token,
            },
          }
        );
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setAppointment(responseData.appointment);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <React.Fragment>
      {error && <ErrorModal error={error} onClear={() => setError(null)} />}
      {appointment && !isLoading && (
        <article className={`${styles.article}`}>
          <h1 className={styles.appointmentName}>
            <img
              onClick={viewProfile}
              className={`${styles.avatar}`}
              src={appointment.creator.image}
              alt="avatar"
            />
            {appointment.creator.name} invited you to {appointment.title}
          </h1>
          <div>
            <div>
              <div>
                {/* <h3>{`Sender: ${appointment.creator.name}`}</h3> */}
                {/* <h3>{`Reciever: ${appointment.reciever.name}`}</h3> */}
              </div>
            </div>
            <hr />
            <div className={`${styles.info}`}>
              <p>
                <b>{`Message: ${appointment.description}`}</b>
              </p>

              <p>
                <b>
                  Date:{" "}
                  {new Date(appointment.appointmentDate).toLocaleString(
                    "en-US",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </b>
              </p>
              <p>
                <b>{`Address: ${appointment.address}`}</b>
              </p>
              {appointment.reciever.id === auth.userId &&
                !appointment.recieverAccepted &&
                !appointment.recieverRejected && (
                  <div className={styles.acceptRejectBtn}>
                    <button className={`${styles.accept}`} onClick={acceptBtnHandler}>{`Accept`}</button>
                    <button className={`${styles.reject}`} onClick={rejectBtnHandler}>{`Reject`}</button>
                  </div>
                )}
              <div className={`${styles.map}`}>
                <Map center={appointment.location} zoom={12} />
              </div>
            </div>
            {appointment.reviews && appointment.reviews.length > 0 && (
              <ReviewsList reviews={appointment.reviews} />
            )}
          </div>
        </article>
      )}
    </React.Fragment>
  );
}

export default Appointment;
