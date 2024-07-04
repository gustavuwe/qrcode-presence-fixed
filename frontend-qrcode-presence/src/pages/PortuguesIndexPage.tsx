import React, { useEffect, useCallback } from "react";
import { useState } from "react";
import QRCode from "qrcode";
import axios from "axios";

export default function IndexPage() {
  const [src, setSrc] = useState<string>("");
  const [isAlreadyGenerated, setIsAlreadyGenerated] = useState(false);

  // async function getCode() {
  //   const response = await axios.get("localhost:3000/code");
  //   return response;
  // }

  // async function generate(code?: string) {
  //   if (code) {
  //     await QRCode.toDataURL(`http://localhost:5173/portugues/${code}`).then(setSrc);
  //   }
  //   // QRCode.toDataURL(`http://localhost:5173/portugues/registrar-presenca`).then(setSrc);
  //   const newCode = getCode()
  //   await QRCode.toDataURL(`http://localhost:5173/portugues/${newCode}`).then(setSrc);
  //   setIsAlreadyGenerated(true);
  // }

  const getCode = useCallback(async () => {
    const response = await axios.post("http://localhost:3000/code", {
      discipline: "portugues",
      class_id: "2e7b239f-f0e6-4ad2-99ca-90b0871b1fb2"
    });
    return response
  }, [])

  const generate = useCallback(async (code?: string) => {
    if (code) {
        await QRCode.toDataURL(`http://localhost:5173/portugues/${code}`).then(setSrc);
    } else {
        const newCode = await getCode();
        await QRCode.toDataURL(`http://localhost:5173/portugues/${newCode}`).then(setSrc);
        setIsAlreadyGenerated(true);
    }
  }, [setSrc, getCode, setIsAlreadyGenerated])

  useEffect(() => {
    if (isAlreadyGenerated) { // if the admin user already clicked to generate then set inverval of 15s
      setInterval(() => {
        async function generateUsingCode() {
          const code = await getCode();
          await generate(String(code));
        }
        generateUsingCode()
      }, 15000);
    }
    }, [isAlreadyGenerated, generate, getCode]);

  return (
    <>
      <header className="header-index">
        <h1>QRPoint</h1>
      </header>
      <body>
        <div className="qr-content-container">
          {src && (
            <>
              <img src={src} alt="qrcode-image" />
            </>
          )}
          <h2>Gere o QR-Code</h2>
          <button type="button" onClick={() => generate()}>
            Gerar QRCODE
          </button>
        </div>
      </body>
    </>
  );
}