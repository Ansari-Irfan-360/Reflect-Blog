import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';
dotenv.config();
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
    url: `mongodb+srv://${username}:${password}@cluster0.nu3dimf.mongodb.net/?retryWrites=true&w=majority`,
    options: { useNewUrlParser: true },
});

const upload = multer({
    storage,
    fileFilter: (request, file, callback) => {
        const match = ["image/png", "image/jpg","image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            const error = new Error('Only images are allowed!');
            callback(error, false);
        } else {
            callback(null, true);
        }
    }
});

export default upload; 
