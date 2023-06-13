import { useSubmit } from "@remix-run/react";

export function testAction(){
    const submit = useSubmit(); 

    submit(null, {method: "POST"}); 
}