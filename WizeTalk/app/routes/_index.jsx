import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react"

const firstSystemPrompt = "You are interviewing someone for a job.";
const secondSystemPrompt = "You have asked the following question: How do you prioritize your tasks and manage your time effectively? Can you give an example of a project where you had to manage multiple tasks and deadlines?.";
const userPrompt = "Which soft skills (write only 3 of them and separate them with a comma) can you detect from the following response to the question: My role was to develop the front-end of the project, and I had to work closely with the back-end developers and project manager. I made sure to communicate regularly with the team to ensure that we were all aligned with the project goals and timelines. During the development process, I encountered some roadblocks and had to find a workaround, so I proposed a solution and collaborated with my teammates to implement it. Through open communication and teamwork, we were able to complete the project on time and exceed the client's expectations.";

export async function loader(){
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages : [
        {"role": "system", "content": firstSystemPrompt},
        {"role": "system", "content": secondSystemPrompt},
        {"role": "user", "content": userPrompt},
    ]
    })
  }
  );
  

  return json(await res.json());
}

export default function Index() {  

  const data = useLoaderData();
  return (
    <div className="p-6">
      <div className="pl-10 pr-10 pb-5">
          <div>System Prompt: </div>
          <div className="bg-emerald-100 p-5">
            {secondSystemPrompt}
          </div>
      </div>
      <div className="pl-10 pr-10 pb-5">
        <div>User Prompt: </div>
        <div className="bg-emerald-100 p-5">
          {userPrompt}
        </div>
      </div>
      <div className="pl-10 pr-10 pb-5">
        <div>Detection of soft skills from ChatGPT: </div>
        <div className="bg-emerald-100 p-5">
          {data.choices[0].message.content}
        </div>
      </div>
    </div>
  );
}
