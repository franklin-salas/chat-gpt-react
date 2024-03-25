import { useState } from "react"
import { GptMessage, GptOrthograpyMessage, MyMessage, TextMessageBox, TextMessageBoxFile, TextMessageBoxSelect, TypingLoader } from "../../components"
import { orthograpyUseCase } from "../../../core";

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    userScore:     number;
    errors:        string[];
    correctedText: string;
    message:       string;
  }
}
export const OrthographyPage = () => {

  const [isloading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async( text: string) => {
      setIsLoading(true);
      setMessages((prev) => [...prev, { text:text, isGpt:false}]);
      //TODO: use case

        const data = await orthograpyUseCase(text); 
        //console.log({data});
    if(!data.ok) {
      setMessages((prev) => [...prev, { text: data.message, isGpt:true}]);
    }else 
    {
      setMessages((prev) => [...prev, { text: data.message, isGpt:true,
      info:{
        userScore:     data.userScore,
        errors:        data.errors,
        correctedText: data.correctedText,
        message:       data.message
      }
       

      
    }]);

    }


      setIsLoading(false);
       //TODO: añadir mensaje d gpt en true
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
        {/* <Gpt text="hola mundoooooo"/> */}
        {/* 
        <MyMessage text="hola mundoooooo"/> */}
      
      {
        messages.map( (message,index) => (

          message.isGpt? 
          (<GptOrthograpyMessage key={index}  
          {...message.info!}/>)
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

{/* <TextMessageBoxFile 
      onSendMessage={ handlePost}
      placeholder="Escribe aquí lo que deseas"
      
      /> */}

{/* <TextMessageBoxSelect 
      onSendMessage={ handlePost}
      placeholder="Escribe aquí lo que deseas"
      disableCorrections
      options={[{id:'1', text:'hola'}, {id:'2', text:'mundo'}]}
      /> */}


    </div>
  )
}
