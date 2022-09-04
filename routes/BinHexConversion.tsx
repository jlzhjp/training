import React, { useEffect, useMemo, useState } from "react"
import { useCss, useToggle } from "react-use"
import AnswerInput from "../components/AnswerInput"
import Flyout from "../components/Flyout"
import {
  VirtualKey,
  VirtualKeyboard,
  VirtualKeyboardRow,
} from "../components/VirtualKeyboard"
import { contentCenter } from "../styles"

export function BinHexConversion() {
  const [question, setQuestion] = useState<string>("")
  const [answerText, setAnswerText] = useState<string>("")

  const correctAnswer = useMemo(() => {
    const dec = parseInt(question, 16)
    return dec.toString(2)
  }, [question])

  const parseAnswer = (rawAnswer: string) => {
    if (rawAnswer == "") {
      return rawAnswer
    }
    const parsedAnswer = rawAnswer.trim().replace(/^0+/, "")
    if (parsedAnswer === "") {
      return "0"
    }
    return parsedAnswer
  }

  const isAnswerCorrect = useMemo(
    () => parseAnswer(answerText) === correctAnswer,
    [answerText, correctAnswer]
  )

  const appendText = (x: string) => (currentText: string) => currentText + x

  const nextQuestion = () => {
    const hex = Math.floor(Math.random() * 16)
    setQuestion(hex.toString(16).toUpperCase())
    setAnswerText("")
  }

  useEffect(() => nextQuestion(), [])

  useEffect(() => {
    if (isAnswerCorrect) {
      const timeoutId = setTimeout(() => nextQuestion(), 1000)
      return () => clearTimeout(timeoutId)
    }
  }, [isAnswerCorrect])

  const [isFlyoutShow, toggleFlyout] = useToggle(false)

  const splitContainer = useCss({
    display: "flex",
    flexDirection: "column",
    height: "100%",
  })

  const qaView = useCss({
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    padding: "2rem",
  })

  const keyboardView = useCss({
    flexGrow: "1",
    backgroundColor: "#ececec",
    ...contentCenter,
  })

  const questionDisplay = useCss({
    fontSize: "2rem",
    fontWeight: "medium",
    textAlign: "center",
    margin: "0.5rem",
  })

  const keys = [
    ["0", "1", "2", "3"],
    ["4", "5", "6", "7"],
    ["8", "9", "A", "B"],
    ["C", "D", "E", "F"],
  ]

  const virtualKeys = keys.map((row) => (
    <VirtualKeyboardRow key={row.reduce((p, c) => p + c)}>
      {row.map((key) => (
        <VirtualKey
          key={key}
          displayContent={key}
          textProcess={appendText(key)}
        />
      ))}
    </VirtualKeyboardRow>
  ))

  return (
    <>
      <button onClick={toggleFlyout}>Toggle</button>
      <Flyout show={isFlyoutShow} onScrimClick={toggleFlyout}>
        <div>Hello</div>
      </Flyout>
      <div className={splitContainer}>
        <div className={qaView}>
          <div className={questionDisplay}>{question}</div>
          <AnswerInput
            answerText={answerText}
            isAnswerCorrect={isAnswerCorrect}
            onAnswerUpdate={(newAnswer) => setAnswerText(newAnswer)}
          />
        </div>

        <div className={keyboardView}>
          <VirtualKeyboard
            getCurrentText={() => answerText}
            onTextUpdate={(newText) => setAnswerText(newText)}
          >
            {virtualKeys}
            <VirtualKeyboardRow>
              <VirtualKey
                displayContent="BS"
                textProcess={(currentText) => currentText.slice(0, -1)}
              />
              <VirtualKey displayContent="CLS" textProcess={(_) => ""} />
            </VirtualKeyboardRow>
          </VirtualKeyboard>
        </div>
      </div>
    </>
  )
}
