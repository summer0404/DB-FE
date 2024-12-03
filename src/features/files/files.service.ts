import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from "@nestjs/common";
import { UpdateFileDto } from "./dto/updateFile.dto";
import { FILE_REPOSITORY } from "src/common/constants";
import { Files } from "./files.entity";
import { UsersService } from "../users/users.service";
import { StorageService } from "../storage/storage.service";
import { MoviesService } from "../movies/movies.service";
import { Transaction } from "sequelize";

@Injectable()
export class FilesService {
  constructor(
    @Inject(FILE_REPOSITORY)
    private readonly fileRepository: typeof Files,
    private readonly userService: UsersService,
    private readonly storageService: StorageService,
    @Inject(forwardRef(() => MoviesService))
    private readonly movieService: MoviesService,
  ) {}

  async createFile(
    id: string,
    files: Array<Express.Multer.File>,
    transaction: Transaction,
  ): Promise<Files> {
    const existingMovie = await this.movieService.getByIdTransaction(
      id,
      transaction,
    );
    if (existingMovie) {
      for (let i in files) {
        const uploadCloud = await this.storageService.uploadFile(files[i]);
        const createdFile = await this.fileRepository.create(
          {
            ...uploadCloud, // dữ liệu trả về từ storage service
            movieId: id,
          },
          { transaction },
        );
      }
      return null;
    } else {
      const existingUser = await this.userService.findOne(id);
      if (!existingUser)
        throw new BadRequestException("Không tìm thấy đối tượng phù hợp");
      for (let i in files) {
        const uploadCloud = await this.storageService.uploadFile(files[i]);
        const createdFile = await this.fileRepository.create(
          {
            ...uploadCloud, // dữ liệu trả về từ storage service
            userId: id,
          },
          { transaction },
        );
      }

      return null;
    }
  }

  async createFileFastfood(
    id: string,
    file: Express.Multer.File,
    transaction: Transaction,
  ): Promise<Files> {
    const uploadCloud = await this.storageService.uploadFile(file);
    const createdFile = await this.fileRepository.create(
      {
        ...uploadCloud, // dữ liệu trả về từ storage service
        fastfoodId: id,
      },
      { transaction },
    );

    return null;
  }

  async findById(id: string): Promise<Files> {
    const file: Files = await this.fileRepository.findByPk(id);
    if (!file) {
      throw new BadRequestException("Không tìm thấy file");
    }
    return file;
  }

  async findAll(): Promise<Files[]> {
    return await this.fileRepository.findAll();
  }

  async findForMovie(movieId: string): Promise<Files[]> {
    const files = await this.fileRepository.findAll({ where: { movieId } });
    if (!files)
      throw new BadRequestException("Không tìm thấy các files tương ứng");
    return files;
  }

  async findForUser(userId: string): Promise<Files> {
    const file = await this.fileRepository.findOne({ where: { userId } });
    if (!file)
      throw new BadRequestException("Không tìm thấy các files tương ứng");
    return file;
  }

  async deleteFile(id: string) {
    const file = await this.fileRepository.findByPk(id);
    await this.storageService.deleteFile(file.key);
    this.fileRepository.destroy({
      where: { id },
    });
    return null;
  }

  async findByUserId(userId: string) {
    return this.fileRepository.findAll({
      where: { userId },
    });
  }

  async updateFile(id: string, updateFileDto: UpdateFileDto) {
    const file = await this.fileRepository.findByPk(id);
    if (!file) {
      throw new BadRequestException("Không tìm thấy file");
    }
    await this.fileRepository.update(updateFileDto, { where: { id } });
  }
}
