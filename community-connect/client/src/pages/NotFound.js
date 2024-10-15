import React from "react";
import { Container, Typography, Box } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PageNotFound = () => {
  return (
    <>
      <Header />

      <Container>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="82vh"
        >
          <ErrorOutlineIcon style={{ fontSize: 100, color: "red" }} />
          <Typography variant="h3" component="h1" gutterBottom>
            404 - Page Not Found
          </Typography>
          <Typography variant="h6" component="p">
            Sorry, the page you are looking for does not exist.
          </Typography>
        </Box>{" "}
      </Container>

      <Footer />
    </>
  );
};

export default PageNotFound;
