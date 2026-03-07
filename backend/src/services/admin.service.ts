import User from "../models/user.model";
import Product from "../models/product.model";

export const getAdminStats = async () => {
  const [totalUsers, totalProducts] = await Promise.all([
    User.countDocuments(),
    Product.countDocuments(),
  ]);

  return {
    totalUsers,
    totalProducts,
  };
};
