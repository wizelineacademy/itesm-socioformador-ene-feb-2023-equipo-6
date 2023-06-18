import { useEffect, useState } from "react";
import { OpenAIApi, Configuration } from "openai";


export default function Api(){
const [transcript, setTranscriptState] = useState('null'); 

const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);

function resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 2000);
    });
  }

    useEffect(
        function(){
            var trans; 
            async function Smth(){
                const res = await openai.createChatCompletion({
                    model: "gpt-3.5-turbo",
                    messages: [{role: "user", content: "Score from 1 to 10 the grammar, vocabulary, coherence and overall english level of the following using the format 'Grammar: , Vocabulary: , Coherence: , Overall english: ': " + "Motivating and inspiring others is a crucial aspect of leadership. I believe that the key to motivating others is to understand their individual goals and aspirations, and to work with them to create a plan to achieve those goals. This requires active listening, clear communication, and a genuine interest in their success. I also believe in leading by example, setting high standards for myself and others, and recognizing and rewarding good performance. Celebrating achievements, providing constructive feedback, and creating a positive work environment are also important tools in motivating and inspiring others. Ultimately, I strive to build a culture of trust, respect, and collaboration, where everyone is empowered to achieve their full potential"}],
                    max_tokens: 250
              });
              setTranscriptState(res.data.choices[0].message.content);
            }
            Smth(); 
        }
        , []
    )

    return(
        <>
        <p>{transcript}</p>
        </>
    )
};


