# Sticky Header/Footer During Bottom Sheet Collapse

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make header and footer "sticky" during bottom sheet collapse — content collapses first, then header/footer move together.

**Architecture:** Track header and footer heights via refs. During drag/animation, calculate "protected height" (header + footer + handle). When sheet height > protected height, only content shrinks. When sheet height <= protected height, the entire sheet moves down. This is achieved by separating "visual height" from "translate offset".

**Tech Stack:** React refs for measuring, CSS transform for offset, existing drag handling logic.

---

## Task 1: Add Refs to Measure Header and Footer Heights

**Files:**

- Modify: `src/bottom-sheet/BottomSheet.tsx:105-118` (refs section)
- Modify: `src/bottom-sheet/BottomSheet.tsx:682-704` (header/footer render)

**Step 1: Add refs for header and footer containers**

In the refs section (around line 105), add:

```typescript
const headerContainerRef = useRef<HTMLDivElement>(null);
const footerContainerRef = useRef<HTMLDivElement>(null);
```

**Step 2: Attach refs to header and footer elements**

Update the header container (around line 683):

```typescript
{headerContent && (
  <div
    ref={headerContainerRef}
    style={{
```

Update the footer container (around line 704):

```typescript
{footer && <div ref={footerContainerRef} style={styles.footerContainer}>{footer}</div>}
```

**Step 3: Run typecheck**

Run: `pnpm run typecheck`
Expected: No errors

**Step 4: Commit**

```bash
git add src/bottom-sheet/BottomSheet.tsx
git commit -m "$(cat <<'EOF'
feat(bottom-sheet): add refs to measure header and footer heights

Preparation for sticky header/footer collapse behavior.

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Calculate Protected Height and Add Transform State

**Files:**

- Modify: `src/bottom-sheet/BottomSheet.tsx:97-103` (state section)
- Modify: `src/bottom-sheet/BottomSheet.tsx` (add helper function)

**Step 1: Add state for sheet Y offset**

In the state section (around line 97), add:

```typescript
const [sheetOffsetY, setSheetOffsetY] = useState(0);
```

**Step 2: Add a helper to calculate protected height**

After the existing helper functions (around line 55), add:

```typescript
function getProtectedHeight(
    headerRef: React.RefObject<HTMLDivElement>,
    footerRef: React.RefObject<HTMLDivElement>,
    handleHeight: number
): number {
    const headerH = headerRef.current?.offsetHeight ?? 0;
    const footerH = footerRef.current?.offsetHeight ?? 0;
    return headerH + footerH + handleHeight;
}
```

**Step 3: Run typecheck**

Run: `pnpm run typecheck`
Expected: No errors

**Step 4: Commit**

```bash
git add src/bottom-sheet/BottomSheet.tsx
git commit -m "$(cat <<'EOF'
feat(bottom-sheet): add sheet offset state and protected height helper

The protected height is the minimum height before the sheet starts
translating down (header + footer + handle).

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Write Failing Test for Sticky Footer Behavior

**Files:**

- Modify: `src/__tests__/BottomSheet.test.tsx`

**Step 1: Write the failing test**

Add this test at the end of the file:

```typescript
describe("BottomSheet Sticky Header/Footer Collapse", () => {
  it("keeps footer stationary while content collapses during drag", () => {
    const { container } = render(
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

    const sheet = container.querySelector('[data-testid="bottom-sheet"] > div:last-child') as HTMLElement;
    const handle = sheet.querySelector('[data-bottom-sheet-handle]') as HTMLElement;

    // Get initial height
    const initialHeight = parseInt(sheet.style.height, 10);

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
    const { container } = render(
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

    const sheet = container.querySelector('[data-testid="bottom-sheet"] > div:last-child') as HTMLElement;
    const handle = sheet.querySelector('[data-bottom-sheet-handle]') as HTMLElement;

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
```

**Step 2: Run test to verify it fails**

Run: `pnpm vitest run src/__tests__/BottomSheet.test.tsx -t "Sticky Header/Footer"`
Expected: FAIL - transform assertions will fail because feature isn't implemented

**Step 3: Commit**

