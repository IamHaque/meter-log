import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(404).json({ data: "Route not defined" });
  }

  // Get id from the request
  const { id } = req.query;

  // Return if id or scores are not provided
  if (id === "" || !id) {
    return res.status(401).json({ status: "failed", data: "Not log found" });
  }

  try {
    // Get log data from db
    const log = await prisma.meterLog.findUnique({
      where: {
        id: id,
      },
    });

    // Return if no log found in DB
    if (!log) {
      return res.status(303).json({ status: "failed", data: "Not log found" });
    }

    return res.status(200).json({ status: "success", data: log });
  } catch (e) {
    return res.status(404).json({ data: "Route not defined" });
  }
}
