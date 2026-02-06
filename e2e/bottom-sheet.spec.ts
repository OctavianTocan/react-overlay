import { test, expect } from "@playwright/test";

test.describe("BottomSheet", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/iframe.html?id=components-bottomsheet--default&viewMode=story");
  });

  test("opens on button click", async ({ page }) => {
    const openButton = page.getByRole("button", { name: "Open Bottom Sheet" });
    await openButton.click();

    const sheet = page.locator('[data-testid="bottom-sheet"]');
    await expect(sheet).toBeVisible();
  });

  test("closes on backdrop click", async ({ page }) => {
    const openButton = page.getByRole("button", { name: "Open Bottom Sheet" });
    await openButton.click();

    const sheet = page.locator('[data-testid="bottom-sheet"]');
    await expect(sheet).toBeVisible();

    // Click on the backdrop (overlay area outside the sheet)
    const backdrop = page.locator('[data-testid="bottom-sheet-overlay"]');
    await backdrop.click({ position: { x: 10, y: 10 } });

    await expect(sheet).not.toBeVisible();
  });

  test("closes on Escape key", async ({ page }) => {
    const openButton = page.getByRole("button", { name: "Open Bottom Sheet" });
    await openButton.click();

    const sheet = page.locator('[data-testid="bottom-sheet"]');
    await expect(sheet).toBeVisible();

    await page.keyboard.press("Escape");

    await expect(sheet).not.toBeVisible();
  });

  test("can be dragged down to dismiss", async ({ page }) => {
    const openButton = page.getByRole("button", { name: "Open Bottom Sheet" });
    await openButton.click();

    const sheet = page.locator('[data-testid="bottom-sheet"]');
    await expect(sheet).toBeVisible();

    // Get the handle element for dragging
    const handle = page.locator('[data-testid="bottom-sheet-handle"]');
    const handleBox = await handle.boundingBox();

    if (handleBox) {
      const startX = handleBox.x + handleBox.width / 2;
      const startY = handleBox.y + handleBox.height / 2;

      // Drag down by 300px to dismiss
      await page.mouse.move(startX, startY);
      await page.mouse.down();
      await page.mouse.move(startX, startY + 300, { steps: 10 });
      await page.mouse.up();
    }

    await expect(sheet).not.toBeVisible({ timeout: 2000 });
  });
});

test.describe("BottomSheet with custom snap points", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/iframe.html?id=components-bottomsheet--custom-snap-points&viewMode=story");
  });

  test("opens at default snap point", async ({ page }) => {
    const openButton = page.getByRole("button", { name: /Open.*Snap/i });
    await openButton.click();

    const sheet = page.locator('[data-testid="bottom-sheet"]');
    await expect(sheet).toBeVisible();
  });

  test("snaps to different points on drag", async ({ page }) => {
    const openButton = page.getByRole("button", { name: /Open.*Snap/i });
    await openButton.click();

    const sheet = page.locator('[data-testid="bottom-sheet"]');
    await expect(sheet).toBeVisible();

    const handle = page.locator('[data-testid="bottom-sheet-handle"]');
    const handleBox = await handle.boundingBox();

    if (handleBox) {
      const startX = handleBox.x + handleBox.width / 2;
      const startY = handleBox.y + handleBox.height / 2;

      // Drag up to expand to next snap point
      await page.mouse.move(startX, startY);
      await page.mouse.down();
      await page.mouse.move(startX, startY - 150, { steps: 10 });
      await page.mouse.up();
    }

    // Sheet should still be visible after snapping
    await expect(sheet).toBeVisible();
  });
});

test.describe("BottomSheet with dismiss button", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/iframe.html?id=components-bottomsheet--with-dismiss-button-right&viewMode=story");
  });

  test("closes on dismiss button click", async ({ page }) => {
    const openButton = page.getByRole("button", { name: /Open/i });
    await openButton.click();

    const sheet = page.locator('[data-testid="bottom-sheet"]');
    await expect(sheet).toBeVisible();

    // Click the dismiss button
    const dismissButton = page.locator('[aria-label="Close"]').first();
    await dismissButton.click();

    await expect(sheet).not.toBeVisible();
  });
});

test.describe("BottomSheet with header and footer", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/iframe.html?id=components-bottomsheet--with-header-and-footer&viewMode=story");
  });

  test("renders header and footer", async ({ page }) => {
    const openButton = page.getByRole("button", { name: /Open/i });
    await openButton.click();

    const sheet = page.locator('[data-testid="bottom-sheet"]');
    await expect(sheet).toBeVisible();

    // Check header text
    await expect(page.getByText("Complete Layout")).toBeVisible();

    // Check footer buttons
    await expect(page.getByRole("button", { name: "Cancel" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Save" })).toBeVisible();
  });
});

test.describe("BottomSheet non-blocking", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/iframe.html?id=components-bottomsheet--non-blocking&viewMode=story");
  });

  test("page remains interactive with blocking=false", async ({ page }) => {
    const openButton = page.getByRole("button", { name: /Non-blocking/i });
    await openButton.click();

    const sheet = page.locator('[data-testid="bottom-sheet"]');
    await expect(sheet).toBeVisible();

    // The open button should still be visible and accessible
    await expect(openButton).toBeVisible();
  });
});

test.describe("BottomSheet with ref control", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/iframe.html?id=components-bottomsheet--with-ref&viewMode=story");
  });

  test("programmatic snap control via ref", async ({ page }) => {
    const openButton = page.getByRole("button", { name: /Ref Control/i });
    await openButton.click();

    const sheet = page.locator('[data-testid="bottom-sheet"]');
    await expect(sheet).toBeVisible();

    // Click snap buttons
    const snapTo600 = page.getByRole("button", { name: "Snap to 600" });
    await snapTo600.click();

    // Wait for animation
    await page.waitForTimeout(500);

    // Sheet should still be visible after snapping
    await expect(sheet).toBeVisible();
  });
});
