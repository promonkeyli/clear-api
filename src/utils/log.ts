import chalk, { type ColorName } from "chalk";
/**
 * @desc 使用chalk库美化日志记录
 * @param { string[] } rest - 打印字符串数组
 * @param { ColorName } color - 打印字体颜色
 */
export default function (rest: string[], color: ColorName = "green") {
  return console.log(`${chalk[color]("[API]: ")}${rest.join("\n")}`);
}
