import cloudinary from "../config/cloudinary.js";


export const uploadImage = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded", error: true });
    }
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "toadsters_images",
    });

    res.status(200).json({
      message: "Image uploaded successfully",
      url: result.secure_url,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true });
  }
};


export const imageUpload = async (req, res) => {
  try {
    res.status(200).json({
      message: 'File uploaded successfully',
      file: req.file
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

