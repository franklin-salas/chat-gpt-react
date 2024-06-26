import { PosConsResponse } from "../../interfaces";

export const postConsDiscusserStreamUseCase = async (prompt: string) => {

    try {
        const resp = await fetch(`${import.meta.env.VITE_GPT_API}/pros-cons-discusser-stream`,
        {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({prompt}),
            //todo: abortSignal
        });
        if(!resp.ok) throw new Error('No se pudo prosesar la solicitud.');
        
        const reader = resp.body?.getReader();


        if(!reader){
            return null;
        }

        return reader;
        // const decoder = new TextDecoder();
        // let text = '';
        // while(true){
        //     const {value, done} = await reader.read();
        //     if(done){
        //         break;
        //     }

        //     const decoderChunk = decoder.decode( value, {stream: true});
        //     text += decoderChunk; 
        // }

    } catch (error: any) {
        return null;
    }    
}