import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import PortuguesIndexPage from './pages/PortuguesIndexPage'
import PortuguesPresenca from "./pages/PortuguesPresenca"
import IndexPage from "./pages/PortuguesIndexPage";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

// TODO: 

function App() {
  const [code, setCode] = useState("")
  const navigate = useNavigate();

  const getCodeWithApi = useCallback(async () => {
    try {
      const response = await axios.post("http://localhost/3333/listcode", {
        body: {
            discipline: "portugues",
            class_id: "2e7b239f-f0e6-4ad2-99ca-90b0871b1fb"
        }
      })
  
      const getCode = response.data.getCode
  
      setCode(getCode)

      // Navigate to the dynamic route with the new code
      navigate(`/portugues/${getCode}`)
    } catch (err) {
      console.error("Error fetching code:", err)
    }
  }, [navigate])

  useEffect(() => {
      setInterval(() => {
        getCodeWithApi()
      }, 15000);
    })

  return (
    <>
      <Routes>
        <Route path="/" element={ < IndexPage/> } />
        <Route path="/portugues" element={ <PortuguesIndexPage /> } />
        <Route path="/portugues/:code" element={ <PortuguesPresenca /> } />
      </Routes>
    </>
  )
}

export default App;
