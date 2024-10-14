import React from "react";
import { Box, styled } from "@mui/system";
import headerImage from "../images/header.jpg";
import { theme } from "../theme";
import SearchBar from "./SearchBar";

const Header = () => {
  const StyleHeader = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 420,
    backgroundImage: "url(" + headerImage + ")",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: theme.palette.primary.main,
    backgroundBlendMode: "overlay",
  }));

  return (
    <>
      <StyleHeader>
        <SearchBar />
      </StyleHeader>
    </>
  );
};

export default Header;
