
import { useState } from "react"
import { GptMessage, MyMessage,  TextMessageBoxFile, TypingLoader } from "../../components";
import { audioToTextUseCase } from "../../../core";


interface Message {
  text: string;
  isGpt: boolean;
}
export const AudioToTextPage = () => {

  const [isloading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async( text:string, audioFile:File) => {
      setIsLoading(true);
      setMessages((prev) => [...prev, { text:text, isGpt:false}]);
      //TODO: use case
      const resp = await audioToTextUseCase(audioFile,text);
      setIsLoading(false);
       if(!resp) return;

       const gptMessage = `### Transcripción:
**Duración:** ${ Math.round( resp.duration*100 )/100  } segundos
### El texto es:
${ resp.text }
       `
       
       
           setMessages( (prev) => [
             ...prev,
             { text: gptMessage, isGpt: true }
           ]);
      
           for( const segment of resp.segments ) {
             const segmentMessage = `**De ${ Math.round( segment.start*100 )/100 } a ${ Math.round( segment.end*100 )/100 } segundos:**
${ segment.text }
       `
       
             setMessages( (prev) => [
               ...prev,
               { text: segmentMessage, isGpt: true }
             ]);
           }

  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
        <GptMessage text="¿Que audio quieres transcribir?"/>
        {/* 
        <MyMessage text="hola mundoooooo"/> */}
      
      {
        messages.map( (message,index) => (

          message.isGpt? 
          (<GptMessage key={index} text={message.text}/>)
          :(<MyMessage key={index} text= {message.text== ''? 'Transcribe el audio': message.text} />)
        ))

      }
      {
        isloading && (<div className="col-start-1 col-end-11 fade-in">
        <TypingLoader />
        </div>)
      }

        
        </div>
      </div>

      <TextMessageBoxFile
      onSendMessage={ handlePost}
      placeholder="Escribe aquí lo que deseas"
      accept="audio/*"
      disableCorrections
      />
    </div>
  )
}
