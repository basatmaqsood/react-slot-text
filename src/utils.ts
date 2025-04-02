import type { EasingType } from "./SlotTextCharacters"

// Function to get the CSS easing function based on the easing type
export function getEasingFunction(easing: EasingType): string {
  switch (easing) {
    case "bounce":
      return "cubic-bezier(0.175, 0.885, 0.32, 1.275)"
    case "elastic":
      return "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
    case "smooth":
      return "cubic-bezier(0.25, 0.1, 0.25, 1)"
    case "sharp":
      return "cubic-bezier(0.19, 1, 0.22, 1)"
    case "linear":
      return "linear"
    default:
      return "cubic-bezier(0.25, 0.1, 0.25, 1)"
  }
}

