const multipart = require("parse-multipart");
const fetch = require("node-fetch");
module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  // here's your boundary:
  const boundary = multipart.getBoundary(req.headers["content-type"]);

  // TODO: assign the body variable the correct value
  const body = req.body;

  // parse the body
  const parts = multipart.Parse(body, boundary);

  let emotions = result[0].faceAttributes.emotion;

  const main_emotion = Object.keys(emotions).find(
    (key) => emotions[key] === Math.max(...objects)
  );
  //module.exports function
  //analyze the image
  const result = await analyzeImage(parts[0].data);
  context.res = {
    body: {
      main_emotion,
    },
  };
  console.log(result);
  context.done();
};

async function analyzeImage(img) {
  const subscriptionKey = process.env.SUBSCRIPTIONKEY;
  const uriBase = process.env.ENDPOINT + "/face/v1.0/detect";

  let params = new URLSearchParams({
    returnFaceId: "true",
    returnFaceAttributes: "emotion", //FILL IN THIS LINE
  });

  //COMPLETE THE CODE
  let resp = await fetch(uriBase + "?" + params.toString(), {
    method: "POST", //WHAT TYPE OF REQUEST?
    body: img, //WHAT ARE WE SENDING TO THE API?
    headers: {
      "Content-Type": "application/octet-stream",
      "Ocp-Apim-Subscription-Key": subscriptionKey, //do this in the next section
    },
  });
  let data = await resp.json();

  return data;
}
