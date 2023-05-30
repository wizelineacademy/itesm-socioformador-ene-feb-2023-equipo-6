export function s3GetTranscript(name, keys) {
  return new Promise((resolve, reject) => {
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
