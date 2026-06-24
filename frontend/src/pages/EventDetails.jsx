import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

function EventDetails() {

    const { eventId } = useParams();
    const { user,token } = useAuth();
    const [event, setEvent] = useState(null);

    const registerForEvent = async () => {

        try {
            const response = await api.post(`/registrations/register/${eventId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert(response.data.message);
        } catch (error) {
          alert(error.response?.data?.message || "An error occurred while registering for the event.");
        }
    };

    useEffect(() => {

        const fetchEvent = async () => {

            try {

                const response =
                    await api.get(`/events/${eventId}`);

                setEvent(response.data);

            } catch(error) {

                console.error(error);

            }
        };

        fetchEvent();

    }, [eventId]);

    if (!event) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>
            <h1>{event.title}</h1>

            <p>{event.description}</p>

            <p>{event.venue}</p>

            <p>
                {new Date(event.date)
                    .toLocaleDateString()}
            </p>

            <p>
                Capacity: {event.capacity}
            </p>

            {user?.role==="student" && (
                <button onClick={registerForEvent}>
                    Register for this event
                </button>
            )}
        </div>
    );
}

export default EventDetails;


