const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.locals.data = [{ type: "human", name: "Chris" }];

app.get("/data", (request, response) => {
  response.status(200).json(app.locals.data);
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

app.listen(3001, () => console.log("Listening on port 3001"));
