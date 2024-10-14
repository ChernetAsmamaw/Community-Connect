import React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Header from '../components/Header';
import MyCalendar from '../components/MyCalendar';


const BookingPage: React.FC = () => {
  return (
    <div>
        <Header />
        <MyCalendar />
    </div>
  );
};

export default BookingPage;