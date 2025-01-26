import Product from "@/models/ProductsModel";

export default async function handler(req, res) {
  await Product.create(req.body).then(() => res.send("Completed Uploading"));
}
