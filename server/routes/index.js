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
    pages.forEach((file) => {
      fs.unlink(file, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`${file} was deleted`);
        }
      });
    });
    return res.json({ pathFile: timestamp });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/download", (req, res) => {
  try {
    const file = `./public/pdf/${req.query.path}.pdf`;
    res.download(file, (err) => {
      if (err) {
        throw err;
      } else {
        // fs.unlink(file, (err) => {
        //   if (err) throw err;
        //   console.log(`${file} was deleted`);
        // });
      }
    });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
