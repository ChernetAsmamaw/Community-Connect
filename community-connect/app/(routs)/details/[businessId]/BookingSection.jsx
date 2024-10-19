import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import GlobalApi from "@/app/_services/GlobalApi";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import moment from "moment/moment";

function BookingSection({ children, business }) {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTime, setSelectedTime] = useState();
  //Get user information for creating booking
  const { data } = useSession();
  // Store the booked slots
  const [bookedSlots, setBookedSlots] = useState([]);

  useEffect(() => {
    getTime();
    // to make the form empty after booking
    setDate();
    setSelectedTime("");
  }, []);

  // Make sure the the check for booked slots works on every date change
  useEffect(() => {
    date && BusinessIsBooked();
  }, [date]);

  // Prevent booking already booked slots
  const BusinessIsBooked = () => {
    GlobalApi.getBookedSlots(business.id, moment(date).format("DD-MMM-YYYY"))
      .then((res) => {
        console.log(res);
        setBookedSlots(res?.bookings);
      })
      .catch((error) => {
        console.error("Error getting booked slots:", error);
      });
  };

  // Get time slots for booking
  const getTime = () => {
    const timelist = [];

    // AM slots from 10:00 AM to 11:30 AM
    for (let i = 10; i <= 12; i++) {
      timelist.push({ time: i + ":00 AM" });
      timelist.push({ time: i + ":30 AM" });
    }

    // PM slots from 12:00 PM to 5:30 PM (12-hour format)
    for (let i = 1; i <= 6; i++) {
      timelist.push({ time: i + ":00 PM" });
      timelist.push({ time: i + ":30 PM" });
    }

    setTimeSlot(timelist);
  };

  // Save booking
  const saveBooking = () => {
    GlobalApi.createBooking(
      business.id,
      moment(date).format("DD-MMM-YYYY"),
      selectedTime,
      data?.user?.email,
      data?.user?.name
    )
      .then((res) => {
        console.log(res);

        if (res?.createBooking?.id) {
          // Check if booking was created successfully
          // Reset the form after successful booking
          setDate(); // Set the date to empty
          setSelectedTime(""); // Clear the selected time

          // Show success message
          toast.success("Booking created successfully");
        } else {
          // Show error message in case booking was not successful
          toast.error("Booking was not successful");
        }
      })
      .catch((error) => {
        // Handle any errors that occur during the booking process
        console.error("Error creating booking:", error);
        toast.error("Booking failed due to an error");
      });
  };

  // Check if the selected time is already booked
  const isBooked = (time) => {
    return bookedSlots.find((slot) => slot.time === time);
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger>{children}</SheetTrigger>
        <SheetContent className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Book this Service</SheetTitle>
            <SheetDescription>
              Date and time of the service will be confirmed by the business
              {/* Date Picker Section Using Shadcn calendar component */}
              <div className="flex flex-col gap-4 items-baseline">
                <h2 className="text-md font-bold my-4">Select Date</h2>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </div>
              <div>
                <h2 className="text-md font-bold my-4">Select Time</h2>
                <div className="grid grid-cols-3 gap-3">
                  {timeSlot.map((item, index) => (
                    <Button
                      key={index}
                      disabled={isBooked(item.time) ? true : false}
                      className={`border rounded-full px-2 p-2 hover:text-white hover:bg-primary
                        ${
                          selectedTime === item.time
                            ? "bg-primary text-white"
                            : "text-gray-700"
                        }`}
                      variant="outline"
                      onClick={() => setSelectedTime(item.time)}
                    >
                      {item.time}
                    </Button>
                  ))}
                </div>
              </div>
            </SheetDescription>
          </SheetHeader>

          <SheetFooter>
            <SheetClose asChild>
              <div className="flex gap-3 my-5">
                <Button variant="destructive">Close</Button>
                <Button
                  className="bg-primary text-white"
                  disabled={!selectedTime && date ? true : false}
                  onClick={() => saveBooking()}
                >
                  Book Now
                </Button>
              </div>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default BookingSection;
