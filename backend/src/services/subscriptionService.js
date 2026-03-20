import prisma from "../config/db.js";
import AppError from "../utils/appError.js";

const includeOptions = {
  user: {
    select: {
      id: true,
      name: true,
      email: true,
    },
  },
  service: true,
};

export const createSubscription = async ({ userId, serviceId, startDate, endDate, status = "ACTIVE" }) => {
  const [user, service] = await Promise.all([
    prisma.user.findUnique({ where: { id: Number(userId) } }),
    prisma.tiffinService.findUnique({ where: { id: Number(serviceId) } }),
  ]);

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  if (!service) {
    throw new AppError("Tiffin service not found.", 404);
  }

  return prisma.subscription.create({
    data: {
      userId: Number(userId),
      serviceId: Number(serviceId),
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      status,
    },
    include: includeOptions,
  });
};

export const getSubscriptionsByUserId = async (userId) =>
  prisma.subscription.findMany({
    where: { userId: Number(userId) },
    include: includeOptions,
    orderBy: { createdAt: "desc" },
  });

export const getAllSubscriptions = async () =>
  prisma.subscription.findMany({
    include: includeOptions,
    orderBy: { createdAt: "desc" },
  });

export const updateSubscriptionStatus = async (id, status) => {
  const subscription = await prisma.subscription.findUnique({ where: { id: Number(id) } });

  if (!subscription) {
    throw new AppError("Subscription not found.", 404);
  }

  return prisma.subscription.update({
    where: { id: Number(id) },
    data: { status },
    include: includeOptions,
  });
};
