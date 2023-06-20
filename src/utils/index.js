import { fileURLToPath } from "url";
import { dirname } from "path";

export const getFilename = (metaUrl) => fileURLToPath(metaUrl);

export const getDirname = (metaUrl) => dirname(getFilename(metaUrl));

export class FileSystemError extends Error {
  constructor(message = 'FS operation failed') {
    super(message);
    this.name = 'FileSystemError';
  }
}
