

import { useState } from "react"
import { GptMessage, GptMessageImage, MyMessage, TextMessageBox, TypingLoader } from "../../components";
import { imageGenerationUseCase } from "../../../core";


interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    imageUrl: string,
    alt: string
  }
}
export const ImageGenerationPage = () => {

  const [isloading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async( text:string) => {
      setIsLoading(true);
      setMessages((prev) => [...prev, { text:text, isGpt:false}]);
      //TODO: use case
      const  imageInfo = await imageGenerationUseCase(text);
      setIsLoading(false);

       //TODO: añadir mensaje d gpt en true
       if(!imageInfo){
        return setMessages((prev)=> [...prev,{text:'No se pudo generar la imagen', isGpt: true}]);
       }

       setMessages( prev => [
        ...prev,
        {
          text: text,
          isGpt: true,
          info:{
            imageUrl:imageInfo.url,
            alt: imageInfo.alt

          }
        }
       ] );

  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
        <GptMessage text="¿Qué imagen deseas generar hoy?"/>
        {/* 
        <MyMessage text="hola mundoooooo"/> */}
      
      {
        messages.map( (message,index) => (

          message.isGpt? 
          (<GptMessageImage 
            key={index}
            imageUrl={message.info?.imageUrl!}
            alt={ message.info?.alt!}
            text= {message.text}/>)
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
