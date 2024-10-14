import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IconButton, useTheme } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const ServiceCard = ({
  id,
  title,
  description,
  city,
  serviceCategory,
  rating,
  user,
}) => {
  const { palette } = useTheme();
  return (
    <Card
      sx={{
        mb: 3,
        p: 2,
        borderRadius: 2,
        boxShadow: 1,
        backgroundColor: "#fff",
        // Add some hover effect
        "&:hover": {
          boxShadow: 2,
        },
      }}
    >
      <CardContent>
        <Typography
          sx={{
            fontSize: 15,
            color: palette.secondary.main,
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
          }}
          gutterBottom
        >
          <IconButton sx={{ mr: 1 }}>
            <LocationOnIcon sx={{ fontSize: 18 }} />
          </IconButton>
          {city}
        </Typography>
        <Typography
          component="h4"
          sx={{
            color: palette.secondary.main,
            fontWeight: 600,
            mb: 1,
          }}
        >
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5, color: "text.secondary" }}>
          {serviceCategory}
        </Typography>
        <Typography component="p" sx={{ color: palette.secondary.dark, mb: 2 }}>
          Description: {description.split(" ").slice(0, 15).join(" ") + "..."}
        </Typography>

        <Typography
          component="p"
          sx={{
            color: palette.secondary.main,
            fontWeight: 600,
            mb: 2,
          }}
        >
          Rating : {rating ? rating : "No rating yet"}
        </Typography>

        {/* 
    <Typography
      component="p"
      sx={{
        color: palette.secondary.main,
        fontWeight: 600,
      }}
    >
      Posted by: {`${user.firstName} ${user.lastName}`}
    </Typography>
    */}
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          disableElevation
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          sx={{ borderRadius: 10 }}
        >
          <Link
            style={{ textDecoration: "none", color: "white", boxShadow: 0 }}
            to={`/service/${id}`}
          >
            More Details
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
};

export default ServiceCard;
