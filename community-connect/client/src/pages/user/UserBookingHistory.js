import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ServiceCard from "../../components/ServiceCard";
import { userProfileAction } from "../../redux/actions/userAction";
import Header from "../../components/Header";
import MyCalendar from "../../components/MyCalendar";

const UserBookingHistory = () => {
  const { user } = useSelector((state) => state.userProfile);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userProfileAction());
  }, []);

  return (
    <>
    <Header />
    <MyCalendar />
      <Box>
        <Typography variant="h4" sx={{ color: "#fafafa" }}>
          {" "}
          Jobs History
        </Typography>
        <Box>
          {user &&
            user.bookingHistory.map((history, i) => (
              <ServiceCard
                key={i}
                id={history._id}
                title={history.title}
                description={history.description}
                serviceCategory=""
                location={history.city}
              />
            ))}
        </Box>
      </Box>
    </>
  );
};

export default UserBookingHistory;
