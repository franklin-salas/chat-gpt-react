
import { useState } from "react"
import { GptMessage, MyMessage, TypingLoader } from "../../components";
import { TextMessageBoxSelect } from '../../components/chat-input-boxes/TextMessageBoxSelect';
import { translateUseCase } from "../../../core";


interface Message {
  text: string;
  isGpt: boolean;
}

const languages = [
  { id: "alemán", text: "Alemán" },
  { id: "árabe", text: "Árabe" },
  { id: "bengalí", text: "Bengalí" },
  { id: "francés", text: "Francés" },
  { id: "hindi", text: "Hindi" },
  { id: "inglés", text: "Inglés" },
  { id: "japonés", text: "Japonés" },
  { id: "mandarín", text: "Mandarín" },
  { id: "portugués", text: "Portugués" },
  { id: "ruso", text: "Ruso" },
];

export const TranslatePage = () => {

  const [isloading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async( text:string , selectedOption: string) => {
      setIsLoading(true);
      setMessages((prev) => [...prev, { text:`Teduce el siguinet texto al idioma ${selectedOption} :`, isGpt:false}]);

      setMessages((prev) => [...prev, { text: text, isGpt:false}]);
      //TODO: use case
      const data = await translateUseCase(text, selectedOption); 
      //console.log({data});
    //TODO: añadir mensaje d gpt en true
    setMessages((prev) => [...prev, { text: data.message, isGpt:true}]);

      setIsLoading(false);
    
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
        <GptMessage text="¿Que quieres que traduzca hoy?"/>
        {/* 
        <MyMessage text="hola mundoooooo"/> */}
      
      {
        messages.map( (message,index) => (

          message.isGpt? 
          (<GptMessage key={index} text={message.text}/>)
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
       options={languages}
      />
    </div>
  )
}
