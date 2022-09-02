import React from "react"
import { useCss } from "react-use"

interface QAFormProps {
  question: string
  answer: string
  onAnswerUpdate?: (newAnswer: string) => void
}

export function QAForm(props: QAFormProps) {
  const wrapper = useCss({
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  })

  const question = useCss({
    fontSize: "2rem",
    textAlign: "center",
  })

  const answerInput = useCss({
    display: "block",
    margin: "0.5rem",
    borderRadius: "3px",
    fontSize: "2rem",
  })

  return (
    <div className={wrapper}>
      <div className={question}>{props.question}</div>
      <input
        className={answerInput}
        type={"text"}
        onChange={(event) => props.onAnswerUpdate(event.target.value)}
        value={props.answer}
      />
    </div>
  )
}
