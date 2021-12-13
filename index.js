var express = require("express");
var app = express();
var cors = require("cors");

app.use(cors());

const formidable = require("formidable");
const cloudinary = require("cloudinary");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.post("/upload", function (req, res) {
  const form = formidable({ multiples: false });

  form.parse(req, (err, fields, file) => {
    if (err) {
      next(err);
      return;
    }

    cloudinary.v2.uploader.upload(
      file.file.filepath,
      fields,
      function (error, result) {
        if (result) {
          res.status(200).send({ response: result });
        }
      }
    );
  });
});

app.get("/get-files", function (req, res) {
  cloudinary.v2.api.resources_by_tag(
    "portfolio",
    { resource_type: "video" },
    function (error, result) {
      if (result) {
        res.status(200).send({ response: result });
      }
    }
  );
});

const port = process.env.PORT || 8000;

app.listen(port, function () {
  console.log("Example app listening on port 8000.");
});
