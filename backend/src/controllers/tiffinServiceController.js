import catchAsync from "../utils/catchAsync.js";
import {
  createService,
  deleteService,
  getAllServices,
  getServiceById,
  updateService,
} from "../services/tiffinServiceService.js";

export const fetchServices = catchAsync(async (req, res) => {
  const services = await getAllServices();
  res.status(200).json({ success: true, data: services });
});

export const fetchServiceById = catchAsync(async (req, res) => {
  const service = await getServiceById(req.params.id);
  res.status(200).json({ success: true, data: service });
});

export const addService = catchAsync(async (req, res) => {
  const service = await createService(req.body);
  res.status(201).json({ success: true, message: "Tiffin service created", data: service });
});

export const editService = catchAsync(async (req, res) => {
  const service = await updateService(req.params.id, req.body);
  res.status(200).json({ success: true, message: "Tiffin service updated", data: service });
});

export const removeService = catchAsync(async (req, res) => {
  await deleteService(req.params.id);
  res.status(200).json({ success: true, message: "Tiffin service deleted" });
});
