import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Setup moment.js localizer for the calendar
const localizer = momentLocalizer(moment);

// Initial events (representing availability)
const initialEvents = [
  {
    title: 'Available',
    start: new Date(2024, 9, 11, 9, 30), // Year, Month (0-indexed), Day, Hour, Minute
    end: new Date(2024, 9, 11, 12, 0),
  },
  {
    title: 'Unavailable',
    start: new Date(2024, 9, 12, 10, 0),
    end: new Date(2024, 9, 12, 13, 0),
  },
];

const BookingPage: React.FC = () => {
  const [events, setEvents] = useState(initialEvents);

  // Function to handle slot selection and adding new events
  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    const title = window.prompt('Enter booking title (optional):');
    if (title) {
      setEvents([...events, { start, end, title }]);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Booking</h1>
      <Calendar
        localizer={localizer}
        events={events}
        selectable
        defaultView="week"
        views={['month', 'week', 'day']}
        defaultDate={new Date()}
        onSelectSlot={handleSelectSlot}
        style={{ height: 600 }}
      />
    </div>
  );
};

export default BookingPage;
