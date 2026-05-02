const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const router = express.Router();

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const requiredCloudinaryEnv = [
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET'
];

const maxFileSizeMb = Number(process.env.MAX_UPLOAD_SIZE_MB || 15);
const maxFileSizeBytes = maxFileSizeMb * 1024 * 1024;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: maxFileSizeBytes
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error('Only JPG, PNG, and WebP images are allowed'));
    }

    cb(null, true);
  }
});

const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'portfolio',
        resource_type: 'image'
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      }
    );

    stream.end(file.buffer);
  });
};

const getCloudinaryConfigError = () => {
  const missingEnv = requiredCloudinaryEnv.filter((key) => !process.env[key]);

  if (!missingEnv.length) {
    return null;
  }

  return `Missing Cloudinary environment variables: ${missingEnv.join(', ')}`;
};

// @desc    Upload image to Cloudinary
// @route   POST /api/upload
router.post('/', (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error('Upload Error:', err);

      if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({
          message: `Image is too large. Maximum upload size is ${maxFileSizeMb}MB.`,
          error: err.message
        });
      }

      const statusCode = err instanceof multer.MulterError ? 400 : 415;
      return res.status(statusCode).json({
        message: 'Image upload failed',
        error: err.message
      });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const configError = getCloudinaryConfigError();

    if (configError) {
      console.error('Cloudinary Config Error:', configError);
      return res.status(500).json({
        message: 'Cloudinary is not configured',
        error: configError
      });
    }

    uploadToCloudinary(req.file)
      .then((result) => {
        res.send({
          message: 'Image uploaded successfully',
          image: result.secure_url
        });
      })
      .catch((uploadError) => {
        const httpCode = uploadError.http_code || uploadError.httpCode;
        const isCloudinaryAuthError = httpCode === 401 || httpCode === 403;

        console.error('Cloudinary Upload Error:', {
          message: uploadError.message,
          http_code: httpCode,
          name: uploadError.name
        });

        res.status(isCloudinaryAuthError ? 502 : 500).json({
          message: isCloudinaryAuthError
            ? 'Cloudinary rejected the upload. Check the Cloudinary credentials and account upload permissions.'
            : 'Cloudinary Upload Error',
          error: uploadError.message,
          http_code: httpCode
        });
      });
  });
});

module.exports = router;
