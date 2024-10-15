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
import { CiStar } from "react-icons/ci";

const ServiceCard = ({
  id,
  title,
  description,
  city,
  serviceCategoryName,
  rating,
  user,
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        mb: 3,
        p: 2,
        borderRadius: 2,
        boxShadow: 1,
        backgroundColor: "#FFFFFF", 
        "&:hover": {
          boxShadow: 4,
        },
      }}
    >
      <CardContent>
        <Typography
          sx={{
            fontSize: 15,
            color: "#cccccc", 
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
            color: "#55883B", // Dark green
            fontWeight: 600,
            mb: 1,
          }}
        >
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5, color: "text.secondary" }}>
          {serviceCategoryName}
        </Typography>
        <Typography component="p" sx={{ color: "black", mb: 2 }}> 
          Description: {description.split(" ").slice(0, 15).join(" ") + "..."}
        </Typography>

        <Typography
          component="p"
          sx={{
            color: "#55883B", 
            fontWeight: 600,
            mb: 2,
          }}
          className="flex"
        >
          <CiStar className="text-xl" /> {rating ? rating : "No rating yet"}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button
          disableElevation
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          sx={{ borderRadius: 10, backgroundColor: "#BCE27F", "&:hover": { backgroundColor: "#A8D67B" } }}
        >
          <Link
            style={{ textDecoration: "none", color: "black", boxShadow: 0 }}
            to={`/service/${id}`}
          >
            More Details
          </Link>
        </Button>
        {/* New Book Service Button */}
        <Button
          disableElevation
          variant="contained"
          size="small"
          sx={{ borderRadius: 10, backgroundColor: "#55883B", "&:hover": { backgroundColor: "#4A7D31" } }} // Dark green
          component={Link}
          to={`/bookings/${id}`} // Assuming you have a bookings page
        >
          Book Service
        </Button>
      </CardActions>
    </Card>
  );
};

export default ServiceCard;
