/**
 * 处理 service 文件的模版数据
 */
import type { OpenAPI3 } from "../../utils/openAPI_type.js";

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
}

export function handleServiceTemplateData(
	requestLibPath: string,
	tag: string,
	openAPI: OpenAPI3,
): ServiceTplData {
	const apiData: ApiDataItem[] = [];
	return {
		requestLibPath,
		apiData,
	};
}
