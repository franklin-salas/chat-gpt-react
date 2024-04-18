


import { useState } from "react"
import { GptMessage, GptMessageImage, MyMessage, TextMessageBox, TypingLoader } from "../../components";
import { imageGenerationUseCase, imageVariationUseCase } from "../../../core";


interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    imageUrl: string,
    alt: string
  }
}
export const ImageTunningPage = () => {

  const [isloading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [origialImageAndMask,setOrigialImageAndMask] = useState({
    original: undefined as string | undefined,
    mask: undefined as string | undefined,

  })

  const handleVariation = async() => {

    setIsLoading(true);

    const res = await imageVariationUseCase(origialImageAndMask.original!);
    setIsLoading(false);
    if(!res) return;

    setMessages( (prev) => [
      ...prev,
    {
      text: 'Variation',
      isGpt: true,
      info:{
        imageUrl: res.url,
        alt: res.alt
      }
    }])
  }
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
    <>
    {
      (
        origialImageAndMask.original && (
          <div className="fixed flex flex-col items-center top-10 right-10 z-10 fade-in">
            <span>Editando</span>
            <img
            className="border rounded-xl w-36 h-36 object-cover"
            src={origialImageAndMask.original}
            alt="Imagen original"
            />
            <button className="btn-primary mt-2"
            onClick={handleVariation}
            >Generar variación</button>
          </div>
        )
      )
    }

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
            text= {message.text}
            onImageSelected={ (url) => setOrigialImageAndMask({
              original: url,
              mask: undefined
            })}
            
            />)
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
    </>




   
  )
}
