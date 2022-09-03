import { useCss } from "react-use"
import React, { createContext, ReactNode, useContext } from "react"

interface VirtualKeyboardContext {
  getCurrentText?: () => string
  updateText?: (newText: string) => void
}

interface VirtualKeyboardProps {
  children: ReactNode
  getCurrentText?: () => string
  onTextUpdate?: (newText: string) => void
}

const VirtualKeyboardContext = createContext<VirtualKeyboardContext>(undefined)

export function VirtualKeyboard(props: VirtualKeyboardProps) {
  const keyboardContainer = useCss({
    margin: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  })

  return (
    <VirtualKeyboardContext.Provider
      value={{
        getCurrentText: () => props.getCurrentText(),
        updateText: (newText) => props.onTextUpdate(newText),
      }}
    >
      <div className={keyboardContainer}>{props.children}</div>
    </VirtualKeyboardContext.Provider>
  )
}

interface VirtualKeyboardRowProps {
  children: ReactNode
  onTextUpdate?: (newText: string) => void
}

export function VirtualKeyboardRow(props: VirtualKeyboardRowProps) {
  const row = useCss({
    display: "flex",
    flexDirection: "row",
  })

  return <div className={row}>{props.children}</div>
}

interface VirtualKeyProps {
  displayContent: string
  textProcess?: (currentText: string) => string
}

export function VirtualKey(props: VirtualKeyProps) {
  const { updateText, getCurrentText } = useContext(VirtualKeyboardContext)

  const virtualKey = useCss({
    margin: "1px",
    height: "5rem",
    width: "5rem",
    border: "0",
    borderRadius: "3px",
    fontSize: "2rem",
    backgroundColor: "#295dc5",
    color: "#FFFFFF",
    transition: "background-color 0.2s",
    boxShadow: "0 1px 2px gray",
    "&:hover": {
      backgroundColor: "#2551a8",
    },
    "&:active": {
      backgroundColor: "#0e2960",
    },
  })

  return (
    <button
      className={virtualKey}
      onClick={() => updateText(props.textProcess(getCurrentText()))}
    >
      {props.displayContent}
    </button>
  )
}
