/**
 * 处理 service 文件的模版数据
 */
import type { Operation, PathItem } from "../../utils/openAPI_type.js";

interface ServiceTplData {
	/* 请求库引用路径 */
	requestLibPath: string;
	/* 接口数据 */
	apiData: ApiDataItem[];
}
interface ApiDataItem {
	/* api名称 */
	name: string;
	/* api描述 */
	description: string;
	/* api路径 */
	path: string;
	/* api请求方法 */
	method: string;
}

export function handleServiceTemplateData(
	requestLibPath: string,
	paths: { [path: string]: PathItem },
): ServiceTplData {
	const apiData: ApiDataItem[] = [];
	for (const pathKey in paths) {
		const pathValue = paths[pathKey];
		for (const methodKey in pathValue) {
			const operation = pathValue[methodKey] as Operation;
			const apiDataItem: ApiDataItem = {
				name: operation.operationId, // 生成的函数名称
				description: operation.description, // 函数的描述
				path: pathKey, // 请求url
				method: methodKey, // 请求方法
			};
			console.log(typeof operation.description);
			apiData.push(apiDataItem);
		}
	}
	return {
		requestLibPath,
		apiData,
	};
}
