import { TranslateResponse} from "../../interfaces";


export const translateUseCase = async (prompt: string , lang:String) => {

    try {
        const resp = await fetch(`${import.meta.env.VITE_GPT_API}/translate`,
        {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({prompt , lang})
        });
        if(!resp.ok) throw new Error('No se pudo traducir el texto.');
        const data = await resp.json() as TranslateResponse;

        return {
            ok: true,
            ...data
        }

    } catch (error: any) {
        return {
            ok: false,
            message: error.message
        }
    }    
}