import React, { ReactNode, useEffect, useMemo, useState } from "react"
import { useCss, useToggle } from "react-use"

interface FlyoutProps {
  show: boolean
  children: ReactNode
  onScrimClick: () => void
}

export default function Flyout(props: FlyoutProps) {
  const [display, toggleDisplay] = useToggle(props.show)
  const [containerAnimation, setContainerAnimation] = useState("")
  const [scrimAnimation, setScrimAnimation] = useState("")

  useEffect(() => {
    if (display) {
      setContainerAnimation("slideOutBottom")
      setScrimAnimation("fadeOut")
      const timeoutId = setTimeout(() => toggleDisplay(), 600)
      return () => clearTimeout(timeoutId)
    } else {
      toggleDisplay()
      setContainerAnimation("slideInBottom")
      setScrimAnimation("fadeIn")
    }
  }, [props.show])

  const scrim = useCss({
    animation: scrimAnimation,
    animationTimingFunction: "cubic-bezier(0.2, 0.91, 0.36, 1)",
    animationDuration: "600ms",
    display: display ? "block" : "none",
    position: "fixed",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  })

  const contentContainer = useCss({
    display: display ? "block" : "none",
    position: "fixed",
    height: "70%",
    width: "100%",
    backgroundColor: "white",
    bottom: "0",
    animation: containerAnimation,
    animationDuration: "600ms",
    boxShadow: "-3px 0px 29px 0px rgba(0, 0, 0, 0.2)",
    animationTimingFunction: "cubic-bezier(0.2, 0.91, 0.36, 1)",
    zIndex: 9,
  })

  return (
    <>
      <div className={scrim} onClick={props.onScrimClick}></div>
      <div className={contentContainer}>{props.children}</div>
    </>
  )
}
