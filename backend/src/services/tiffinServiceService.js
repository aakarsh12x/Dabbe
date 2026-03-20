import prisma from "../config/db.js";
import AppError from "../utils/appError.js";

export const getAllServices = async () =>
  prisma.tiffinService.findMany({
    include: { menus: true },
    orderBy: { createdAt: "desc" },
  });

export const getServiceById = async (id) => {
  const service = await prisma.tiffinService.findUnique({
    where: { id: Number(id) },
    include: { menus: true },
  });

  if (!service) {
    throw new AppError("Tiffin service not found.", 404);
  }

  return service;
};

export const createService = async (payload) =>
  prisma.tiffinService.create({
    data: {
      name: payload.name,
      description: payload.description,
      priceMonthly: payload.priceMonthly,
      rating: payload.rating,
      vegOrNonVeg: payload.vegOrNonVeg,
      location: payload.location,
      imageUrl: payload.imageUrl,
      menus: payload.menus?.length
        ? {
            create: payload.menus.map((menu) => ({
              day: menu.day,
              mealDescription: menu.mealDescription,
            })),
          }
        : undefined,
    },
    include: { menus: true },
  });

export const updateService = async (id, payload) => {
  await getServiceById(id);

  await prisma.menu.deleteMany({ where: { serviceId: Number(id) } });

  return prisma.tiffinService.update({
    where: { id: Number(id) },
    data: {
      name: payload.name,
      description: payload.description,
      priceMonthly: payload.priceMonthly,
      rating: payload.rating,
      vegOrNonVeg: payload.vegOrNonVeg,
      location: payload.location,
      imageUrl: payload.imageUrl,
      menus: payload.menus?.length
        ? {
            create: payload.menus.map((menu) => ({
              day: menu.day,
              mealDescription: menu.mealDescription,
            })),
          }
        : undefined,
    },
    include: { menus: true },
  });
};

export const deleteService = async (id) => {
  await getServiceById(id);

  await prisma.tiffinService.delete({ where: { id: Number(id) } });
};
