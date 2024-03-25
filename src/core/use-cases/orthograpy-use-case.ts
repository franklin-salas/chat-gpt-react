import { OrthograpyResponse } from "../../interfaces";

export const orthograpyUseCase = async (prompt: string) => {

    try {
        const resp = await fetch(`${import.meta.env.VITE_GPT_API}/orthography-check`,
        {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({prompt})
        });
        if(!resp.ok) throw new Error('No se pudo realizar de corrección.');
        const data = await resp.json() as OrthograpyResponse;

        return {
            ok: true,
            ...data
        }

    } catch (error: any) {
        return {
            ok: false,
            userScore: 0,
            errors: [],
            correctedText:'',
            message: error.message
        }
    }    
}