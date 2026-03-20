import prisma from "../config/db.js";

export const getAllUsers = async () =>
  prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      subscriptions: {
        include: {
          service: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
