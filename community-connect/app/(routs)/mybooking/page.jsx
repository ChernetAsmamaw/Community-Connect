"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingHistoryList from "./_components/BookingHistoryList";
import GlobalApi from "@/app/_services/GlobalApi";
import { useSession } from "next-auth/react";

function MyBooking() {
  const [bookingHistory, setBookingHistory] = useState([]);

  // Get the user email from the session
  const { data } = useSession();

  // Get the booking history of the user
  const GetBookingHistory = () => {
    GlobalApi.getBookingHistory(data?.user?.email).then((res) => {
      setBookingHistory(res?.bookings);
    });
  };

  useEffect(() => {
    data && GetBookingHistory();
  }, [data]);

  // FIlter the data for past and upcoming bookings
  const filterData = (statusType) => {
    const currentDate = new Date();
    return bookingHistory
      .map((booking) => {
        if (
          new Date(booking.date) < currentDate &&
          booking.status !== "cancelled"
        ) {
          booking.status = "completed";
        } else if (
          new Date(booking.date) >= currentDate &&
          booking.status !== "cancelled"
        ) {
          booking.status = "booked";
        }
        return booking;
      })
      .filter((booking) => booking.status === statusType);
  };

  return (
    <div className="my-10 md:mx-32 mx-5">
      <h1 className="text-2xl font-bold m-1 my-5">My Bookings</h1>
      <Tabs defaultValue="booked" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="booked">Booked</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        <TabsContent value="booked">
          <BookingHistoryList bookingHistory={filterData("booked")} />
        </TabsContent>
        <TabsContent value="completed">
          <BookingHistoryList bookingHistory={filterData("completed")} />
        </TabsContent>
        <TabsContent value="cancelled">
          <BookingHistoryList bookingHistory={filterData("cancelled")} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default MyBooking;
