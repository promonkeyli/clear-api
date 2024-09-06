import { getSwaggerDoc } from "../utils/getOpenAPI";
import log from "../utils/log";

export interface ApiConfig {
  /* swagger doc 文件url */
  docUrl: string;
  /* request请求库路径 */
  requestLibPath: string;
  /* 接口服务文件夹输出路径 */
  outDir?: string;
}

export async function generateAPI(config: ApiConfig) {
  const { docUrl, requestLibPath } = config;
  const json = await getSwaggerDoc(docUrl);
  log(["openAPI 3.0 转换成功！"]);
}
