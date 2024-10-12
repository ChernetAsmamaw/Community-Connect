const Service = require("../models/service");
const ErrorResponse = require("../utils/errorResponse");
const ServiceCategory = require("../models/serviceCategory");

/************** Create a new service **************/
module.exports.createService = async (req, res, next) => {
  try {
    const service = await Service.create({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      serviceImage: req.body.serviceImage,
      availability: req.body.availability,
      country: req.body.country,
      city: req.body.city,
      rating: req.body.rating,
      serviceCategory: req.body.serviceCategory,
      user: req.user.id,
    });
    res.status(201).json({ success: true, service });
  } catch (error) {
    next(error);
  }
};

/************** Get all services **************/
module.exports.getAllServices = async (req, res, next) => {
  // Enable search query
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  // FIlter by service category
  let ids = [];
  const serviceCategoryType = await ServiceCategory.find({}, { _id: 1 });
  serviceCategoryType.forEach((category) => {
    ids.push(category._id);
  });

  let cat = req.query.category;
  let categ = cat !== "" ? cat : ids;

  // Enable pagination
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;
  // const count = await Service.find().estimatedDocumentCount(); // This is does not accept filter
  const count = await Service.find({
    ...keyword,
    serviceCategory: categ,
  }).countDocuments();

  try {
    const services = await Service.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.status(200).json({
      success: true,
      services,
      page,
      pages: Math.ceil(count / pageSize),
      count,
      ids,
    });
  } catch (error) {
    next(error);
  }
};

/************** Get a service by ID **************/
module.exports.getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return next(new ErrorResponse("Service not found", 404));
    }
    res.status(200).json({ success: true, service });
  } catch (error) {
    next(error);
  }
};

/************** Update a service by ID **************/
module.exports.updateService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.service_id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("serviceCategory", "serviceCategoryName")
      .populate("user", "firstName lastName");

    res.status(200).json({ success: true, service });
  } catch (error) {
    next(error);
  }
};
