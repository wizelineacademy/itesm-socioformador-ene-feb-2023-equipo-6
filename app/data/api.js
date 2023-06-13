import { Configuration, OpenAIApi } from 'openai';

export async function getTranscript(blob){
    //const fs = require('fs');
    
    const configuration = new Configuration({
      apiKey: "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",
  });
  //console.log(audioBlub);
    const openai = new OpenAIApi(configuration);

    //const file = fs.readFileSync("public/test.mp3");
  
    var resp = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'GET',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer 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'
        },
        body: {
          file: blob,
          model: "whisper-1"
        }
      })
  
    console.log(resp);
    return resp;
}
  
   