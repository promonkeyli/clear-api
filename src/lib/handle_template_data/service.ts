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
	/* api 请求体body是否存在 */
	hasBody: boolean;
	/* api 请求体body类型 */
	bodyType: string;
	/* api 查询参数params是否存在 */
	hasParams: boolean;
	/* api 查询参数params类型 */
	paramsType: ParamsType;
}
interface ParamsType {
	/* 是否存在路径path参数 */
	inPath: boolean;
	/* 查询path参数数组 */
	pathArr: Array<any>;
	/* 是否存在查询query参数 */
	inQuery: boolean;
	/* 查询query参数数组 */
	queryArray: Array<any>;
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
				hasBody: true,
				bodyType: "s",
				hasParams: true,
				paramsType: {
					inPath: true,
					pathArr: [],
					inQuery: true,
					queryArray: [],
				},
			};
			apiData.push(apiDataItem);
		}
	}
	return {
		requestLibPath,
		apiData,
	};
}
