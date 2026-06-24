import React from 'react'
import { useState, useEffect } from 'react'
import {useAuth} from '../context/AuthContext'
import api from '../api/axios'

function MyRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const {user, token} = useAuth();

  useEffect(() => {
    const fetchRegistrations = async () => {
            try {
                const response =
                    await api.get(
                        "/registrations/my",
                        {
                            headers:{
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                setRegistrations(
                    response.data.registrations
                );

            } catch(error) {

                console.error(error);

            }
        };

        fetchRegistrations();

  }, []);

  const unregister = async(eventId)=>{
      try{
          await api.delete(
              `/registrations/event/${eventId}`,
              {
                  headers:{
                      Authorization:
                          `Bearer ${token}`
                  }
              }
          );

          setRegistrations(
              registrations.filter(
                  reg =>
                  reg.event._id !== eventId
              )
          );

      }catch(error){
          console.error(error);
      }
  };

  return (
    <div>
      {
        registrations.map((registration) => (
          <div key={registration._id}>
            <h3>{registration.event.title}</h3>
            <p>{registration.event.description}</p>
            <p>{new Date(registration.event.date).toLocaleString()}</p>
            <p>{registration.event.venue}</p>
            <button onClick={() => unregister(registration.event._id)}>Unregister</button>
          </div>
        ))
      }
    </div>
  )
}

export default MyRegistrations