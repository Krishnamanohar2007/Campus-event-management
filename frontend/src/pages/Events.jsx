import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

function Events() {

    const [events, setEvents] = useState([]);

    useEffect(() => {

        const fetchEvents = async () => {

            try {

                const response =
                    await api.get("/events");

                setEvents(response.data);
                console.log(response.data);

            } catch(error) {

                console.error(error);

            }
        };

        fetchEvents();

    }, []);

    return (
        <div>
            {
                events.map((event) => (
                    <div key={event._id}>
                        <h3>{event.title}</h3>

                        <p>{event.description}</p>

                        <p>{event.venue}</p>

                        <p>
                            {new Date(event.date)
                            .toLocaleDateString()}
                        </p>

                        <Link to={`/events/${event._id}`}>
                            View Details
                        </Link>
                    </div>
                ))
            }
        </div>
    );
}

export default Events;