import { useState } from "react"
import { GptMessage, MyMessage, TextMessageBox, TypingLoader } from "../components";


interface Message {
  text: string;
  isGpt: boolean;
}
export const ChatTemplate = () => {

  const [isloading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async( text:string) => {
      setIsLoading(true);
      setMessages((prev) => [...prev, { text:text, isGpt:false}]);
      //TODO: use case

      setIsLoading(false);
       //TODO: añadir mensaje d gpt en true
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
        <GptMessage text="hola mundoooooo"/>
        {/* 
        <MyMessage text="hola mundoooooo"/> */}
      
      {
        messages.map( (message,index) => (

          message.isGpt? 
          (<GptMessage key={index} text="hola mundoooooo"/>)
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

      <TextMessageBox 
      onSendMessage={ handlePost}
      placeholder="Escribe aquí lo que deseas"
      disableCorrections
      />
    </div>
  )
}
