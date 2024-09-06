import { generateAPI } from "../lib/generateAPI";

(() => {
  const BASE_URL = "https://promonkeyli.top:8080";
  generateAPI({
    docUrl: `${BASE_URL}/swagger/doc.json`,
    requestLibPath: 'import request from "@/utils/http"',
  });
})();
