import React from "react"
import { createRoot } from "react-dom/client"
import { BinHexConversion } from "./routes/BinHexConversion"

const root = createRoot(document.querySelector("#root"))
root.render(<BinHexConversion/>)
