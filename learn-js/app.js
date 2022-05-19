// const dbURL = "http://localhost:3000/info";

// start();
// function start() {
//   renderInfo();
//   handleAddInfo();
// }

// function getDB(callback) {
//   fetch(dbURL)
//     .then((json) => {
//       return json.json();
//     })
//     .then(callback);
// }

// function renderInfo() {
//   getDB((data) => {
//     let title = document.querySelector("#title");
//     let html = [];
//     data.forEach((value) => {
//       html.push(`<li>${value.name} - ${value.description}</li>\n`);
//     });
//     title.innerHTML = html.join("");
//   });
// }

// function createInfo(data, callback) {
//   fetch(dbURL, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   }).then(callback);
// }

// function handleAddInfo() {
//   const btn = document.querySelector("button");
//   btn.addEventListener("click", () => {
//     const name = document.querySelector("input[name=name]").value;
//     const description = document.querySelector("input[name=description]").value;
//     createInfo({ name: name, description: description }, () => {
//       renderInfo();
//     });
//   });
// }

import logger from "./logger.js";
import { TYPE_WARN } from "./logger.js";

logger(typeof TYPE_WARN);
