
import { useState } from "react"
import { GptMessage, GptMessageAudio, MyMessage, TypingLoader } from "../../components";
import { TextMessageBoxSelect } from '../../components/chat-input-boxes/TextMessageBoxSelect';
import { textToAudioUseCase,  } from "../../../core";


interface TextMessage {
  text: string;
  isGpt: boolean;
  type:'text'
}

interface AudioMessage {
  text: string;
  isGpt: boolean;
  audio: string;
  type:'audio';
}

type Message = TextMessage | AudioMessage

const displaimer = `## ¿Qué audio quieres generar?
* Todo audio es generdo por IA.`
const voices = [
  { id: "nova", text: "Nova" },
  { id: "alloy", text: "Alloy" },
  { id: "echo", text: "Echo" },
  { id: "fable", text: "Fable" },
  { id: "onyx", text: "Onyx" },
  { id: "shimmer", text: "Shimmer" },
]

export const TextToAudioPage = () => {

  const [isloading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async( text:string , selectedVoice: string) => {
      setIsLoading(true);
    
      setMessages((prev) => [...prev, { text: text, isGpt:false, type: 'text'}]);
      //TODO: use case
      const {ok, message, audioUrl} = await textToAudioUseCase(text, selectedVoice); 
      
    if(!ok) return;
    setMessages((prev) => [...prev, { text:`${selectedVoice} - ${message}`, isGpt:true,type:'audio', audio:audioUrl!}]);

      setIsLoading(false);
    
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
        <GptMessage text={displaimer}/>
        {/* 
        <MyMessage text="hola mundoooooo"/> */}
      
      {
        messages.map( (message,index) => (

          message.isGpt? 
          (
            message.type==="audio"? (
              <GptMessageAudio key={index}
              text={message.text}
              audio={message.audio}
              />
            ):(
              <GptMessage key={index} text= {message.text} /> 
            )

          )
          :(<MyMessage key={index} text= {message.text} />)
        ))

      }
      {
        isloading && (<div className="col-start-1 col-end-11 fade-in">
        <TypingLoader />
        </div>)
      }

        
        </div>
      </div>

      <TextMessageBoxSelect
      onSendMessage={ handlePost}
      placeholder="Escribe aquí lo que deseas"
       options={voices}
      />
    </div>
  )
}
