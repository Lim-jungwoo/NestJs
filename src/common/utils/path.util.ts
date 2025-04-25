import * as path from 'path';
import * as fs from 'fs';
import { CustomException } from '../exceptions/custom-exception';

export function resolvePathSafe(filePath: string): string {
  const resolvedPath = path.resolve(process.cwd(), filePath);
  if (!fs.existsSync(resolvedPath)) {
    throw new CustomException('KEY_FILE_NOT_FOUND', 500);
  }
  return resolvedPath;
}
