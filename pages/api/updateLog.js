import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ status: "failed", message: "Method not allowed" });
  }

  // Get id and reading from the request
  const id = req.body.id;
  const reading = parseFloat(req.body.reading);

  // Check if reading empty or undefined
  if (reading === "" || reading < 0 || !reading) {
    return res
      .status(401)
      .json({ status: "failed", message: "No reading provided." });
  }

  // Check if reading is valid
  if (!isInt(reading) && !isFloat(reading)) {
    return res.status(401).json({
      status: "failed",
      message: "Reading should be a number.",
    });
  }

  try {
    // Add reading to db log
    await prisma.meterLog.update({
      where: {
        id: id,
      },
      data: {
        reading,
      },
    });

    return res
      .status(200)
      .json({ status: "success", message: "Reading updated!" });
  } catch (e) {
    // Handling DB write error
    const errorData =
      e.meta && e.meta.target
        ? e.meta.target.map((item) => `${item} already exists.`)
        : "An error occurred.";
    return res.status(404).json({ status: "failed", message: errorData });
  }
}

function isInt(n) {
  return Number(n) === n && n % 1 === 0;
}

function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}
