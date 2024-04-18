

export async function* postConsDiscusserStreamGeneratorUseCase(prompt: string , abortAsignal:AbortSignal) {

    try {
        const resp = await fetch(`${import.meta.env.VITE_GPT_API}/pros-cons-discusser-stream`,
        {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({prompt}),
            //todo: abortSignal
            signal: abortAsignal
        });
        if(!resp.ok) throw new Error('No se pudo prosesar la solicitud.');
        
        const reader = resp.body?.getReader();

        if(!reader){
            return null;
        }

        const decoder = new TextDecoder();
        let text = '';
        while(true){
            const {value, done} = await reader.read();
            if(done){
                break;
            }

            const decoderChunk = decoder.decode( value, {stream: true});
            text += decoderChunk; 
            yield text;
        }

    } catch (error: any) {
        return null;
    }    
}