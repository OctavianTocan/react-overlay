import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useBodyScrollLock, lockBodyScroll, unlockBodyScroll } from "../hooks";

describe("useBodyScrollLock", () => {
  beforeEach(() => {
    document.body.style.overflow = "";
  });

  afterEach(() => {
    // Reset any locks
    while (document.body.style.overflow === "hidden") {
      unlockBodyScroll();
    }
  });

  it("locks body scroll when enabled", () => {
    renderHook(() => useBodyScrollLock(true));

    expect(document.body.style.overflow).toBe("hidden");
  });

  it("does not lock body scroll when disabled", () => {
    renderHook(() => useBodyScrollLock(false));

    expect(document.body.style.overflow).toBe("");
  });

  it("unlocks body scroll on unmount", () => {
    const { unmount } = renderHook(() => useBodyScrollLock(true));

    expect(document.body.style.overflow).toBe("hidden");
    unmount();
    expect(document.body.style.overflow).toBe("");
  });
});

describe("lockBodyScroll / unlockBodyScroll", () => {
  beforeEach(() => {
    document.body.style.overflow = "";
  });

  afterEach(() => {
    while (document.body.style.overflow === "hidden") {
      unlockBodyScroll();
    }
  });

  it("supports ref-counting for multiple locks", () => {
    lockBodyScroll();
    lockBodyScroll();

    expect(document.body.style.overflow).toBe("hidden");

    unlockBodyScroll();
    expect(document.body.style.overflow).toBe("hidden"); // Still locked

    unlockBodyScroll();
    expect(document.body.style.overflow).toBe(""); // Now unlocked
  });
});
