const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const host = "0.0.0.0";
const port = process.env.PORT || 3005;

app.use(cors());
app.use(bodyParser.json());

app.locals.data = [{ type: "human", name: "Chris" }];

app.get("/data", (request, response) => {
  return response.status(200).json(app.locals.data);
});

app.post("/data", (request, response) => {
  const newData = request.body;
  let missingProperties = [];
  for (let requiredProperty of ["name", "type"]) {
    if (!newData[requiredProperty]) {
      missingProperties = [...missingProperties, requiredProperty];
      return response
        .status(422)
        .send({ error: `Missing Properties ${missingProperties}` });
    }
    app.locals.data.push(newData);
    return response.status(201).json("Data succesfully added!");
  }
});

app.listen(port, host, function() {
  console.log("Server started.......");
});
