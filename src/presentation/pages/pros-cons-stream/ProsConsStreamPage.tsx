
import { useRef, useState } from "react"
import { GptMessage, MyMessage, TextMessageBox, TypingLoader } from "../../components";
import { postConsDiscusserStreamGeneratorUseCase, postConsDiscusserStreamUseCase, postConsDiscusserUseCase } from "../../../core";


interface Message {
  text: string;
  isGpt: boolean;
}
export const ProsConsStreamPage = () => {

  const abortController = useRef(new AbortController());
  const isRunning = useRef(false);
  const [isloading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async( text:string) => {

    if(isRunning.current){
      abortController.current.abort();
      abortController.current = new AbortController();

    }
      setIsLoading(true);
      isRunning.current= true;
      setMessages((prev) => [...prev, { text:text, isGpt:false}]);
      //TODO: use case
     const stream =  postConsDiscusserStreamGeneratorUseCase(text, abortController.current.signal); 

      setIsLoading(false);
      setMessages((prev) => [...prev, { text:'', isGpt:true}]);

      for await ( const text of stream){
            setMessages((messages) => {
          const newmessages = [...messages];
          newmessages[newmessages.length - 1].text = text;
          return newmessages;
        });
      }
      isRunning.current= false;
    //  const reader = await postConsDiscusserStreamUseCase(text); 

    //   setIsLoading(false);
    //    //TODO: añadir mensaje d gpt en true

    //    if(!reader){
    //     setMessages((prev) => [...prev, { text:"::: Error preguntar de nuevo.", isGpt:true}]);
    //   return; 
    //   }
    //   const decoder = new TextDecoder();
    //   let message = '';
    //   setMessages((prev) => [...prev, { text:message, isGpt:true}]);
    //   while(true){
    //     const {value, done} = await reader.read();
    //     if(done){
    //       break;
    //     }

    //     const decodeChunk = decoder.decode(value, {stream:true});
    //     message += decodeChunk;
    //     setMessages((messages) => {
    //       const newmessages = [...messages];
    //       newmessages[newmessages.length - 1].text = message;
    //       return newmessages;
    //     });
    //   }

  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
        <GptMessage text="¿Que deseas comparar hoy?"/>
        {/* 
        <MyMessage text="hola mundoooooo"/> */}
      
      {
        messages.map( (message,index) => (

          message.isGpt? 
          (<GptMessage key={index} text= {message.text}/>)
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
