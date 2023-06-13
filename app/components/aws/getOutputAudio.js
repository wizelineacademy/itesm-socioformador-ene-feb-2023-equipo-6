export function getOutputAudio(name, keys) {
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
            Bucket: keys.BUCKET_MP3,
            Key: name,
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
  