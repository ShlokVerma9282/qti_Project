import "dotenv/config";
import express from "express";
import cors from "cors";
import multer, { memoryStorage } from "multer";
import { getUserPresignedUrls, uploadToS3 } from "./s3.mjs";

const app = express();

const PORT = process.env.PORT || 4000;

const storage = memoryStorage();
const upload = multer({ storage });

app.use(
  cors({
    origin: "*",
  })
);

app.post("/media", upload.single("media"), async (req, res) => {
  try {
    const { file } = req;
    const userId = req.headers["x-user-id"];

    if (!file || !userId) return res.status(400).json({ message: "Bad request" });

    const key = await uploadToS3({ file, userId });
    return res.status(201).json({ key });
  } catch (error) {
    console.error("Error uploading to S3:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/media", async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];

    if (!userId) {
      console.error("Missing 'x-user-id' header");
      return res.status(400).json({ message: "Bad request" });
    }

    const presignedUrls = await getUserPresignedUrls(userId);
    return res.json(presignedUrls);
  } catch (error) {
    console.error("Error fetching presigned URLs:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
