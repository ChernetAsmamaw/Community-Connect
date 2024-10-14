import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, InputBase } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Define the validation schema
const validationSchema = Yup.object({
  query: Yup.string("Enter your search query").required(
    "Search query is required"
  ),
});

const SearchBar = () => {
  const navigate = useNavigate();

  const onSubmit = (values, actions) => {
    // Use values.query: the search query
    const { query } = values;
    if (query.trim()) {
      navigate(`/search/${query}`);
    } else {
      navigate("/");
    }
    actions.resetForm();
  };

  const { values, errors, touched, handleChange, handleSubmit, isSubmitting } =
    useFormik({
      initialValues: {
        query: "", // Must match the name used in the form input
      },
      validationSchema,
      onSubmit,
    });

  return (
    <form onSubmit={handleSubmit} style={{ width: "50%" }}>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <InputBase
          sx={{ bgcolor: "white", padding: "10px" }}
          fullWidth={true}
          id="query"
          name="query" // Field name should match initialValues
          label="Search"
          placeholder="Search for services"
          value={values.query} // Must match the 'query' key from initialValues
          onChange={handleChange}
          error={touched.query && Boolean(errors.query)}
        />

        <Button
          color="primary"
          variant="contained"
          type="submit"
          disabled={isSubmitting}
        >
          Search
        </Button>
      </Box>
      <Box component="span" sx={{ color: "orange" }}>
        {touched.query && errors.query}
      </Box>
    </form>
  );
};

export default SearchBar;
