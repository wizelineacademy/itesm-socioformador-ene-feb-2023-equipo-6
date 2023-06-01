import { prisma } from "../../data/database.server";
import { getInfo } from "../../data/evaluation.server";

export async function s3GetTranscript(name, keys, _question_id, _user_id) {
  //getInfo();
  //console.log("Prisma Test: ");  
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
      } else {
        console.log(data.Body.toString("utf8"));
        const transcript = data.Body.toString("utf8"); 
        /*prisma.questions.update({
          where: {
            question_id: _question_id, 
            user_id: _user_id,
          },
          data:{
            transcript: transcript,
          }
        });*/
        /*prisma.questions.upsert({
         where: {
          question_id: _question_id, 
          user_id: _user_id,
         }, 
         update: {
          transcript: transcript
         },
         create: {
          question_id: _question_id, 
          user_id: _user_id, 
          score: 0, 
          transcript: transcript, 
          video_path: '',
         }
        });*/
        console.log('Updated Questions'); 
        return transcript; 
      }
    });
  /*return new Promise((resolve, reject) => {
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
        Key: name.replace(/\.mp4$/, "") + "_transcription.txt",
      },
    });
    s3.getObject((err, data) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(data.Body.toString("utf8"));
        prisma.questions.update(where)
      }
    });
  });*/
}
