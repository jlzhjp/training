import React, { useState } from "react"
import { useCss } from "react-use"
import { QAForm } from "../components/QAForm"
import {
  VirtualKey,
  VirtualKeyboard,
  VirtualKeyboardRow,
} from "../components/VirtualKeyboard"
import { contentCenter } from "../styles"

export function BinHexConversion() {
  const appendText = (x: string) => (currentText: string) => currentText + x
  const [answerText, setAnswerText] = useState<string>("")
  const splitContainer = useCss({
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  })

  const qaView = useCss({
    flexGrow: "1",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
  })

  const keyboardView = useCss({
    backgroundColor: "#c8c8c8",
    ...contentCenter,
  })

  const keys = [
    ["0", "1", "2", "3"],
    ["4", "5", "6", "7"],
    ["8", "9", "A", "B"],
    ["C", "D", "E", "F"],
  ]

  const virtualKeys = keys.map((row) => (
    <VirtualKeyboardRow>
      {row.map((key) => (
        <VirtualKey displayContent={key} textProcess={appendText(key)} />
      ))}
    </VirtualKeyboardRow>
  ))

  return (
    <div className={splitContainer}>
      <div className={qaView}>
        <QAForm
          question="测试"
          answer={answerText}
          onAnswerUpdate={(newText) => setAnswerText(newText)}
        />
      </div>
      <div className={keyboardView}>
        <VirtualKeyboard
          getCurrentText={() => answerText}
          onTextUpdate={(newText) => setAnswerText(newText)}
        >
          {virtualKeys}
        </VirtualKeyboard>
      </div>
    </div>
  )
}
