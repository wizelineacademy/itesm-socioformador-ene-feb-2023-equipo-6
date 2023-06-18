import { Configuration, OpenAIApi } from 'openai';


export async function getEnglishScore(transcript, question, keys, user_id){
    const configuration = new Configuration({
        apiKey: keys.OPEN_AI,
    });
    const openai = new OpenAIApi(configuration);


    const prompt = "Assume the role of an english teacher. You have to give a score from 0 to 100 the vocabulary, grammar and coherence of the following answer: '" + transcript + "' to the following question '" + question + '" . Just provide me as answer a json as the following: {"vocabulary": 0, "grammar":0, "coherence":0}, do not justify.'; 
    console.log(prompt); 

    const score = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ApiKeyHelper.getKey()}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        max_tokens: 2048,
        temperature: 0.7,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    console.log("Resultado en openai/aws: ", score); 
    const englishScoresPre = score.data.choices[0].text; 
    const eng = englishScoresPre.replace(/[\n\s]/g, ''); 
    const englishScores = JSON.parse(eng); 
    const result = englishScores; 

    return result; 
    
}

export async function getSoftSkills(transcript, question, keys, user_id){
    const configuration = new Configuration({
        apiKey: keys.OPEN_AI,
    });
    const openai = new OpenAIApi(configuration);

    const prompt = "Assume the role of a recruiter for a tech company. You have to give a score from 0 to 100 the vocabulary, grammar and coherence of the following answer that must be in english: '" + transcript + "' to the following question '" + question + '" . Also identify 5 softskills detected in the answer, do not bias by the words the person used to detect the softskills, separate them with a coma and the softskills composed by two or more words use space like the following "Good Communication". Just provide me as answer a json as the following: {"vocabulary": 100, "grammar":100, "coherence":100, "softskills": "Leadership, Commitment, Attention To Detail, Problem-Solving, Caring"}, do not justify.'; 
    console.log(prompt); 

    const score = await openai.createChatCompletion(
      JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: prompt}],
      })
    );

    console.log("Resultado en openai/aws: ", score.data.choices[0].message); 
    const englishScoresPre = score.data.choices[0].message.content; 
    const eng = englishScoresPre.replace(/[\n\s]/g, ''); 
    const englishScores = JSON.parse(eng); 
    const result = englishScores; 

    return result; 
    
}

export async function getTechSkills(transcript, question, keys, user_id, value){
    const configuration = new Configuration({
        apiKey: keys.OPEN_AI,
    });
    const openai = new OpenAIApi(configuration);

/*     console.log("Question in OPENAI: ", question);  */

    const prompt = "Assume the role of a recruiter for a tech company. You have to give a score from 0 to 100 the vocabulary, grammar and coherence of the following answer: '" + transcript + "' to the following question '" + question + '" . Also score from 0 to ' + value + ' if the given answer responded correctly the question asked, save that score as the overall variable in the JSON you provide. Just provide me as answer a json as the following: {"vocabulary": 100, "grammar":100, "coherence":100, "overall": 10}, do not justify.'; 
    console.log(prompt); 
    const score = await openai.createChatCompletion(
      JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: prompt}],
      })
    );
    console.log("Resultado en openai/aws: ", score); 
    const techScore = score.data.choices[0].message.content; 
    const noSpaceScore = techScore.replace(/[\n\s]/g, ''); 
    const result = JSON.parse(noSpaceScore); 
    
    return result; 
    
}

export async function getFinalSoftSkills(keys, softskills){
  const configuration = new Configuration({
      apiKey: keys.OPEN_AI,
  });
  const openai = new OpenAIApi(configuration);

/*     console.log("Question in OPENAI: ", question);  */

  const prompt = "Assume the role of a recruiter for a tech company. From the following softskills " + softskills + " select the 5 that are more repeated and consider the most important, your final answer must be the softskills separated by a comma the softskills composed by two or more words use space like the following 'Good Communication', just provide the list of softskills in the final answer"; 
  console.log(prompt); 
  const score = await openai.createChatCompletion(
    JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: prompt}],
    })
  );
  console.log("Resultado en openai/aws: ", score); 
  const englishScoresPre = score.data.choices[0].message.content; 
  const eng = englishScoresPre.replace(/[\n\s]/g, ''); 

  return eng; 
  
}