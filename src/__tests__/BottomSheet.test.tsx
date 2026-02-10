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

  it("renders unstyled variant dismiss button without default background/border", () => {
    render(
      <BottomSheet
        open={true}
        onDismiss={() => {}}
        dismissButton={{
          show: true,
          position: "right",
          props: { variant: "unstyled", className: "text-white", testId: "unstyled-dismiss" },
        }}
      >
        <p>Sheet content</p>
      </BottomSheet>
    );

    const button = screen.getByTestId("unstyled-dismiss");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("text-white"); // custom class applied
    expect(button).not.toHaveClass("bg-white"); // should NOT have default variant bg
    expect(button).not.toHaveClass("border"); // should NOT have default variant border
    expect(button).not.toHaveClass("shadow-sm"); // should NOT have default variant shadow
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

describe("BottomSheet Footer Border", () => {
  /** Helper to get the footer container element (sibling after data-bottom-sheet-content) */
  function getFooterContainer(): HTMLElement | null {
    const contentArea = document.querySelector("[data-bottom-sheet-content]");
    return (contentArea?.nextElementSibling as HTMLElement) ?? null;
  }

  it("renders default footer border when footerBorder is not specified", () => {
    render(
      <BottomSheet open={true} onDismiss={() => {}} footer={<button>Submit</button>}>
        <p>Sheet content</p>
      </BottomSheet>
    );

    const footer = getFooterContainer();
    expect(footer).not.toBeNull();
    expect(footer!.style.borderTopWidth).toBe("1px");
    expect(footer!.style.borderTopStyle).toBe("solid");
  });

  it("hides footer border when footerBorder is false", () => {
    render(
      <BottomSheet open={true} onDismiss={() => {}} footer={<button>Submit</button>} footerBorder={false}>
        <p>Sheet content</p>
      </BottomSheet>
    );

    const footer = getFooterContainer();
    expect(footer).not.toBeNull();
    expect(footer!).toHaveStyle({ borderTopWidth: 0 });
  });

  it("applies custom border color when footerBorder is a string", () => {
    render(
      <BottomSheet open={true} onDismiss={() => {}} footer={<button>Submit</button>} footerBorder="#FF0000">
        <p>Sheet content</p>
      </BottomSheet>
    );

    const footer = getFooterContainer();
    expect(footer).not.toBeNull();
    expect(footer!).toHaveStyle({ borderTopColor: "rgb(255, 0, 0)" });
    expect(footer!.style.borderTopWidth).toBe("1px");
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

describe("BottomSheet Styling Props", () => {
  /** Helper to get the sheet container element */
  function getSheetContainer(testId: string): HTMLElement {
    const overlay = document.querySelector(`[data-testid="${testId}"]`) as HTMLElement;
    const sheetCandidates = overlay.querySelectorAll(":scope > div");
    return Array.from(sheetCandidates).find((el) => el.querySelector("[data-bottom-sheet-handle]")) as HTMLElement;
  }

  describe("className props", () => {
    it("applies sheetClassName to the sheet container", () => {
      render(
        <BottomSheet open={true} onDismiss={() => {}} testId="bottom-sheet" sheetClassName="custom-sheet-class">
          <p>Content</p>
        </BottomSheet>
      );

      const sheet = getSheetContainer("bottom-sheet");
      expect(sheet).toHaveClass("custom-sheet-class");
    });

    it("applies handleClassName to the handle zone", () => {
      render(
        <BottomSheet open={true} onDismiss={() => {}} testId="bottom-sheet" handleClassName="custom-handle-class">
          <p>Content</p>
        </BottomSheet>
      );

      const handleZone = document.querySelector("[data-bottom-sheet-drag-zone]") as HTMLElement;
      expect(handleZone).toHaveClass("custom-handle-class");
    });

    it("applies contentClassName to the content area", () => {
      render(
        <BottomSheet open={true} onDismiss={() => {}} testId="bottom-sheet" contentClassName="custom-content-class">
          <p>Content</p>
        </BottomSheet>
      );

      const contentArea = document.querySelector("[data-bottom-sheet-content]") as HTMLElement;
      expect(contentArea).toHaveClass("custom-content-class");
    });
  });

  describe("style props", () => {
    it("applies sheetStyle to the sheet container", () => {
      render(
        <BottomSheet
          open={true}
          onDismiss={() => {}}
          testId="bottom-sheet"
          sheetStyle={{ backgroundColor: "rgb(255, 0, 0)" }}
        >
          <p>Content</p>
        </BottomSheet>
      );

      const sheet = getSheetContainer("bottom-sheet");
      expect(sheet).toHaveStyle({ backgroundColor: "rgb(255, 0, 0)" });
    });

    it("applies contentStyle to the content area", () => {
      render(
        <BottomSheet open={true} onDismiss={() => {}} testId="bottom-sheet" contentStyle={{ padding: "32px" }}>
          <p>Content</p>
        </BottomSheet>
      );

      const contentArea = document.querySelector("[data-bottom-sheet-content]") as HTMLElement;
      expect(contentArea).toHaveStyle({ padding: "32px" });
    });
  });

  describe("unstyled prop", () => {
    it("removes sheet background when unstyled is true", () => {
      render(
        <BottomSheet open={true} onDismiss={() => {}} testId="bottom-sheet" unstyled>
          <p>Content</p>
        </BottomSheet>
      );

      const sheet = getSheetContainer("bottom-sheet");
      expect(sheet.style.backgroundColor).toBe("transparent");
    });

    it("removes content padding when unstyled is true", () => {
      render(
        <BottomSheet open={true} onDismiss={() => {}} testId="bottom-sheet" unstyled>
          <p>Content</p>
        </BottomSheet>
      );

      const contentArea = document.querySelector("[data-bottom-sheet-content]") as HTMLElement;
      const scrollContent = contentArea.firstElementChild as HTMLElement;
      // When unstyled, the inner div should have no padding styles
      expect(scrollContent.style.paddingLeft).toBe("");
      expect(scrollContent.style.paddingRight).toBe("");
    });

    it("hides handle pill when unstyled is true", () => {
      render(
        <BottomSheet open={true} onDismiss={() => {}} testId="bottom-sheet" unstyled>
          <p>Content</p>
        </BottomSheet>
      );

      const handleArea = document.querySelector("[data-bottom-sheet-handle]") as HTMLElement;
      // The handle pill should not be rendered
      expect(handleArea.children.length).toBe(0);
    });

    it("removes only sheet background when unstyled={{ sheet: true }}", () => {
      render(
        <BottomSheet open={true} onDismiss={() => {}} testId="bottom-sheet" unstyled={{ sheet: true }}>
          <p>Content</p>
        </BottomSheet>
      );

      const sheet = getSheetContainer("bottom-sheet");
      expect(sheet.style.backgroundColor).toBe("transparent");

      // Handle should still be visible
      const handleArea = document.querySelector("[data-bottom-sheet-handle]") as HTMLElement;
      expect(handleArea.children.length).toBe(1);
    });

    it("removes only content padding when unstyled={{ content: true }}", () => {
      render(
        <BottomSheet open={true} onDismiss={() => {}} testId="bottom-sheet" unstyled={{ content: true }}>
          <p>Content</p>
        </BottomSheet>
      );

      const sheet = getSheetContainer("bottom-sheet");
      // Sheet should still have default background (not transparent)
      expect(sheet.style.backgroundColor).not.toBe("transparent");

      const contentArea = document.querySelector("[data-bottom-sheet-content]") as HTMLElement;
      const scrollContent = contentArea.firstElementChild as HTMLElement;
      // Content padding should be removed
      expect(scrollContent.style.paddingLeft).toBe("");
    });

    it("removes only handle when unstyled={{ handle: true }}", () => {
      render(
        <BottomSheet open={true} onDismiss={() => {}} testId="bottom-sheet" unstyled={{ handle: true }}>
          <p>Content</p>
        </BottomSheet>
      );

      const sheet = getSheetContainer("bottom-sheet");
      // Sheet should still have default background (not transparent)
      expect(sheet.style.backgroundColor).not.toBe("transparent");

      // Handle pill should not be rendered
      const handleArea = document.querySelector("[data-bottom-sheet-handle]") as HTMLElement;
      expect(handleArea.children.length).toBe(0);
    });

    it("combines unstyled with className props", () => {
      render(
        <BottomSheet
          open={true}
          onDismiss={() => {}}
          testId="bottom-sheet"
          unstyled={{ sheet: true, content: true }}
          sheetClassName="gradient-background"
          contentClassName="custom-padding"
        >
          <p>Content</p>
        </BottomSheet>
      );

      const sheet = getSheetContainer("bottom-sheet");
      expect(sheet).toHaveClass("gradient-background");
      expect(sheet.style.backgroundColor).toBe("transparent");

      const contentArea = document.querySelector("[data-bottom-sheet-content]") as HTMLElement;
      expect(contentArea).toHaveClass("custom-padding");
    });

    it("applies handleStyle to the handle pill element", () => {
      render(
        <BottomSheet
          open={true}
          onDismiss={() => {}}
          testId="bottom-sheet"
          handleStyle={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
        >
          <p>Content</p>
        </BottomSheet>
      );

      const handleArea = document.querySelector("[data-bottom-sheet-handle]") as HTMLElement;
      const handlePill = handleArea.firstElementChild as HTMLElement;
      expect(handlePill).toHaveStyle({ backgroundColor: "rgba(255, 255, 255, 0.5)" });
    });

    it("handleStyle overrides default handle background color", () => {
      render(
        <BottomSheet
          open={true}
          onDismiss={() => {}}
          testId="bottom-sheet"
          handleStyle={{ backgroundColor: "rgb(255, 0, 0)" }}
        >
          <p>Content</p>
        </BottomSheet>
      );

      const handleArea = document.querySelector("[data-bottom-sheet-handle]") as HTMLElement;
      const handlePill = handleArea.firstElementChild as HTMLElement;
      expect(handlePill).toHaveStyle({ backgroundColor: "rgb(255, 0, 0)" });
    });

    it("handleStyle does not render when unstyled.handle is true", () => {
      render(
        <BottomSheet
          open={true}
          onDismiss={() => {}}
          testId="bottom-sheet"
          unstyled={{ handle: true }}
          handleStyle={{ backgroundColor: "red" }}
        >
          <p>Content</p>
        </BottomSheet>
      );

      const handleArea = document.querySelector("[data-bottom-sheet-handle]") as HTMLElement;
      // Handle pill should not be rendered when unstyled.handle is true
      expect(handleArea.children.length).toBe(0);
    });
  });
});

describe("BottomSheet Nested Sheets", () => {
  /**
   * Regression test: when a child sheet is nested inside a parent sheet,
   * dragging the child handle to dismiss should only close the child.
   * Previously, both sheets' global touch listeners would process the same
   * touch sequence, causing both to dismiss.
   */
  it("does not dismiss parent when dragging the child handle down", () => {
    const parentDismiss = vi.fn();
    const childDismiss = vi.fn();

    /**
     * Wrapper that renders parent + child BottomSheet.
     * The child is rendered inside the parent's content area, matching the
     * real-world pattern (e.g., model selector sheet inside chat sheet).
     */
    function NestedSheets() {
      return (
        <>
          <BottomSheet open={true} onDismiss={parentDismiss} testId="parent-sheet">
            <p>Parent content</p>
            <BottomSheet open={true} onDismiss={childDismiss} testId="child-sheet">
              <p>Child content</p>
            </BottomSheet>
          </BottomSheet>
        </>
      );
    }

    render(<NestedSheets />);
    waitForSheetToOpen();

    // There are two sheets, each with their own handle.
    // The child sheet's handle is the one we want to drag.
    const allHandles = document.querySelectorAll("[data-bottom-sheet-handle]");
    expect(allHandles.length).toBeGreaterThanOrEqual(2);

    // The child sheet's handle is the last one in DOM order (portals append to body).
    const childHandle = allHandles[allHandles.length - 1] as HTMLElement;

    // Simulate a touch drag-down on the child handle (enough to trigger dismiss).
    // touchstart on child handle
    fireEvent.touchStart(childHandle, {
      touches: [{ clientY: 100, identifier: 0 }],
    });

    // touchmove dragging down significantly
    fireEvent.touchMove(childHandle, {
      touches: [{ clientY: 500, identifier: 0 }],
    });

    // touchend at the dragged position
    fireEvent.touchEnd(childHandle, {
      changedTouches: [{ clientY: 500, identifier: 0 }],
    });

    // Wait for close animation to complete
    act(() => {
      vi.advanceTimersByTime(ANIMATION_DURATION_MS + 100);
    });

    // Parent onDismiss must NOT have been called
    expect(parentDismiss).not.toHaveBeenCalled();
  });

  it("parent sheet still dismisses via its own backdrop when child is open", () => {
    const parentDismiss = vi.fn();
    const childDismiss = vi.fn();

    function NestedSheets() {
      return (
        <>
          <BottomSheet open={true} onDismiss={parentDismiss} testId="parent-sheet">
            <p>Parent content</p>
            <BottomSheet open={true} onDismiss={childDismiss} testId="child-sheet">
              <p>Child content</p>
            </BottomSheet>
          </BottomSheet>
        </>
      );
    }

    render(<NestedSheets />);
    waitForSheetToOpen();

    // Click the parent backdrop (first one in DOM)
    const parentBackdrop = screen.getByTestId("parent-sheet-backdrop");
    fireEvent.click(parentBackdrop);

    act(() => {
      vi.advanceTimersByTime(ANIMATION_DURATION_MS + 100);
    });

    expect(parentDismiss).toHaveBeenCalledTimes(1);
  });
});