```bash
git add src/__tests__/BottomSheet.test.tsx
git commit -m "$(cat <<'EOF'
test(bottom-sheet): add failing tests for sticky header/footer collapse

Tests verify:
1. Footer stays stationary while content collapses
2. Sheet starts moving down after content is fully collapsed

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: Implement Sticky Collapse in handleDragMove

**Files:**

- Modify: `src/bottom-sheet/BottomSheet.tsx:345-355` (handleDragMove)

**Step 1: Update handleDragMove to use protected height logic**

Replace the `handleDragMove` callback:

```typescript
const handleDragMove = useCallback(
    (y: number) => {
        if (!isDraggingRef.current) return;

        const deltaY = dragStartYRef.current - y;
        const rawHeight = dragStartHeightRef.current + deltaY;
        const protectedH = getProtectedHeight(headerContainerRef, footerContainerRef, HANDLE_HEIGHT);

        if (rawHeight >= protectedH) {
            // Content is still collapsing, no offset needed
            const newHeight = clamp(rawHeight, protectedH, maxH + 50);
            setHeightImmediate(newHeight);
            setSheetOffsetY(0);
        } else {
            // Content fully collapsed, start moving sheet down
            const offset = protectedH - rawHeight;
            setHeightImmediate(protectedH);
            setSheetOffsetY(Math.max(0, offset));
        }
    },
    [maxH, setHeightImmediate]
);
```

**Step 2: Run typecheck**

Run: `pnpm run typecheck`
Expected: No errors

**Step 3: Commit**

```bash
git add src/bottom-sheet/BottomSheet.tsx
git commit -m "$(cat <<'EOF'
feat(bottom-sheet): implement sticky collapse in drag handler

During drag-to-close:
- Content collapses first while footer stays in place
- After content is gone, sheet translates down

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Apply Transform to Sheet Element

**Files:**

- Modify: `src/bottom-sheet/BottomSheet.tsx:647-657` (sheet element render)

**Step 1: Add transform style to sheet element**

Update the sheet div style to include the transform:

```typescript
<div
  ref={sheetElementRef}
  style={{
    ...styles.sheet,
    height: `${sheetHeight}px`,
    maxHeight: `${maxH}px`,
    transform: `translateY(${sheetOffsetY}px)`,
    transition:
      transitionDuration !== null
        ? `height ${transitionDuration}ms cubic-bezier(0.4, 0.0, 0.2, 1), transform ${transitionDuration}ms cubic-bezier(0.4, 0.0, 0.2, 1)`
        : "none",
  }}
>
```

**Step 2: Run tests**

Run: `pnpm vitest run src/__tests__/BottomSheet.test.tsx -t "Sticky Header/Footer"`
Expected: Tests should now pass

**Step 3: Commit**

```bash
git add src/bottom-sheet/BottomSheet.tsx
git commit -m "$(cat <<'EOF'
feat(bottom-sheet): apply Y transform to sheet for sticky collapse

Sheet now translates down after content is fully collapsed,
creating the sticky header/footer effect.

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: Update handleDragEnd to Account for Offset

**Files:**

- Modify: `src/bottom-sheet/BottomSheet.tsx:357-388` (handleDragEnd)

**Step 1: Update handleDragEnd to use effective height**

Update the `handleDragEnd` callback to calculate dismiss based on actual position:

```typescript
const handleDragEnd = useCallback(
    (y: number) => {
        if (!isDraggingRef.current) return;
        isDraggingRef.current = false;

        const deltaY = dragStartYRef.current - y;
        const deltaTime = Date.now() - dragStartTimeRef.current;
        const velocity = deltaTime > 0 ? deltaY / deltaTime : 0;

        // Effective height accounts for the Y offset
        const effectiveHeight = currentHeightRef.current - sheetOffsetY;
        const minSnap = snapPoints[0] ?? 100;
        const protectedH = getProtectedHeight(headerContainerRef, footerContainerRef, HANDLE_HEIGHT);

        const draggedDownDistance = dragStartHeightRef.current - effectiveHeight;
        const shouldDismiss =
            (draggedDownDistance > DISMISS_THRESHOLD_PX && effectiveHeight < minSnap + 50) ||
            (velocity < -VELOCITY_THRESHOLD && effectiveHeight < minSnap + 100) ||
            sheetOffsetY > DISMISS_THRESHOLD_PX;

        // Reset offset before animating
        setSheetOffsetY(0);

        if (shouldDismiss) {
            animateClose("dragging");
            return;
        }

        let targetSnap: number;
        if (Math.abs(velocity) > SNAP_VELOCITY_THRESHOLD) {
            targetSnap = findSnapPointInDirection(currentHeightRef.current, velocity, snapPoints);
        } else {
            targetSnap = findClosestSnapPoint(currentHeightRef.current, snapPoints);
        }

        animateToHeight(targetSnap, "dragging");
    },
    [snapPoints, animateClose, animateToHeight, sheetOffsetY]
);
```

**Step 2: Run all tests**

Run: `pnpm run test`
Expected: All tests pass

**Step 3: Commit**

```bash
git add src/bottom-sheet/BottomSheet.tsx
git commit -m "$(cat <<'EOF'
feat(bottom-sheet): update drag end to handle sheet offset

