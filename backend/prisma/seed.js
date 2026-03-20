import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.menu.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.tiffinService.deleteMany();
  await prisma.user.deleteMany();

  const adminPassword = await bcrypt.hash("Admin@123", 10);
  const userPassword = await bcrypt.hash("User@123", 10);

  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@tiffin.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  const user = await prisma.user.create({
    data: {
      name: "Rahul Sharma",
      email: "rahul@example.com",
      password: userPassword,
      role: "USER",
    },
  });

  const services = await Promise.all([
    prisma.tiffinService.create({
      data: {
        name: "Ghar Ka Swad",
        description: "North Indian homestyle lunch and dinner with weekly rotating sabzi, dal, chapati, rice, and salad.",
        priceMonthly: 3200,
        rating: 4.7,
        vegOrNonVeg: "VEG",
        location: "Indiranagar, Bengaluru",
        imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
        menus: {
          create: [
            { day: "Monday", mealDescription: "Paneer masala, dal tadka, 4 chapatis, jeera rice" },
            { day: "Tuesday", mealDescription: "Aloo gobi, rajma, salad, 4 chapatis" },
            { day: "Wednesday", mealDescription: "Mix veg curry, dal fry, pulao, curd" },
          ],
        },
      },
    }),
    prisma.tiffinService.create({
      data: {
        name: "Protein Pot",
        description: "Balanced high-protein meal plans with egg curry, grilled chicken, sprouts, and brown rice.",
        priceMonthly: 4200,
        rating: 4.8,
        vegOrNonVeg: "NON_VEG",
        location: "Koregaon Park, Pune",
        imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80",
        menus: {
          create: [
            { day: "Monday", mealDescription: "Grilled chicken, sauteed veggies, brown rice" },
            { day: "Tuesday", mealDescription: "Egg bhurji, dal, chapati, cucumber salad" },
            { day: "Wednesday", mealDescription: "Chicken curry, rice, roti, fruit bowl" },
          ],
        },
      },
    }),
    prisma.tiffinService.create({
      data: {
        name: "Sattvik Meals",
        description: "Low oil vegetarian meals prepared fresh every morning with Jain-friendly options.",
        priceMonthly: 2800,
        rating: 4.4,
        vegOrNonVeg: "VEG",
        location: "Navrangpura, Ahmedabad",
        imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
        menus: {
          create: [
            { day: "Monday", mealDescription: "Moong curry, lauki sabzi, phulka, rice" },
            { day: "Tuesday", mealDescription: "Sev tameta, dal, millet roti, buttermilk" },
            { day: "Wednesday", mealDescription: "Palak corn, khichdi, curd, salad" },
          ],
        },
      },
    }),
  ]);

  await prisma.subscription.create({
    data: {
      userId: user.id,
      serviceId: services[0].id,
      startDate: new Date("2026-03-01"),
      endDate: new Date("2026-03-31"),
      status: "ACTIVE",
    },
  });

  console.log("Seed complete", {
    admin: admin.email,
    user: user.email,
    passwordHint: "Admin@123 / User@123",
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
