import type React from "react"
import { useEffect, useState, useRef, type CSSProperties } from "react"
import "./styles.css"
import { SlotTextCharacters } from "./SlotTextCharacters"
import type { EasingType } from "./SlotTextCharacters"

export interface SlotTextWordsProps {
  words: string[]
  duration?: number
  loop?: boolean
  delay?: number
  direction?: "forward" | "reverse"
  order?: "sequential" | "random"
  easing?: EasingType
  style?: CSSProperties
  className?: string
  onComplete?: () => void
  pauseOnHover?: boolean
  pauseDuration?: number
}

export const SlotTextWords: React.FC<SlotTextWordsProps> = ({
  words = [],
  duration = 1500,
  loop = true,
  delay = 100,
  direction = "forward",
  order = "sequential",
  easing = "smooth",
  style = {},
  className = "",
  onComplete,
  pauseOnHover = false,
  pauseDuration = 1000,
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)
  const [wordQueue, setWordQueue] = useState<string[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const animationTimerRef = useRef<number | null>(null)

  // Initialize the word queue
  useEffect(() => {
    if (words.length === 0) return

    // Create the word sequence based on the order
    if (order === "sequential") {
      setWordQueue([...words])
    } else {
      // For random order, shuffle the words array
      const shuffled = [...words].sort(() => Math.random() - 0.5)
      setWordQueue(shuffled)
    }

    setCurrentWordIndex(0)

    return () => {
      // Clean up timers on unmount
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current)
      }
    }
  }, [words, order])

  // Handle word completion - move to the next word
  const handleWordComplete = () => {
    if (!isAnimating) return

    // Move to the next word after a delay
    animationTimerRef.current = window.setTimeout(() => {
      if (currentWordIndex < wordQueue.length - 1) {
        // Move to the next word
        setCurrentWordIndex((prevIndex) => prevIndex + 1)
      } else {
        // We've reached the end of the word list
        if (onComplete) {
          onComplete()
        }

        if (loop) {
          // Start over from the beginning
          setCurrentWordIndex(0)
        }
      }
    }, pauseDuration)
  }

  // Handle pause on hover
  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsAnimating(false)
      // Clear the active timer
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current)
      }
    }
  }

  // Handle resume on mouse leave
  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsAnimating(true)
    }
  }

  // If no words, don't render anything
  if (wordQueue.length === 0) {
    return null
  }

  // Get the CSS class for the current easing type
  const easingClass = `slot-easing-${easing}`

  return (
    <div
      ref={containerRef}
      className={`slot-text-words-container ${easingClass} ${className}`}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <SlotTextCharacters
        text={wordQueue[currentWordIndex]}
        duration={duration}
        loop={false}
        delay={delay}
        direction={direction}
        easing={easing}
        onComplete={handleWordComplete}
        pauseOnHover={pauseOnHover}
        pauseDuration={pauseDuration}
      />
    </div>
  )
}

export default SlotTextWords

