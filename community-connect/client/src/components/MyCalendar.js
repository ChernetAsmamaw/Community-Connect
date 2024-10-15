import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import EventForm from '../pages/EventForm';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectSlot = ({ start, end }) => {
    setSelectedSlot({ start, end });
    setIsModalOpen(true); // Open the modal
  };

  const handleEventCreation = (eventData) => {
    const { title, description, date, startTime, endTime } = eventData;

    const start = new Date(`${date.toISOString().split('T')[0]}T${startTime}:00`);
    const end = new Date(`${date.toISOString().split('T')[0]}T${endTime}:00`);

    const newEvent = {
      start,
      end,
      title,
      description,
    };

    setEvents([...events, newEvent]);
    closeModal(); // Close the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedSlot(null);
  };

  const CustomAgenda = ({ event }) => (
    <span>
      <strong>{event.title}</strong>
      {event.description && (
        <>
          <br />
          <span>{event.description}</span>
        </>
      )}
    </span>
  );

  return (
    <div className="relative">
      <h2 className="text-center text-3xl mt-5 mb-10">Appointment Booking</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: '50px auto', width: '90%' }}
        selectable
        onSelectSlot={handleSelectSlot}
        components={{
          agenda: {
            event: CustomAgenda,
          },
        }}
      />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="rounded-lg shadow-lg max-w-lg w-full">
            {selectedSlot && (
              <EventForm
                start={selectedSlot.start}
                end={selectedSlot.end}
                onSubmit={handleEventCreation}
                onCancel={closeModal}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCalendar;
