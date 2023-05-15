export function s3Upload(blob) {

  AWS.config.update({ region: "us-east-1" });

  /*var creds = new AWS.Credentials("akid", "secret", "session");

  AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000",
    credentials: creds,
  });
  
  AWS.config.update({
    credentials: {
      accessKeyId: "AKIAZNA3GHX5JR46XS6S",
      secretAccessKey: "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",
    },
  });
  */
  
  // Inicializar el proveedor de credenciales de Amazon Cognito
  AWS.config.region = "us-east-1"; // Región
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-east-1:f76af4b2-04c2-46e4-b76b-2b19cf73204b",
  });
  AWS.config.apiVersions = {
    s3: "2006-03-01",
  };
  var s3 = new AWS.S3({
    params: {
      Bucket: "wizetalk",
    },
  });
  s3.putObject(
    {
      Key: "Test1.mp4",
      Body: blob,
      ContentType: "video/mp4",
      //ACL: "public-read",
    },
    (err) => {
      if (err) {
        // On Error
        console.log(err);
      } else {
        // On Success
        console.log("S3 Success");
      }
    }
  );
}
