import fs from "fs";
import data from "../src/data/data_clean.json" assert { type: "json" };

const destinationFilePath = "./src/data/data_new.json";

const newData = {};
data.forEach(item => {
  if (!newData[item.category]) {
    newData[item.category] = [];
  }

  newData[item.category].push(item);
});

// Write the JSON data to the destination file
fs.writeFile(destinationFilePath, JSON.stringify(newData, null, 2), err => {
  if (err) {
    console.error("Error writing file:", err);
    return;
  }

  console.log("Data copied successfully!");
});
