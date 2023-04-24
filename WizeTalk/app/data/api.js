import { Configuration, OpenAIApi } from 'openai';
//const fs = require('fs');

export async function getTranscript(blob){
    
    const configuration = new Configuration({
      apiKey: "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",
  });
  //console.log(audioBlub);
    const openai = new OpenAIApi(configuration);

   
  
    const resp = await openai.createTranscription(
      blob,
      'whisper-1'
    )
  
    console.log(resp);
    return blob;
}
  
   