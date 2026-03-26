import mongoose from "mongoose";
import Product from "../src/models/product.model";
import { faker } from "@faker-js/faker";
import "../src/config/env";

//const TOTAL_PRODUCTS = 50;
//const CATEGORIES = ["Electronics", "Clothes", "Books", "Home", "Sports"];

const TOTAL_PRODUCTS = 50;

// Сопоставление категорий и возможных типов товаров
const categoryMap = {
  Electronics: ["Phone", "Laptop", "Tablet", "Headphones", "Camera"],
  Clothes: ["Shirt", "Pants", "Shoes", "Hat", "Jacket"],
  Books: ["Novel", "Magazine", "Comic", "Notebook", "Guide"],
  Home: ["Table", "Chair", "Lamp", "Couch", "Bed"],
  Sports: ["Ball", "Racket", "Bicycle", "Helmet", "Gloves"],
};

type Category = keyof typeof categoryMap;

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    // await Product.deleteMany({});

    const products = [];

    for (let i = 0; i < TOTAL_PRODUCTS; i++) {
      // Сначала выбираем категорию
      const category = faker.helpers.arrayElement(
        Object.keys(categoryMap),
      ) as Category;

      // Потом выбираем название товара из этой категории
      const name = faker.helpers.arrayElement(categoryMap[category]);

      // Добавим немного случайности к названию
      const fullName = `${faker.commerce.productAdjective()} ${name}`;

      const description = faker.commerce.productDescription();
      const price = Number(faker.commerce.price({ min: 5, max: 500, dec: 2 }));
      const stock = faker.number.int({ min: 0, max: 100 });

      products.push({
        name: fullName,
        description,
        price,
        category,
        stock,
      });
    }

    await Product.insertMany(products);
    console.log(`${TOTAL_PRODUCTS} products created successfully!`);
    process.exit();
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
};

seedProducts();

// const seedProducts = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI!);

//     //await Product.deleteMany({});

//     const products = [];

//     for (let i = 0; i < TOTAL_PRODUCTS; i++) {
//       const category = faker.helpers.arrayElement(CATEGORIES);
//       const name = faker.commerce.productName();
//       const description = faker.commerce.productDescription();
//       const price = Number(faker.commerce.price({ min: 5, max: 500, dec: 2 }));
//       const stock = faker.number.int({ min: 0, max: 100 });

//       products.push({
//         name,
//         description,
//         price,
//         category,
//         stock,
//       });
//     }

//     await Product.insertMany(products);
//     console.log(`${TOTAL_PRODUCTS} products created successfully!`);
//     process.exit();
//   } catch (error) {
//     console.error("Seed failed:", error);
//     process.exit(1);
//   }
// };

// seedProducts();