Dismiss detection now accounts for Y offset, and offset is
reset before snap/close animations.

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: Update Animation Functions to Reset Offset

**Files:**

- Modify: `src/bottom-sheet/BottomSheet.tsx:210-233` (animateToHeight)
- Modify: `src/bottom-sheet/BottomSheet.tsx:286-305` (animateClose)

**Step 1: Reset offset in animateToHeight**

Add `setSheetOffsetY(0)` at the start of `animateToHeight`:

```typescript
const animateToHeight = useCallback(
  (toHeight: number, source: "dragging" | "custom" = "custom") => {
    setSheetOffsetY(0); // Reset offset when snapping

    const clampedHeight = clamp(toHeight, snapPoints[0] ?? 100, snapPoints[snapPoints.length - 1] ?? maxH);
    // ... rest unchanged
```

**Step 2: Ensure animateClose handles offset smoothly**

The close animation should work with the offset. Update `animateClose`:

```typescript
const animateClose = useCallback(
    (source: "dragging" | "custom" = "custom") => {
        onSpringStart?.({ type: "CLOSE", source });

        setIsTransitioning(true);
        setHeightWithTransition(0, ANIMATION_DURATION_MS);
        setBackdropOpacityWithTransition(0, ANIMATION_DURATION_MS);
        // Offset will naturally resolve as height goes to 0

        if (transitionTimeoutRef.current) {
            clearTimeout(transitionTimeoutRef.current);
        }
        transitionTimeoutRef.current = setTimeout(() => {
            setIsTransitioning(false);
            setSheetOffsetY(0); // Reset for next open
            onSpringEnd?.({ type: "CLOSE", source });
            setIsVisible(false);
            handleDismiss();
        }, ANIMATION_DURATION_MS);
    },
    [onSpringStart, onSpringEnd, handleDismiss, setHeightWithTransition, setBackdropOpacityWithTransition]
);
```

**Step 3: Run all tests**

Run: `pnpm run test`
Expected: All tests pass

**Step 4: Commit**

```bash
git add src/bottom-sheet/BottomSheet.tsx
git commit -m "$(cat <<'EOF'
feat(bottom-sheet): reset offset in animation functions

Ensures clean state transitions when snapping or closing.

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 8: Test Manually in Storybook

**Files:**

- Modify: `src/bottom-sheet/BottomSheet.stories.tsx` (add demo story if needed)

**Step 1: Start Storybook**

Run: `pnpm run storybook`

**Step 2: Test the behavior manually**

1. Open any BottomSheet story with a footer
2. Drag down slowly — observe footer stays in place while content collapses
3. Continue dragging — observe sheet moves down after content is gone
4. Release — observe snap/dismiss behavior works correctly

**Step 3: Run full test suite**

Run: `pnpm run test`
Expected: All tests pass

**Step 4: Run typecheck and lint**

Run: `pnpm run typecheck && pnpm run lint`
Expected: No errors

**Step 5: Final commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
feat(bottom-sheet): complete sticky header/footer collapse feature

Header and footer now stay in place while content collapses during
drag-to-close. Once content is fully collapsed, the entire sheet
(header + footer) moves down together.

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

## Summary

This implementation:

1. **Measures** header and footer heights via refs
2. **Calculates** protected height (header + footer + handle)
3. **During drag**: collapses content first (height decreases), then translates sheet down (offset increases)
4. **On release**: resets offset and snaps/dismisses normally
5. **Maintains** existing snap point behavior unchanged

The key insight is separating the visual representation into two components:

- `sheetHeight`: Controls content area size
- `sheetOffsetY`: Controls vertical position after content is exhausted
