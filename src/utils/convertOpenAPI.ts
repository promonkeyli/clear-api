import swagger2openapi from "swagger2openapi";

/**
 * @desc 统一OpenAPI为OpenAPI3.0（有些可能使用的是2.0旧版本的文档）
 */
export function convertOpenAPI(json: any) {
  if (!json.swagger) {
    return json;
  }
  return new Promise((resolve, reject) => {
    swagger2openapi.convertObj(json, {}, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result.openapi);
    });
  });
}
