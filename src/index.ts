import { exec } from "node:child_process";
import * as process from "node:process";

export interface GenerateAPIOptions {
    /* openAPI 文档地址 */
    docUrl: string
    /* 请求库路径 */
    requestLibPath: string
    /* api文件输出目录(默认根目录) */
    outDir?: string
}

export function generateAPI(options: GenerateAPIOptions){
    const { docUrl, requestLibPath } = options
    let execCommand: string
    if( options.outDir ){
        execCommand = `./api -docUrl="${docUrl}" -requestLibPath="${requestLibPath}" -outDir="${options.outDir}"`
    } else {
        execCommand = `./api -docUrl="${docUrl}" -requestLibPath="${requestLibPath}"`
    }
    exec(
        execCommand,
        (error, stdout, stderr) => {
            if (error) {
                console.log(process.cwd());
                console.error(`Error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Stderr: ${stderr}`);
                return;
            }
            console.log(`Stdout: ${stdout}`);
        },
    );
}
