import User from "../models/user.model";

export const seedAdmin = async () => {
  try {
    const adminName = process.env.ADMIN_NAME;
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword || !adminName) {
      console.error("Admin credentials are not set in .env");
      return;
    }

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log("Admin already exists");
      return;
    }

    const newAdmin = new User({
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      role: "admin",
    });

    await newAdmin.save();
    console.log("Admin created successfully");
  } catch (error) {
    console.error("Error seeding admin:", error);
  }
};
