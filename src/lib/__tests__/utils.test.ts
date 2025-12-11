import { describe, it, expect } from "vitest"
import { cn } from "@/lib/utils"

describe("cn utility", () => {
  it("merges class names", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2")
  })

  it("handles conditional classes", () => {
    expect(cn("base", true && "active", false && "inactive")).toBe(
      "base active"
    )
  })

  it("handles conflicting tailwind classes", () => {
    expect(cn("px-4", "px-8")).toBe("px-8")
  })
})
