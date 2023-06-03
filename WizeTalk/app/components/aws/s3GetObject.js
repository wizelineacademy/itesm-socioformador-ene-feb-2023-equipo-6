export function s3Get(fileName) {
  return new Promise((resolve, reject) => {
    AWS.config.region = "us-east-1";
    AWS.config.update({
      credentials: {
        accessKeyId: "AKIAZNA3GHX5H7A5UX53",
        secretAccessKey: "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",
      },
    });
    var s3 = new AWS.S3({
      params: {
        Bucket: "wizetalkinput",
        Key: fileName,
      },
    });
    s3.getObject((err, data) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        const blob = new Blob(
          [
            new Uint8Array(
              data.Body.buffer,
              data.Body.byteOffset,
              data.Body.byteLength
            ),
          ],
          {
            type: "video/mp4",
          }
        );
        resolve(blob);
      }
    });
  });
}
