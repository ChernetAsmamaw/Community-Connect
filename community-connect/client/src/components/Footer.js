import React from "react";
import { Box } from "@mui/system";
import { theme } from "../theme";

const Footer = () => {
  const { palette } = theme;

  return (
    <Box
      sx={{
       
        minHeight: "10vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
      className =" bg-accent text-white"
    >
      <p>&copy; 2021 Community Connect | All Rights Reserved</p>
    </Box>
  );
};

export default Footer;
