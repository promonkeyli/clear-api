import exec from "node:child_process";
// 定义参数
const docUrl = "https://petstore.swagger.io/v2/swagger.json";
const requestLibPath = "import request from '@/utils/http';";
const outDir = "service";
// 执行 Go 程序，并传入参数
// @ts-ignore
exec(`api -docUrl="${docUrl}" -requestLibPath="${requestLibPath}" -outDir="${outDir}"`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
    }
    console.log(`Stdout: ${stdout}`);
});
