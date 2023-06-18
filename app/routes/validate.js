import { json } from "@remix-run/node";

export async function action({ request }) {
    if (request.method !== 'POST') {
        throw json(
        {
            message: 'Invalid request method',
        },
            { status: 400 });
    }

    else{
        const userSession = await requireUserSession(request); 
    
        const userTest = await prisma.user.findUnique({
            where: {
                id: userSession,
            }
        }); 
    
        //Extraer preguntas por primera vez
        if(userTest.status == (0 || 1)){
            return redirect("/evaluation/questions"); 
        }

        else{
            return redirect("/evaluation/results; ")
        }
    }
    
}