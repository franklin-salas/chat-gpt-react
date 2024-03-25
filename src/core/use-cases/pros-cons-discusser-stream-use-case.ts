import { PosConsResponse } from "../../interfaces";

export const postConsDiscusserStreamUseCase = async (prompt: string) => {

    try {
        const resp = await fetch(`${import.meta.env.VITE_GPT_API}/pros-cons-discusser`,
        {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({prompt}),
            //todo: abortSignal
        });
        if(!resp.ok) throw new Error('No se pudo realizar de corrección.');
        const data = await resp.json() as PosConsResponse;

        return {
            ok: true,
            ...data
        }

    } catch (error: any) {
        return {
            ok: false,
            role: '',
            content: error.message
        }
    }    
}