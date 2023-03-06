import React, {useState} from 'react'

const appointmentTimeOfDay = (startsAt) => {
  const [h, m] = new Date(startsAt)
    .toTimeString()
    .split(":");
  return `${h}:${m}`;
}

export const Appointment = ({customer}) => (
  <div>
    {customer.firstName}
  </div>
)

export const AppointmentDayView = ({appointments}) => {
  const [selectedAppointmentIndex, setSelectedAppointmentIndex] = useState(0);

  return (
    <div id="appointmentsDayView">
      {appointments.length > 0 
        ? <Appointment {...appointments[selectedAppointmentIndex]} />
        : <p>There are no appointments scheduled for today.</p>
      }
      <ol>
        {appointments.map((appointment, appointmentIndex) => 
          <li key={appointment.startAt}>
            <button 
              type="button" 
              onClick={() => setSelectedAppointmentIndex(appointmentIndex)}
            >
              {appointmentTimeOfDay(appointment.startAt)}
            </button>
          </li>
        )}
      </ol>
    </div>
  )
}