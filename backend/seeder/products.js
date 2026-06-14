const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("../models/product");

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const products = [
  {
    name: "iPhone 15",
    description: "Apple smartphone",
    price: 79999,
    image: "https://via.placeholder.com/300",
    category: "Mobiles",
    stock: 20,
  },
  {
    name: "Samsung Galaxy S25",
    description: "Android flagship smartphone",
    price: 74999,
    image: "https://via.placeholder.com/300",
    category: "Mobiles",
    stock: 15,
  },
  {
    name: "MacBook Pro M4",
    description: "Professional laptop",
    price: 189999,
    image: "https://via.placeholder.com/300",
    category: "Laptops",
    stock: 10,
  },
  {
    name: "Dell XPS 15",
    description: "Premium Windows laptop",
    price: 145999,
    image: "https://via.placeholder.com/300",
    category: "Laptops",
    stock: 12,
  },
  {
    name: "Sony WH-1000XM5",
    description: "Noise cancelling headphones",
    price: 29999,
    image: "https://via.placeholder.com/300",
    category: "Audio",
    stock: 30,
  },
];

for (let i = 1; i <= 95; i++) {
  products.push({
    name: `Product ${i}`,
    description: `Demo Product ${i}`,
    price: Math.floor(Math.random() * 50000) + 500,
    image: "https://via.placeholder.com/300",
    category: [
      "Mobiles",
      "Laptops",
      "Fashion",
      "Shoes",
      "Books",
      "Gaming",
      "Fitness",
      "Home",
    ][i % 8],
    stock: Math.floor(Math.random() * 100) + 1,
  });
}

const importProducts = async () => {
  try {
    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("100 Products Imported Successfully");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

importProducts();