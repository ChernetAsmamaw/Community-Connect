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
    res.status(201).json({ success: true, serviceCategory });
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
