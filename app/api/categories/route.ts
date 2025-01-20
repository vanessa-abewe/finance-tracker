import { NextApiRequest, NextApiResponse } from "next";
import { ICategory } from "../../models/category";

const categories: ICategory[] = []; 

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(categories);
  } else if (req.method === "POST") {
    const { name, } = req.body;
    const newCategory = { _id: Date.now().toString(), name, createdAt: new Date(), updatedAt: new Date() } as ICategory;
    categories.push(newCategory);
    res.status(201).json(newCategory);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
