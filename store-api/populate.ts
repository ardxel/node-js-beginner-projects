import * as fs from "fs";
import dotenv from 'dotenv';

import Product, { IProduct } from "./models/product.js";
import connectDB from './db/connect.js';

dotenv.config();

async function readJSONProducts() {
  try {
    const json = await fs.promises.readFile('./products.json', 'utf8');
    return await JSON.parse(json) as IProduct;
  } catch (error) {
    console.log(error);
  }
}

async function deliveryProductsToDatabase() {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    const products = await readJSONProducts();
    await Product.insertMany(products);
    console.log('success');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

deliveryProductsToDatabase();