const ServiceCategory = require("../models/serviceCategory");
const ErrorResponse = require("../utils/errorResponse");

/************** Create a new category for the services **************/
module.exports.createServiceCategory = async (req, res, next) => {
  try {
    const serviceCategory = await ServiceCategory.create({
      serviceCategoryName: req.body.serviceCategoryName,
      serviceCategoryImage: req.body.serviceCategoryImage,
      user: req.user.id,
    });
    res
      .status(201)
      .json({
        success: true,
        serviceCategory,
        message: "Service Category created successfully",
      });
  } catch (error) {
    next(error);
  }
};

/************** Get all service categories **************/
module.exports.getAllServiceCategories = async (req, res, next) => {
  try {
    const serviceCategories = await ServiceCategory.find();
    res.status(200).json({ success: true, serviceCategories });
  } catch (error) {
    next(error);
  }
};

/************** Get a service category by ID **************/
module.exports.getServiceCategoryById = async (req, res, next) => {
  try {
    const serviceCategory = await ServiceCategory.findById(req.params.id);
    if (!serviceCategory) {
      return next(new ErrorResponse("Service Category not found", 404));
    }
    res.status(200).json({ success: true, serviceCategory });
  } catch (error) {
    next(error);
  }
};

/************** Update a service category by ID **************/
module.exports.updateServiceCategory = async (req, res, next) => {
  try {
    const serviceCategory = await ServiceCategory.findByIdAndUpdate(
      req.params.category_id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!serviceCategory) {
      return next(new ErrorResponse("Service Category not found", 404));
    }
    res
      .status(200)
      .json({
        success: true,
        serviceCategory,
        message: "Service Category updated successfully",
      });
  } catch (error) {
    next(error);
  }
};

/************** Delete a service category by ID **************/
module.exports.deleteServiceCategory = async (req, res, next) => {
  try {
    const serviceCategory = await ServiceCategory.findById(
      req.params.category_id
    );
    if (!serviceCategory) {
      return next(new ErrorResponse("Service Category not found", 404));
    }
    serviceCategory.remove();
    res
      .status(200)
      .json({
        success: true,
        serviceCategory,
        message: "Service Category deleted successfully",
      });
  } catch (error) {
    next(error);
  }
};
