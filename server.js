const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.locals.data = [{ type: "human", name: "Chris" }];

// app.get("/data", (request, response) => {
//   return response.status(200).json(app.locals.data);
// });

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

app.listen(process.env.PORT || 3005);
