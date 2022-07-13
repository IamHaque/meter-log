import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ status: "failed", message: "Method not allowed" });
  }

  // Get id from the request
  const id = req.body.id;

  try {
    // Add reading to db log
    await prisma.meterLog.delete({
      where: {
        id: id,
      },
    });

    return res.status(200).json({ status: "success", message: "Log deleted!" });
  } catch (e) {
    return res
      .status(404)
      .json({ status: "failed", message: "Failed to delete log!" });
  }
}
