import { useCallback, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

export default function PortuguesPresenca() {
  const { code } = useParams()
  const [matricula, setMatricula] = useState("");
  const [isValidURL, setIsValidURL] = useState(true)
  const [redirect, setRedirect] = useState(false);

  const makeRequest = useCallback(async () => {
    try {
      const responseVerifyCode = axios.post("http://localhost:3000/code", {
        discipline: "portugues",
        class_id: "2e7b239f-f0e6-4ad2-99ca-90b0871b1fb2"
      }).then((response) => {
        console.log(response.data.code[0].code) // correct form
        if (code !== response.data.code[0].code) {
          setIsValidURL(false)
        }
      })
    } catch (err) {
      console.error(err)
    }
  })

  const verifyAlreadyGeneratedCode = useCallback(async () => {
    try {
      const responseAlreadyGeneratedCode = axios.post("http://localhost:3000/listcode", {
        discipline: "portugues",
        class_id: "2e7b239f-f0e6-4ad2-99ca-90b0871b1fb2"
      }).then((response) => {
        console.log(response.data.getCode[0].code) // correct form
        if (code !== response.data.getCode[0].code) {
          setIsValidURL(false)
        }
      })
    } catch (err) {
      console.error(err)
    }
  })

  useEffect(() => {
    verifyAlreadyGeneratedCode()
    setInterval(() => {
      makeRequest()
    }, 20000) // after 20 seconds then execute
    // const code = request()
    // console.log(code)
  }, [code, makeRequest])

  async function validatePresence(event) {
    event.preventDefault();
    

    // const response = await fetch("http://localhost:3000/portugues", {
    //   method: "PATCH",
    //   body: JSON.stringify({ matricula }),
    //   headers: { "Content-Type": "Application/Json" },
    //   credentials: "include",
    // });

    const url = "http://localhost:3000/portugues";

    const response = await axios
      .patch(url, {
        matricula: matricula,
      })
      .then((response) => {})
      .catch();

    // if (response.ok) {
    //   response.json().then(() => {
    //     setRedirect(true);
    //   });
    // } else {
    //   alert("Matricula não cadastrada em nosso banco de dados!"); // trocar depois
    // }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  if (!isValidURL) {
    return <div><h1>Código expirado!</h1></div>
  }

  return (
    <main>
      <form className="info" onSubmit={validatePresence}>
        <h1 className="form-h1">Matricula</h1>
        <input
          className="matricula-input"
          type="text"
          placeholder="Digite a sua matricula"
          value={matricula}
          onChange={(event) => setMatricula(event.target.value)}
        />
        <button className="sendButton">Registrar Presenca</button>
      </form>
    </main>
  );
}
