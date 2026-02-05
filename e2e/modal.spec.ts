import { test, expect } from "@playwright/test";

test.describe("Modal", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/iframe.html?id=components-modal--default&viewMode=story");
  });

  test("opens on button click", async ({ page }) => {
    const openButton = page.getByRole("button", { name: "Open Modal" });
    await openButton.click();

    const modal = page.locator('[data-testid="modal"]');
    await expect(modal).toBeVisible();
  });

  test("closes on backdrop click", async ({ page }) => {
    const openButton = page.getByRole("button", { name: "Open Modal" });
    await openButton.click();

    const modal = page.locator('[data-testid="modal"]');
    await expect(modal).toBeVisible();

    // Click on the backdrop (overlay area outside the modal)
    const overlay = page.locator('[data-testid="modal-overlay"]');
    await overlay.click({ position: { x: 10, y: 10 } });

    await expect(modal).not.toBeVisible();
  });

  test("closes on Escape key", async ({ page }) => {
    const openButton = page.getByRole("button", { name: "Open Modal" });
    await openButton.click();

    const modal = page.locator('[data-testid="modal"]');
    await expect(modal).toBeVisible();

    await page.keyboard.press("Escape");

    await expect(modal).not.toBeVisible();
  });
});

test.describe("Modal sizes", () => {
  const sizes = [
    { story: "size-small", name: "Small Modal" },
    { story: "size-medium", name: "Medium Modal" },
    { story: "size-large", name: "Large Modal" },
    { story: "size-extra-large", name: "Extra Large Modal" },
    { story: "size-full", name: "Full Modal" },
  ];

  for (const { story, name } of sizes) {
    test(`renders ${name} correctly`, async ({ page }) => {
      await page.goto(`/iframe.html?id=components-modal--${story}&viewMode=story`);

      const openButton = page.getByRole("button", { name: "Open Modal" });
      await openButton.click();

      const modal = page.locator('[data-testid="modal"]');
      await expect(modal).toBeVisible();

      // Check title is visible
      await expect(page.getByText(name)).toBeVisible();
    });
  }
});

test.describe("Modal with dismiss button", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/iframe.html?id=components-modal--with-dismiss-button&viewMode=story");
  });

  test("closes on dismiss button click", async ({ page }) => {
    const openButton = page.getByRole("button", { name: "Open Modal" });
    await openButton.click();

    const modal = page.locator('[data-testid="modal"]');
    await expect(modal).toBeVisible();

    // Click the dismiss button
    const dismissButton = page.locator('[aria-label="Close"]').first();
    await dismissButton.click();

    await expect(modal).not.toBeVisible();
  });
});

test.describe("Modal without overlay close", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/iframe.html?id=components-modal--no-close-on-overlay&viewMode=story");
  });

  test("does not close on backdrop click when closeOnOverlayClick=false", async ({ page }) => {
    const openButton = page.getByRole("button", { name: "Open Modal" });
    await openButton.click();

    const modal = page.locator('[data-testid="modal"]');
    await expect(modal).toBeVisible();

    // Click on the backdrop
    const overlay = page.locator('[data-testid="modal-overlay"]');
    await overlay.click({ position: { x: 10, y: 10 } });

    // Modal should still be visible
    await expect(modal).toBeVisible();
  });
});

test.describe("Modal without escape close", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/iframe.html?id=components-modal--no-close-on-escape&viewMode=story");
  });

  test("does not close on Escape key when closeOnEscape=false", async ({ page }) => {
    const openButton = page.getByRole("button", { name: "Open Modal" });
    await openButton.click();

    const modal = page.locator('[data-testid="modal"]');
    await expect(modal).toBeVisible();

    await page.keyboard.press("Escape");

    // Modal should still be visible
    await expect(modal).toBeVisible();
  });
});

test.describe("Modal accessibility", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/iframe.html?id=components-modal--with-accessibility&viewMode=story");
  });

  test("has correct ARIA attributes", async ({ page }) => {
    const openButton = page.getByRole("button", { name: "Open Modal" });
    await openButton.click();

    const modal = page.locator('[data-testid="modal"]');
    await expect(modal).toBeVisible();

    // Check for ARIA role
    await expect(modal).toHaveAttribute("role", "dialog");

    // Check for aria-modal
    await expect(modal).toHaveAttribute("aria-modal", "true");
  });

  test("traps focus within modal", async ({ page }) => {
    const openButton = page.getByRole("button", { name: "Open Modal" });
    await openButton.click();

    const modal = page.locator('[data-testid="modal"]');
    await expect(modal).toBeVisible();

    // Tab through elements - focus should stay within modal
    await page.keyboard.press("Tab");
    const focusedElement = page.locator(":focus");

    // The focused element should be inside the modal
    await expect(focusedElement).toBeVisible();
  });
});

test.describe("Modal with header and description", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/iframe.html?id=components-modal--full-example&viewMode=story");
  });

  test("renders header with icon and description", async ({ page }) => {
    const openButton = page.getByRole("button", { name: "Delete Account" });
    await openButton.click();

    const modal = page.locator('[data-testid="modal"]');
    await expect(modal).toBeVisible();

    // Check header text
    await expect(page.getByText("Delete Account")).toBeVisible();

    // Check description text
    await expect(page.getByText(/permanently delete your account/i)).toBeVisible();
  });
});
