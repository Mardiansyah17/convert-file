var express = require("express");
var router = express.Router();
const imgToPDF = require("image-to-pdf");
const fs = require("fs");
const upload = require("../middleware/storage");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/upload", upload.array("file"), (req, res) => {
  const timestamp = Date.now();
  const filepath = `./public/pdf/${timestamp}.pdf`;
  let pages = [];
  req.files.forEach((file) => {
    pages.push(file.path);
  });
  try {
    imgToPDF(pages, imgToPDF.sizes.A4).pipe(fs.createWriteStream(filepath));
    console.log(pages);
    return res.json({ pathFile: timestamp });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/download", (req, res) => {
  try {
    // let tesd = encodeURIComponent(req.params.path);
    console.log(req.query);
    return res.download(`./public/pdf/${req.query.path}.pdf`);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
