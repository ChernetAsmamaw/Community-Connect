import BusinessList from "@/app/_components/BusinessList";
import { CalendarCheck, Clock, Mail, Map, User } from "lucide-react";
import Image from "next/image";
import React from "react";
import moment from "moment";

function BookingHistoryList({ bookingHistory }) {
  return (
    <div className="space-y-4">
      {bookingHistory.map((booking, index) => (
        <div
          key={index}
          className="flex justify-start items-center border py-4 gap-4 rounded-md px-4"
        >
          {booking?.businessList?.name && (
            <Image
              src={booking?.businessList?.images[0]?.url}
              width={70}
              height={70}
              alt={booking?.businessList?.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          )}

          <div className="flex-1">
            <h1 className="text-lg font-bold">{booking?.businessList?.name}</h1>
            <p className="flex gap-2 text-primary">
              <User />
              {booking?.businessList?.contactPerson}
            </p>
            <p className="flex gap-2 text-gray-500">
              <Map />
              {booking?.businessList?.address}
            </p>

            <p className="flex gap-2 text-gray-500">
              <Mail />
              {booking?.businessList?.email}
            </p>
          </div>
          <div className="text-right space-y-2">
            <div className="flex items-center justify-end space-x-2 text-sm text-gray-700">
              <CalendarCheck className="w-4 h-4 text-primary" />
              <span>
                Booked Date: {moment(booking?.date).format("MMMM Do, YYYY")}
              </span>
            </div>
            <div className="flex items-center justify-end space-x-2 text-sm text-gray-700">
              <Clock className="w-4 h-4 text-primary" />
              <span>
                Booked Time: {moment(booking?.time, "h:mm A").format("h:mm A")}
              </span>
            </div>
            <p className="text-sm text-gray-600">{booking?.status}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookingHistoryList;
