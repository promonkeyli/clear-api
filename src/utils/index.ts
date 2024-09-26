/**
 * 公共方法
 */
import fs from "node:fs";
import path from "node:path";

/* 检查目录是否存在 */
export function directoryExists(dirPath: string): boolean {
	return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
}

/* 删除目录中的所有内容 */
export function deleteAllInDirectory(dirPath: string) {
	if (directoryExists(dirPath)) {
		// 读取目录中的所有文件和子目录
		const files = fs.readdirSync(dirPath);

		for (const file of files) {
			const filePath = path.join(dirPath, file);
			// 检查是否是目录
			if (fs.statSync(filePath).isDirectory()) {
				// 如果是目录，递归删除内容
				deleteAllInDirectory(filePath);
				// 删除空目录
				fs.rmdirSync(filePath);
			} else {
				// 如果是文件，直接删除
				fs.unlinkSync(filePath);
			}
		}
	}
}

/* 创建目录(包括所有父目录) */
export function createAllDirectory(dirPath: string) {
	const normalizedPath = path.resolve(dirPath);
	if (!fs.existsSync(normalizedPath)) {
		createAllDirectory(path.dirname(normalizedPath));
		fs.mkdirSync(normalizedPath);
	}
}
