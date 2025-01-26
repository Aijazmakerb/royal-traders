import { ConnectToDatabase } from "@/lib/connect";
import Product from "@/models/ProductsModel";

export default async function handler(req, res) {
  await ConnectToDatabase();

  switch (req.method) {
    case "GET":
      try {
        const products = await Product.find({});
        return res.status(200).json(products);
      } catch (err) {
        return res.status(404).json({ error: "Failed to fetch products" });
      }
    case "POST":
      try {
        await Product.create(req.body);
        return res.status(200).json({ message: "Product added successfully" });
      } catch (err) {
        return res.status(404).json({ error: "Product cannot be added" });
      }
    case "DELETE":
      try {
        const { id } = req.query;
        await Product.deleteOne({ id: id });
        return res
          .status(200)
          .json({ message: "Product deleted successfully" });
      } catch (err) {
        return res.status(404).json({ error: "Product cannot be deleted" });
      }
  }
}
