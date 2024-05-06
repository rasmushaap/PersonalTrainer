import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { React, useState ,useEffect } from 'react';

const localizer = dayjsLocalizer(dayjs);

export default function TrainingCalendar() {

    useEffect(() => getTrainings(), []);

    const [trainings, setTrainings] = useState([])

    const getTrainings = () => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings', { method: 'GET' })
            .then(response => {
                return response.json()
            })
            .then(responseData => {
                setTrainings(responseData)
            })
            .catch(error => console.error(error))
    }

    return (
        <div style={{ height: 500 }}>
            <Calendar
                localizer={localizer}
                events={trainings.map(training => ({
                    start: new Date(training.date),
                    end: new Date(training.date),
                    title: `${training.activity} / ${training.customer.firstname} ${training.customer.lastname}` // Lisätty asiakkaan nimi otsikkoon
                }))}
                startAccessor="start"
                endAccessor="end"
            />
        </div>
    );
}
