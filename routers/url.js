const express = require("express");
const router = express.Router();

const validUrl = require("valid-url");
const shortId = require("shortid");
const config = require("config");

const Url = require("../model/URL");



router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });
    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json("No URL Found");
    }
  } catch (error) {
    return res.status(500).json("Server Error");
  }
});


router.post("/shorten", async (req, res) => {



 
  const { longUrl } = req.body;
  const baseUrl = config.get("baseURL");

  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid Base URL");
  }

  const urlCode = shortId.generate().substring(0, 6);

 

  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });
      if (url) {
        res.json(url);
      }else{
        const shotUrl = baseUrl + '/' + urlCode

        url = new Url ({
            longUrl,
            shotUrl,
            urlCode,
        });
        await url.save();

        res.json(url);
      }
      
    } catch (error) {
      return res.status(500).json("Server Error");
    }
  } else {
    return res.status(401).json("Invalid Long URL Input");
  }
});



module.exports = router;
