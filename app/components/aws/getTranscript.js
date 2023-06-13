import { getEnglishScore } from "../../data/openai";

export function s3GetTranscript(name, keys, question, _user_id) {
  return new Promise((resolve, reject) => {
    var AWS = require("aws-sdk");
    console.log("STEP 2");
    console.log("Question in getTranscript 1: ", question);
    AWS.config.region = keys.AWS_REGION;
    AWS.config.update({
      credentials: {
        accessKeyId: keys.AWS_KEY,
        secretAccessKey: keys.AWS_SECRET,
      },
    });
    var s3 = new AWS.S3({
      params: {
        Bucket: keys.BUCKET_TXT,
        Key: name.replace(/\.mp4$/, "") + "_transcription.txt",
      },
    });

    async function triggerScore(transcript, question, keys, _user_id) {
      const scores = await getEnglishScore(
        transcript,
        question,
        keys,
        _user_id
      );
      console.log("Scores from getTranscript: ", scores);
      return [transcript, scores];
    }

    s3.getObject((err, data) => {
      if (err) {
        console.log(err);
        reject(err); // Reject the promise in case of an error
      } else {
        console.log(data.Body.toString("utf8"));
        const transcript = data.Body.toString("utf8");
        trans = transcript;
        resolve(trans); // Resolve the promise with the transcript value
      }
    });
  });
}
