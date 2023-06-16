import { fileURLToPath } from "url";
import { dirname } from "path";

export const getFilename = (metaUrl) => fileURLToPath(metaUrl);

export const getDirname = (metaUrl) => dirname(getFilename(metaUrl));
