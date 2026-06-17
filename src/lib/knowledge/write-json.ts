import { mkdir, rename, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

export async function writeJsonAtomic(
  filepath: string,
  data: unknown,
): Promise<void> {
  await mkdir(path.dirname(filepath), { recursive: true });
  const tempPath = `${filepath}.${process.pid}.tmp`;
  const payload = `${JSON.stringify(data, null, 2)}\n`;

  try {
    await writeFile(tempPath, payload, "utf8");
    await rename(tempPath, filepath);
  } catch (error) {
    await unlink(tempPath).catch(() => undefined);
    throw error;
  }
}
