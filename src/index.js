import { exec } from "node:child_process";
import * as process from "node:process";
export function generateAPI(options) {
    const { docUrl, requestLibPath } = options;
    let execCommand;
    if (options.outDir) {
        execCommand = `./api -docUrl="${docUrl}" -requestLibPath="${requestLibPath}" -outDir="${options.outDir}"`;
    }
    else {
        execCommand = `./api -docUrl="${docUrl}" -requestLibPath="${requestLibPath}"`;
    }
    exec(execCommand, (error, stdout, stderr) => {
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
    });
}
