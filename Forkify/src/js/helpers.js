import { TIMEOUT_SECONDS } from "./config";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async (url) => {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]);
    const data = await res.json();
  
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
  
    return data;
  } catch(err) {
    throw err;
  }
}

export const sendJSON = async (url, uploadData) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uploadData)
    });

    const result = await res.json();
    
    if (!res.ok) throw new Error(`${res.message} (${res.status})`);
  
    return result;
  } catch(err) {
    throw err;
  }
}