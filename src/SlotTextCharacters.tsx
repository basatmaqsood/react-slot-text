import type React from "react"
import { useEffect, useState, useRef, type CSSProperties } from "react"
import "./styles.css"


export type EasingType = "bounce" | "elastic" | "smooth" | "sharp" | "linear"

export interface SlotTextCharactersProps {
  text: string
  duration?: number
  loop?: boolean
  delay?: number
  direction?: "forward" | "reverse"
  easing?: EasingType
  style?: CSSProperties
  className?: string
  onComplete?: () => void
  pauseOnHover?: boolean
  pauseDuration?: number
}

export const SlotTextCharacters: React.FC<SlotTextCharactersProps> = ({
  text = "",
  duration = 1000,
  loop = true,
  delay = 100,
  direction = "forward",
  easing = "smooth",
  style = {},
  className = "",
  onComplete,
  pauseOnHover = false,
  pauseDuration = 1000,
}) => {
  const [displayedText, setDisplayedText] = useState<string[]>([])
  const [isAnimating, setIsAnimating] = useState(true)
  const [animationPhase, setAnimationPhase] = useState<"writing" | "erasing" | "pausing" | "idle">("writing")
  const containerRef = useRef<HTMLDivElement>(null)
  const animationTimersRef = useRef<number[]>([])

  // Characters to use for the slot machine effect - expanded for more variety
  const slotChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?/[]{}|~"

  // Generate a random character
  const getRandomChar = () => {
    return slotChars.charAt(Math.floor(Math.random() * slotChars.length))
  }

  // Initialize or reset the animation
  useEffect(() => {
    // Clear any existing timers
    animationTimersRef.current.forEach((timer) => clearTimeout(timer))
    animationTimersRef.current = []

    // Initialize with spaces
    setDisplayedText(Array(text.length).fill(" "))
    setAnimationPhase("writing")

    // Start the animation if we should be animating
    if (isAnimating) {
      startAnimation()
    }

    return () => {
      // Clean up timers on unmount
      animationTimersRef.current.forEach((timer) => clearTimeout(timer))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, isAnimating, loop])

  // Function to start the character animation sequence
  const startAnimation = () => {
    const finalChars = text.split("")

    // For each character position
    finalChars.forEach((finalChar, charIndex) => {
      // Skip spaces
      if (finalChar === " ") {
        setDisplayedText((prev) => {
          const updated = [...prev]
          updated[charIndex] = " "
          return updated
        })
        return
      }

      // Calculate delay based on character position
      const charDelay = charIndex * delay

      // Number of random characters to show before settling - more iterations for smoother effect
      const iterations = Math.floor(duration / 50)

      // Animate through random characters
      for (let i = 0; i < iterations; i++) {
        const iterationDelay = charDelay + i * (duration / iterations)

        const timerId = window.setTimeout(() => {
          setDisplayedText((prev) => {
            const updated = [...prev]
            // Last iteration shows the final character
            if (i === iterations - 1) {
              updated[charIndex] = finalChar
            } else {
              updated[charIndex] = getRandomChar()
            }
            return updated
          })

          // If this is the last character and last iteration, handle completion
          if (charIndex === finalChars.length - 1 && i === iterations - 1) {
            // Pause after writing is complete
            setAnimationPhase("pausing")

            const pauseTimer = window.setTimeout(() => {
              // If direction is reverse, start erasing after the pause
              if (direction === "reverse") {
                setAnimationPhase("erasing")
                startEraseAnimation()
              } else {
                // If not in reverse mode, handle completion normally
                if (onComplete) {
                  onComplete()
                }

                // If looping, restart the animation after a delay
                if (loop) {
                  setAnimationPhase("writing")
                  startAnimation()
                } else {
                  setAnimationPhase("idle")
                }
              }
            }, pauseDuration)

            animationTimersRef.current.push(pauseTimer)
          }
        }, iterationDelay)

        animationTimersRef.current.push(timerId)
      }
    })
  }

  // Function to start the character erasing animation (for reverse mode)
  const startEraseAnimation = () => {
    const finalChars = text.split("")

    // Erase characters in reverse order (right to left)
    for (let charIndex = finalChars.length - 1; charIndex >= 0; charIndex--) {
      // Skip spaces
      if (finalChars[charIndex] === " ") {
        continue
      }

      // Calculate delay based on reverse position
      const charDelay = (finalChars.length - 1 - charIndex) * delay

      // Number of random characters to show before erasing - more iterations for smoother effect
      const iterations = Math.floor(duration / 50)

      // Animate through random characters before erasing
      for (let i = 0; i < iterations; i++) {
        const iterationDelay = charDelay + i * (duration / iterations)

        const timerId = window.setTimeout(() => {
          setDisplayedText((prev) => {
            const updated = [...prev]
            // Last iteration erases the character
            if (i === iterations - 1) {
              updated[charIndex] = " "
            } else {
              updated[charIndex] = getRandomChar()
            }
            return updated
          })

          // If this is the first character (leftmost) and last iteration, handle completion
          if (charIndex === 0 && i === iterations - 1) {
            if (onComplete) {
              onComplete()
            }

            // If looping, restart the writing animation after a delay
            if (loop) {
              const loopTimer = window.setTimeout(() => {
                setAnimationPhase("writing")
                startAnimation()
              }, delay * 5)
              animationTimersRef.current.push(loopTimer)
            } else {
              setAnimationPhase("idle")
            }
          }
        }, iterationDelay)

        animationTimersRef.current.push(timerId)
      }
    }
  }

  // Handle pause on hover
  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsAnimating(false)
      // Clear all active timers
      animationTimersRef.current.forEach((timer) => clearTimeout(timer))
      animationTimersRef.current = []
    }
  }

  // Handle resume on mouse leave
  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsAnimating(true)
      if (animationPhase === "writing") {
        startAnimation()
      } else if (animationPhase === "erasing") {
        startEraseAnimation()
      }
    }
  }

  // Get the CSS class for the current easing type
  const easingClass = `slot-easing-${easing}`

  return (
    <div
      ref={containerRef}
      className={`slot-text-container ${easingClass} ${className}`}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {displayedText.map((char, index) => (
        <span
          key={`char-${index}`}
          className={`slot-char ${char === " " ? "slot-space" : "slot-char-animated"}`}
          data-easing={easing}
        >
          {char}
        </span>
      ))}
    </div>
  )
}

export default SlotTextCharacters

