/**
 * 公共方法
 */
import fs from "node:fs";
import path from "node:path";
import type { PathItem, Schema } from "./openAPI_type.js";

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

/* openAPI schema type => typeScript 类型 */
export function convertSchemaToTypeScript(schema: Schema): string {
	switch (schema.type) {
		case "string":
			return "string";
		case "number":
			return "number";
		case "integer":
			return "number"; // TypeScript 中 integer 也用 number 表示
		case "boolean":
			return "boolean";
		case "array":
			if (schema.items) {
				return `${convertSchemaToTypeScript(schema.items)}[]`;
			}
			return "any[]";
		case "object":
			if (schema.properties) {
				const properties = Object.entries(schema.properties)
					.map(([key, value]) => `${key}: ${convertSchemaToTypeScript(value)}`)
					.join("; ");
				return `{ ${properties} }`;
			}
			return "{}";
		default:
			if (schema.enum) {
				return schema.enum.map((value) => JSON.stringify(value)).join(" | ");
			}
			return "any"; // 默认返回 any 类型
	}
}

/* openapi 按照tag 分类paths */
export function getPathsByTag(
	tag: string,
	paths: { [path: string]: PathItem },
): { [path: string]: PathItem } {
	const filterPaths: { [path: string]: PathItem } = {};
	for (const pathKey in paths) {
		const pathValue = paths[pathKey];
		const [_, firstValue] = Object.entries(pathValue)[0];
		const currentTag = firstValue.tags[0];
		if (currentTag === tag) {
			filterPaths[pathKey] = pathValue;
		}
	}
	return filterPaths;
}
