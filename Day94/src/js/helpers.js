import { async } from "regenerator-runtime";
import { TIMEOUT_SEC } from "./config.js";

const timeout = function () {
  return new Promise((_, reject) => {
    setTimeout(function () {
      reject(
        new Error(
          `Request took too long to load. Time out after ${TIMEOUT_SEC} seconds`
        )
      );
    }, TIMEOUT_SEC * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const datas = await res.json();
    if (!res.ok) throw new Error(`${datas.message} Status (${res.status})`);
    return datas;
  } catch (err) {
    throw err;
  }
};
