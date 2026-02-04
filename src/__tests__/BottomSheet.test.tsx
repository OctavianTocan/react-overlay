import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BottomSheet } from "../index";

const ANIMATION_DURATION_MS = 300;

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
});

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

    fireEvent.click(screen.getByTestId("bottom-sheet-backdrop"));
    vi.advanceTimersByTime(ANIMATION_DURATION_MS);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("calls onDismiss on Escape key", () => {
    const onDismiss = vi.fn();
    render(
      <BottomSheet open={true} onDismiss={onDismiss}>
        <p>Sheet content</p>
      </BottomSheet>
    );

    fireEvent.keyDown(document, { key: "Escape" });
    vi.advanceTimersByTime(ANIMATION_DURATION_MS);
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
    fireEvent.keyDown(document, { key: "Escape" });
    vi.advanceTimersByTime(ANIMATION_DURATION_MS);
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

    const button = screen.getByLabelText("Dismiss");
    fireEvent.click(button);
    vi.advanceTimersByTime(ANIMATION_DURATION_MS);
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

describe("BottomSheet Sticky Header", () => {
  it("renders stickyHeader inside scrollable area", () => {
    render(
      <BottomSheet open={true} onDismiss={() => {}} stickyHeader={<div>Sticky Header Content</div>}>
        <p>Sheet content</p>
      </BottomSheet>
    );

    const stickyHeader = screen.getByText("Sticky Header Content");
    expect(stickyHeader).toBeInTheDocument();

    // Verify it's inside the scrollable area
    const scrollableArea = document.querySelector('[data-bottom-sheet-content]');
    expect(scrollableArea).toContainElement(stickyHeader);
  });

  it("does not render stickyHeader when prop is not provided", () => {
    render(
      <BottomSheet open={true} onDismiss={() => {}}>
        <p>Sheet content</p>
      </BottomSheet>
    );

    // Check that the sticky header container is not present
    const scrollableArea = document.querySelector('[data-bottom-sheet-content]');
    expect(scrollableArea).toBeInTheDocument();
    expect(scrollableArea?.children.length).toBe(1); // Only content div
  });

  it("renders stickyHeader alongside regular header", () => {
    render(
      <BottomSheet
        open={true}
        onDismiss={() => {}}
        header={<h2>Regular Header</h2>}
        stickyHeader={<div>Sticky Header Content</div>}
      >
        <p>Sheet content</p>
      </BottomSheet>
    );

    const regularHeader = screen.getByText("Regular Header");
    const stickyHeader = screen.getByText("Sticky Header Content");

    expect(regularHeader).toBeInTheDocument();
    expect(stickyHeader).toBeInTheDocument();

    // Regular header should be outside the scrollable area
    const scrollableArea = document.querySelector('[data-bottom-sheet-content]');
    expect(scrollableArea).not.toContainElement(regularHeader);

    // Sticky header should be inside the scrollable area
    expect(scrollableArea).toContainElement(stickyHeader);
  });

  it("renders stickyHeader with footer", () => {
    render(
      <BottomSheet
        open={true}
        onDismiss={() => {}}
        stickyHeader={<div>Sticky Header Content</div>}
        footer={<button>Footer Button</button>}
      >
        <p>Sheet content</p>
      </BottomSheet>
    );

    expect(screen.getByText("Sticky Header Content")).toBeInTheDocument();
    expect(screen.getByText("Footer Button")).toBeInTheDocument();

    // Verify sticky header is inside scroll area
    const scrollableArea = document.querySelector('[data-bottom-sheet-content]');
    const stickyHeader = screen.getByText("Sticky Header Content");
    expect(scrollableArea).toContainElement(stickyHeader);
  });

  it("renders stickyHeader with proper sticky positioning styles", () => {
    render(
      <BottomSheet open={true} onDismiss={() => {}} stickyHeader={<div>Sticky Header Content</div>}>
        <p>Sheet content</p>
      </BottomSheet>
    );

    const stickyHeader = screen.getByText("Sticky Header Content");
    const stickyHeaderContainer = stickyHeader.parentElement;

    expect(stickyHeaderContainer).toBeInTheDocument();
    // Check that the parent container has position sticky
    expect(stickyHeaderContainer).toHaveStyle({ position: 'sticky' });
  });
});
