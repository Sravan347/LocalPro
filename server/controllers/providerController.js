const Service = require("../models/Service");
const Booking = require("../models/Booking");
const cloudinary = require("../utils/cloudinary");

// exports.createService = async (req, res) => {
//   try {
//     let photoUrl = "";
//     if (req.file) {
//       const result = await cloudinary.uploader.upload(req.file.path);
//       photoUrl = result.secure_url;
//     }

//     const service = await Service.create({
//       provider: req.user._id,
//       title: req.body.title,
//       description: req.body.description,
//       price: req.body.price,
//       category: req.body.category,
//       photo: photoUrl,
//       availability: req.body.availability
//     });

//     res.json(service);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to create service" });
//   }
// };

exports.createService = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    console.log("REQ FILE:", req.file);
    console.log("USER:", req.user);

    if (req.body.availability) {
      req.body.availability = JSON.parse(req.body.availability);
    }

    let photoUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      photoUrl = result.secure_url;
    }

    const newService = await Service.create({
      provider: req.user._id,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      photo: photoUrl,
      availability: req.body.availability
    });

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: newService
    });
  } catch (err) {
    console.error("Error creating service:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


exports.getProviderServices = async (req, res) => {
  const services = await Service.find({ provider: req.user._id });
  res.json(services);
};

exports.updateService = async (req, res) => {
  const service = await Service.findOne({ _id: req.params.id, provider: req.user._id });
  if (!service) return res.status(404).json({ message: "Service not found" });

  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path);
    service.photo = result.secure_url;
  }

  Object.assign(service, req.body);
  await service.save();
  res.json(service);
};

exports.deleteService = async (req, res) => {
  await Service.deleteOne({ _id: req.params.id, provider: req.user._id });
  res.json({ message: "Service deleted" });
};

exports.getProviderBookings = async (req, res) => {
  const bookings = await Booking.find({ provider: req.user._id }).populate("customer", "name email");
  res.json(bookings);
};
