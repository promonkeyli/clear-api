import { convertOpenAPI } from "./convertOpenAPI";

/**
 * @desc 根据 swagger doc url 获取 swagger json数据
 */
export async function getSwaggerDoc(url: string) {
  try {
    const json = await fetch(url).then((r) => r.json());
    if (!json) return null;
    return await convertOpenAPI(json);
  } catch (e) {
    console.log("fetch swagger doc error", e);
  }
}
