import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import {
  Box,
  Stack,
  Container,
  Card,
  Typography,
  Pagination,
  List,
  ListItemIcon,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SelectComponent from "../components/SelectComponent.js";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { serviceLoadAction } from "../redux/actions/serviceAction.js";
import { useSelector } from "react-redux";
import ServiceCard from "../components/ServiceCard";
import Footer from "../components/Footer";
import LoadingBox from "../components/LoadingBox.js";
import { fetchServiceCategories } from "../redux/actions/serviceCategoryAction.js";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Home = () => {
  const { services, setUniqueCity, pages, loading } = useSelector(
    (state) => state.loadService
  );

  const { palette } = useTheme();
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);
  const [cat, setCat] = React.useState("");
  const { keyword, city } = useParams();

  // Fetch services
  useEffect(() => {
    dispatch(serviceLoadAction(page, keyword, cat, city));
  }, [page, keyword, cat, city, dispatch]);

  // Fetch service categories
  useEffect(() => {
    dispatch(fetchServiceCategories());
  }, []);

  const handleChangeCategory = (event) => {
    setCat(event.target.value);
  };

  return (
    <>
      <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
        <Navbar />
        <Header />

        <Container>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <Box sx={{ flex: 2, p: 2 }}>
              {/* Filter by Category */}

              <Card sx={{ minWidth: 150, mb: 3, mt: 3, p: 2 }}>
                <Box sx={{ pb: 2 }}>
                  <Typography
                    component="h4"
                    sx={{ color: palette.secondary.main, fontWeight: 600 }}
                  >
                    Filter Services by Category
                  </Typography>
                </Box>
                <SelectComponent
                  handleChangeCategory={handleChangeCategory}
                  cat={cat}
                />
              </Card>

              {/* Filter by City */}

              <Card sx={{ minWidth: 150, mb: 3, mt: 3, p: 2 }}>
                <Box sx={{ pb: 2 }}>
                  <Typography
                    component="h4"
                    sx={{ color: palette.secondary.main, fontWeight: 600 }}
                  >
                    Filter Services by Location
                  </Typography>

                  {setUniqueCity &&
                    setUniqueCity.map((city, index) => (
                      <MenuItem key={index} value={city}>
                        <ListItemIcon>
                          <LocationOnIcon fontSize="small" />
                        </ListItemIcon>
                        <Link
                          to={`/search/${city}`}
                          style={{ textDecoration: "none" }}
                        >
                          {" "}
                          {city}
                        </Link>
                      </MenuItem>
                    ))}
                </Box>
              </Card>
            </Box>
            <Box sx={{ flex: 10, p: 2 }}>
              {loading ? (
                <LoadingBox />
              ) : services && services.length === 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50vh",
                  }}
                >
                  <Typography
                    component="h4"
                    sx={{ color: palette.secondary.main, fontWeight: 600 }}
                  >
                    No services found
                  </Typography>
                </Box>
              ) : (
                services &&
                services.map((service, index) => (
                  <ServiceCard
                    key={index}
                    id={service._id}
                    title={service.title}
                    description={service.description}
                    city={service.city}
                    serviceCategory={service.serviceCategory}
                  />
                ))
              )}

              {/* Pagination */}
              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                sx={{ mt: 2 }}
              >
                <Pagination
                  page={page}
                  count={pages === 0 ? 1 : pages}
                  onChange={(event, value) => setPage(value)}
                  color="primary"
                  size="large"
                />
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Box>

      <Footer />
    </>
  );
};

export default Home;
