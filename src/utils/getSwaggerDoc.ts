import swagger2openapi from "swagger2openapi"
/**
 * @desc 根据 swagger doc url 获取 swagger json数据
 */
export async function getSwaggerDoc(url: string){
    try {
        const json = await fetch(url).then((r) => r.json());
        if(!json) return null
        return await unifyOpenAPI(json)
    }catch (e){
        console.log("fetch swagger doc error", e);
    }
};

/**
 * @desc 统一OpenAPI为OpenAPI3.0（有些可能使用的是2.0旧版本的文档）
 */
export function unifyOpenAPI (json: any) {
    if(!json.swagger){
        return json
    }else {
        return new Promise( function (resolve, reject){
            console.log(json);
            swagger2openapi.convertObj(json, {}, function (err, result) {
                if(err){
                    reject(err)
                    return
                }
                resolve(result.openapi)
            })
        })
    }
}
