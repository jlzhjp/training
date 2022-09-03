import React from "react"
import { useCss } from "react-use"

interface AnswerInputProps {
  isAnswerCorrect: boolean
  answerText: string
  onAnswerUpdate?: (newAnswer: string) => void
}

export default function AnswerInput(props: AnswerInputProps) {
  const inputStyle = useCss({
    display: "block",
    fontSize: "2rem",
    border: `3px solid ${props.isAnswerCorrect ? "green" : "red"}`,
    borderRadius: "10px",
    padding: "1rem"
  })

  return (
    <input
      className={inputStyle}
      type={"text"}
      value={props.answerText ?? ""}
      onChange={(event) => {
        props.onAnswerUpdate(event.target.value)
      }}
    ></input>
  )
}
