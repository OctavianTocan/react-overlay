import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BottomSheet } from "../index";

const ANIMATION_DURATION_MS = 300;

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

  it("calls onDismiss when clicking backdrop", async () => {
    const onDismiss = vi.fn();
    render(
      <BottomSheet open={true} onDismiss={onDismiss} testId="bottom-sheet">
        <p>Sheet content</p>
      </BottomSheet>
    );

    fireEvent.click(screen.getByTestId("bottom-sheet-backdrop"));
    await waitFor(
      () => {
        expect(onDismiss).toHaveBeenCalledTimes(1);
      },
      { timeout: ANIMATION_DURATION_MS + 100 }
    );
  });

  it("calls onDismiss on Escape key", async () => {
    const onDismiss = vi.fn();
    render(
      <BottomSheet open={true} onDismiss={onDismiss}>
        <p>Sheet content</p>
      </BottomSheet>
    );

    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(
      () => {
        expect(onDismiss).toHaveBeenCalledTimes(1);
      },
      { timeout: ANIMATION_DURATION_MS + 100 }
    );
  });

  it("supports legacy onClose prop", async () => {
    const onClose = vi.fn();
    render(
      <BottomSheet open={true} onClose={onClose}>
        <p>Legacy onClose prop</p>
      </BottomSheet>
    );

    expect(screen.getByText("Legacy onClose prop")).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(
      () => {
        expect(onClose).toHaveBeenCalledTimes(1);
      },
      { timeout: ANIMATION_DURATION_MS + 100 }
    );
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
