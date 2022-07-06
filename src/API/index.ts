import mock from "./mock.json";

export const request = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1) {
        resolve(mock);
      } else {
        reject(new Error("Error"));
      }
    }, 3000);
  });
};
