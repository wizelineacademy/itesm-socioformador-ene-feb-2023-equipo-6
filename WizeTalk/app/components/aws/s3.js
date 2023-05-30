import { s3GetTranscript } from "./getTranscript";

export function s3Upload(blob, name, keys) {
  AWS.config.region = keys.AWS_REGION;
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: keys.COGNITO_POOLID,
  });
  AWS.config.apiVersions = {
    s3: "2006-03-01",
  };
  var s3 = new AWS.S3({
    params: {
      Bucket: keys.BUCKET_MP4,
    },
  });
  s3.putObject(
    {
      Key: name,
      Body: blob,
      ContentType: "video/mp4",
    },
    (err) => {
      if (err) {
        // On Error
        console.log(err);
      } else {
        // On Success
        console.log("S3 Success");
        const segundos = 10000;
        console.log("Espera " + segundos / 1000 + " segundos.");
        setTimeout(() => {
          s3GetTranscript(name, keys);
        }, segundos);
      }
    }
  );
}
