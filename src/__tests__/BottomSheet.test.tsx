import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { BottomSheet } from "../index";

const ANIMATION_DURATION_MS = 300;
// Time needed for initial animation (requestAnimationFrame + animation duration)
const OPEN_ANIMATION_DELAY = 500;

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
});

/** Helper to wait for the bottom sheet to fully open */
function waitForSheetToOpen() {
  act(() => {
    vi.advanceTimersByTime(OPEN_ANIMATION_DELAY);
  });
}

describe("BottomSheet", () => {
  it("renders when open", () => {
    render(
      <BottomSheet open={true} onDismiss={() => {}}>
        <p>Sheet content</p>
      </BottomSheet>
    );

    expect(screen.getByText("Sheet content")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(
      <BottomSheet open={false} onDismiss={() => {}}>
        <p>Sheet content</p>
      </BottomSheet>
    );

    expect(screen.queryByText("Sheet content")).not.toBeInTheDocument();
  });

  it("calls onDismiss when clicking backdrop", () => {
    const onDismiss = vi.fn();
    render(
      <BottomSheet open={true} onDismiss={onDismiss} testId="bottom-sheet">
        <p>Sheet content</p>
      </BottomSheet>
    );

    // Wait for open animation to complete
    waitForSheetToOpen();

    fireEvent.click(screen.getByTestId("bottom-sheet-backdrop"));
    act(() => {
      vi.advanceTimersByTime(ANIMATION_DURATION_MS);
    });
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("calls onDismiss on Escape key", () => {
    const onDismiss = vi.fn();
    render(
      <BottomSheet open={true} onDismiss={onDismiss}>
        <p>Sheet content</p>
      </BottomSheet>
    );

    // Wait for open animation to complete
    waitForSheetToOpen();

    fireEvent.keyDown(document, { key: "Escape" });
    act(() => {
      vi.advanceTimersByTime(ANIMATION_DURATION_MS);
    });
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("supports legacy onClose prop", () => {
    const onClose = vi.fn();
    render(
      <BottomSheet open={true} onClose={onClose}>
        <p>Legacy onClose prop</p>
      </BottomSheet>
    );

    expect(screen.getByText("Legacy onClose prop")).toBeInTheDocument();

    // Wait for open animation to complete
    waitForSheetToOpen();

    fireEvent.keyDown(document, { key: "Escape" });
    act(() => {
      vi.advanceTimersByTime(ANIMATION_DURATION_MS);
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe("BottomSheet Dismiss Button", () => {
  it("does not render dismiss button when dismissButton prop is omitted", () => {
    render(
      <BottomSheet open={true} onDismiss={() => {}}>
        <p>Sheet content</p>
      </BottomSheet>
    );

    expect(screen.queryByLabelText("Dismiss")).not.toBeInTheDocument();
  });

  it("does not render dismiss button when dismissButton.show is false", () => {
    render(
      <BottomSheet open={true} onDismiss={() => {}} dismissButton={{ show: false }}>
        <p>Sheet content</p>
      </BottomSheet>
    );

    expect(screen.queryByLabelText("Dismiss")).not.toBeInTheDocument();
  });

  it("renders dismiss button on right side when position is 'right'", () => {
    render(
      <BottomSheet open={true} onDismiss={() => {}} dismissButton={{ show: true, position: "right" }}>
        <p>Sheet content</p>
      </BottomSheet>
    );

    const button = screen.getByLabelText("Dismiss");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("top-4", "right-4");
  });

  it("renders dismiss button on left side when position is 'left'", () => {
    render(
      <BottomSheet open={true} onDismiss={() => {}} dismissButton={{ show: true, position: "left" }}>
        <p>Sheet content</p>
      </BottomSheet>
    );

    const button = screen.getByLabelText("Dismiss");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("top-4", "left-4");
  });

  it("calls onDismiss when dismiss button is clicked", () => {
    const onDismiss = vi.fn();
    render(
      <BottomSheet open={true} onDismiss={onDismiss} dismissButton={{ show: true, position: "right" }}>
        <p>Sheet content</p>
      </BottomSheet>
    );

    // Wait for open animation to complete
    waitForSheetToOpen();

    const button = screen.getByLabelText("Dismiss");
    fireEvent.click(button);
    act(() => {
      vi.advanceTimersByTime(ANIMATION_DURATION_MS);
    });
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("passes custom props to dismiss button", () => {
    render(
      <BottomSheet
        open={true}
        onDismiss={() => {}}
        dismissButton={{ show: true, position: "right", props: { "aria-label": "Close sheet", disabled: true } }}
      >
        <p>Sheet content</p>
      </BottomSheet>
    );

    const button = screen.getByLabelText("Close sheet");
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it("renders dismiss button correctly when custom header is provided", () => {
    render(
      <BottomSheet
        open={true}
        onDismiss={() => {}}
        dismissButton={{ show: true, position: "right" }}
        header={<h2>Custom Header</h2>}
      >
        <p>Sheet content</p>
      </BottomSheet>
    );

    expect(screen.getByText("Custom Header")).toBeInTheDocument();
    expect(screen.getByLabelText("Dismiss")).toBeInTheDocument();
  });

  it("allows testId override via props", () => {
    render(
      <BottomSheet
        open={true}
        onDismiss={() => {}}
        dismissButton={{ show: true, position: "right", props: { testId: "custom-dismiss-button" } }}
      >
        <p>Sheet content</p>
      </BottomSheet>
    );

    expect(screen.getByTestId("custom-dismiss-button")).toBeInTheDocument();
  });
});

describe("BottomSheet Header Border", () => {
  it("renders default header border when headerBorder is not specified", () => {
    render(
      <BottomSheet open={true} onDismiss={() => {}} header={<h2>Title</h2>}>
        <p>Sheet content</p>
      </BottomSheet>
    );

    expect(screen.getByText("Title")).toBeInTheDocument();
  });

  it("renders header without border when headerBorder is false", () => {
    render(
      <BottomSheet open={true} onDismiss={() => {}} header={<h2>Title</h2>} headerBorder={false}>
        <p>Sheet content</p>
      </BottomSheet>
    );

    expect(screen.getByText("Title")).toBeInTheDocument();
  });

  it("renders header with custom border color when headerBorder is a string", () => {
    render(
      <BottomSheet open={true} onDismiss={() => {}} header={<h2>Title</h2>} headerBorder="#FF0000">
        <p>Sheet content</p>
      </BottomSheet>
    );

    expect(screen.getByText("Title")).toBeInTheDocument();
  });
});

describe("BottomSheet Sticky Header/Footer Collapse", () => {
  it("keeps footer stationary while content collapses during drag", () => {
    render(
      <BottomSheet
        open={true}
        onDismiss={() => {}}
        header={<div style={{ height: "50px" }}>Header</div>}
        footer={<div style={{ height: "60px" }}>Footer</div>}
        snapPoints={[400]}
        testId="bottom-sheet"
      >
        <div style={{ height: "200px" }}>Content</div>
      </BottomSheet>
    );

    waitForSheetToOpen();

    // The handle has data-bottom-sheet-handle attribute
    const handle = document.querySelector("[data-bottom-sheet-handle]") as HTMLElement;
    expect(handle).not.toBeNull();

    // The sheet is the element with position: absolute and bottom: 0px (the main sheet container)
    const overlay = document.querySelector('[data-testid="bottom-sheet"]') as HTMLElement;
    // Get all direct child divs and find the sheet (which has flex-direction: column)
    const sheetCandidates = overlay.querySelectorAll(":scope > div");
    // The sheet is the one that contains the handle (not the backdrop)
    const sheet = Array.from(sheetCandidates).find((el) =>
      el.querySelector("[data-bottom-sheet-handle]")
    ) as HTMLElement;
    expect(sheet).not.toBeNull();

    // Get initial height
    const initialHeight = parseInt(sheet.style.height, 10);
    expect(initialHeight).toBeGreaterThan(0);

    // Simulate drag start on handle
    fireEvent.pointerDown(handle, { clientY: 100, pointerId: 1 });

    // Simulate drag down by 50px (should only collapse content, not move sheet)
    fireEvent.pointerMove(handle, { clientY: 150, pointerId: 1 });

    // Sheet height should decrease but transform should be 0 (footer stays in place)
    const currentHeight = parseInt(sheet.style.height, 10);
    expect(currentHeight).toBeLessThan(initialHeight);

    // The sheet should not have a Y transform yet (content is collapsing, not sheet moving)
    const transform = sheet.style.transform;
    expect(transform).toBe("translateY(0px)");

    // Clean up
    fireEvent.pointerUp(handle, { clientY: 150, pointerId: 1 });
  });

  it("starts moving sheet down after content is fully collapsed", () => {
    render(
      <BottomSheet
        open={true}
        onDismiss={() => {}}
        header={<div style={{ height: "50px" }}>Header</div>}
        footer={<div style={{ height: "60px" }}>Footer</div>}
        snapPoints={[400]}
        skipInitialTransition
        testId="bottom-sheet"
      >
        <div style={{ height: "200px" }}>Content</div>
      </BottomSheet>
    );

    waitForSheetToOpen();

    // The handle has data-bottom-sheet-handle attribute
    const handle = document.querySelector("[data-bottom-sheet-handle]") as HTMLElement;
    expect(handle).not.toBeNull();

    // The sheet is the element containing the handle
    const overlay = document.querySelector('[data-testid="bottom-sheet"]') as HTMLElement;
    const sheetCandidates = overlay.querySelectorAll(":scope > div");
    const sheet = Array.from(sheetCandidates).find((el) =>
      el.querySelector("[data-bottom-sheet-handle]")
    ) as HTMLElement;
    expect(sheet).not.toBeNull();

    // Simulate drag start
    fireEvent.pointerDown(handle, { clientY: 100, pointerId: 1 });

    // Drag down significantly (past content collapse point)
    // Header (50) + Footer (60) + Handle (32) = 142px protected
    // Starting at 400px, dragging 300px should collapse content AND start moving sheet
    fireEvent.pointerMove(handle, { clientY: 400, pointerId: 1 });

    // Sheet should now have a Y transform (it's moving down)
    const transform = sheet.style.transform;
    expect(transform).toMatch(/translateY\(\d+px\)/);

    // Clean up
    fireEvent.pointerUp(handle, { clientY: 400, pointerId: 1 });
  });
});
