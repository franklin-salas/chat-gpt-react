import Markdown from "react-markdown"

interface Props {
  userScore:     number;
  errors:        string[];
  correctedText: string;
  message:       string;
  }

export const GptOrthograpyMessage = ({ userScore,errors, correctedText, message }: Props) => {
  return (
    <div className="col-start-1 col-end-9 p-3 rounded-lg">
    <div className="flex flex-row items-start">
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0">
        G
      </div>
      <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl">
        <h3 className="text-2xl">Puntaje: {userScore}
        </h3>
        <p>{message}</p>
        {
          (errors.length === 0)?
          <p>No se encontraron errores.</p>
          :
          <>
          <h3 className="text-xl">Errores encontrados</h3>
          <ul>
            {
              errors.map( (error, i) => (
                <li key={i}>
                  {error}
                </li>
              ))

            }
          </ul>
          </>
        }
        <h3 className="text-xl"> Texto corregido
        </h3>
        <p>{correctedText}</p>
  
      </div>
  
    </div>



  </div>
  )
}