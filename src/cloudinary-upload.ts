import cloudinary, {
  UploadApiResponse,
  UploadApiErrorResponse,
} from 'cloudinary';

interface IFileOptions {
  public_id?: string;
  overwrite?: boolean;
  invalidate?: boolean;
  chunk_size?: number;
  resource_type: 'image' | 'video' | 'raw' | 'auto';
}

const upload = (
  file: string,
  options: IFileOptions
): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> => {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file,
      { ...options },
      (
        error: UploadApiErrorResponse | undefined,
        result: UploadApiResponse | undefined
      ) => {
        if (error) resolve(error);
        resolve(result);
      }
    );
  });
};

export function uploads(
  file: string,
  public_id?: string,
  overwrite?: boolean,
  invalidate?: boolean
): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
  return upload(file, {
    public_id,
    overwrite,
    invalidate,
    resource_type: 'auto',
  });
}

export function videoUpload(
  file: string,
  public_id?: string,
  overwrite?: boolean,
  invalidate?: boolean
): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
  return upload(file, {
    public_id,
    overwrite,
    invalidate,
    chunk_size: 50000, // large files are devided into 50MB chunk
    resource_type: 'video',
  });
}
