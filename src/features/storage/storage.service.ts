import { BadRequestException, Injectable } from "@nestjs/common";
import { initializeApp } from "firebase/app";
import * as pdfLib from "pdf-lib";
import { getMetadata } from "docx-templates";
import * as JSZip from "jszip";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";

@Injectable()
export class StorageService {
  constructor() {
    const firebaseConfig = {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTHDOMAIN,
      projectId: process.env.PROJECTID,
      storageBucket: process.env.STORAGEBUCKET,
      messagingSenderId: process.env.MESSAGINGSENDERID,
      appId: process.env.APPID,
      measurementId: process.env.MEASUREMENTID,
    };
    initializeApp(firebaseConfig);
  }

  async uploadFile(file: Express.Multer.File) {
    try {
      const pages = await this.getPages(file);
      const storage = getStorage();
      const storageRef = ref(storage);

      const metadata = {
        contentType: file.mimetype, // Đảm bảo lưu đúng loại file
      };
      const key = `${Date.now()}-${file.originalname}`;

      const name = file.originalname;

      const snapshot = await uploadBytes(
        ref(storageRef, key),
        file.buffer,
        metadata,
      );
      const path = await getDownloadURL(snapshot.ref);

      const size = snapshot.metadata.size;

      return {
        size: await this.formatSize(size),
        path,
        key,
        name,
        pages,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async deleteFile(key: string) {
    const storage = getStorage();

    // Create a reference to the file to delete
    const desertRef = ref(storage, key);

    // Delete the file
    try {
      await deleteObject(desertRef);
      return { message: "Xóa file thành công" };
    } catch (error) {
      throw new BadRequestException(`Không tìm thấy file ${key}`);
    }
  }

  async getPages(file: Express.Multer.File) {
    const mimeType = file.mimetype;

    let pages = 0;
    switch (mimeType) {
      case "application/pdf":
        // xử lí PDF
        const pdfBuffer = file.buffer;
        const pdfDoc = await pdfLib.PDFDocument.load(pdfBuffer);
        pages = pdfDoc.getPages().length;
        break;
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        // Xử lý Word
        const metaData = await getMetadata(file.buffer);
        pages = metaData.pages;

        break;
      case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        const zip = await JSZip.loadAsync(file.buffer);
        const slides = Object.keys(zip.files).filter(
          (filename) =>
            filename.startsWith("ppt/slides/slide") &&
            filename.endsWith(".xml"),
        );
        pages = slides.length;

        break;
      case "image/jpeg":
      case "image/png":
      case "image/gif":
      case "image/bmp":
      case "image/tiff":
        pages = 1;
        break;

      default:
        // await this.deleteFile(key); // xóa file nếu không được hỗ trợ
        throw new BadRequestException("Loại tệp không được hỗ trợ " + mimeType);
    }
    return pages;
  }

  async formatSize(size: number): Promise<string> {
    if (size < 1024) {
      return `${size} B`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`;
    } else if (size < 1024 * 1024 * 1024) {
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    } else {
      return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    }
  }
}
