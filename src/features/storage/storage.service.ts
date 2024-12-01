import { Injectable } from '@nestjs/common';
import { initializeApp } from 'firebase/app';
import { Express } from 'express';

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

  async upLoadFile(file: Express.Multer.File) {
    // const pages = await this.getPages(file);
    // const storage = getStorage();
    // const storageRef = ref(storage);
    // const metadata = {
    //   contentType: file.mimetype, // Đảm bảo lưu đúng loại file
    // };
    // const key = `${Date.now()}-${file.originalname}`;
    // const name = file.originalname;
    // const snapshot = await uploadBytes(
    //   ref(storageRef, key),
    //   file.buffer,
    //   metadata,
    // );
    // const path = await getDownloadURL(snapshot.ref);
    // const size = snapshot.metadata.size;
    // return {
    //   size: await this.formatSize(size),
    //   path,
    //   key,
    //   name,
    //   pages,
    // };
  }
}
