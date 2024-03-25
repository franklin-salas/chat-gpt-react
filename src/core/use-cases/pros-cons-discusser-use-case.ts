import { PosConsResponse } from "../../interfaces";

export const postConsDiscusserUseCase = async (prompt: string) => {

    try {
        const resp = await fetch(`${import.meta.env.VITE_GPT_API}/pros-cons-discusser`,
        {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({prompt})
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