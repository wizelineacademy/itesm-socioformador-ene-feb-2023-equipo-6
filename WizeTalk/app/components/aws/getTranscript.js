export function s3GetTranscript(name) {
  return new Promise((resolve, reject) => {
    AWS.config.region = process.env.AWS_REGION;
    AWS.config.update({
      credentials: {
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
      },
    });
    var s3 = new AWS.S3({
      params: {
        Bucket: process.env.BUCKET_TXT,
        Key: name.replace(/\.mp4$/, "") + "_transcription.txt",
      },
    });
    s3.getObject((err, data) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(data.Body.toString("utf8"));
      }
    });
  });
}
