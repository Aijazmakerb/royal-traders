import { ConnectToDatabase } from "@/lib/connect";
import Product from "@/models/ProductsModel";

export default async function handler(req, res) {
  await ConnectToDatabase();

  const products = await Product.find({});

  return res.status(200).json(products);
}
