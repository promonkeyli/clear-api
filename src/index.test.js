import { generateAPI } from "./index.js";

const docUrl = 'https://petstore.swagger.io/v2/swagger.json'
const requestLibPath = "import request from '@/utils/http'"
const outDir = 'service'

generateAPI({docUrl, requestLibPath, outDir})
