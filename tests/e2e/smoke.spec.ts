import { test, expect } from "@playwright/test";

test("homepage loads with brand and process hero", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Every tool has a place in the process/i })).toBeVisible();
  await expect(page.getByText(/Metal kitchen goods from prep to plate/i)).toBeVisible();
});

test("shop and product detail", async ({ page }) => {
  await page.goto("/shop");
  await expect(page.getByRole("heading", { name: /Shop kitchen goods/i })).toBeVisible();
  await page.goto("/products/northline-low-wall-fry-pan-10-inch");
  await expect(page.getByRole("heading", { name: /Low-Wall Fry Pan/i })).toBeVisible();
  await expect(page.getByText(/Verification required/i).first()).toBeVisible();
});

test("process navigation and compare empty state", async ({ page }) => {
  await page.goto("/process/heat");
  await expect(page.getByRole("heading", { name: "Heat" })).toBeVisible();
  await page.goto("/compare");
  await expect(page.getByText(/No products selected/i)).toBeVisible();
});

test("technique match and kitchen flow", async ({ page }) => {
  await page.goto("/technique-match");
  await page.getByRole("button", { name: /Match tools/i }).click();
  await expect(page.getByText(/matching tools/i)).toBeVisible();
  await page.goto("/kitchen-flow-builder");
  await expect(page.getByRole("heading", { name: /Kitchen flow builder/i })).toBeVisible();
});

test("legal and contact pages", async ({ page }) => {
  await page.goto("/about");
  await expect(page.getByText(/Galva, Illinois-based business/i)).toBeVisible();
  await page.goto("/contact");
  await expect(page.getByText(/\+1 \(505\) 689-4064/)).toBeVisible();
  await page.goto("/privacy-policy");
  await expect(page.getByText(/BUSINESS REVIEW REQUIRED/i)).toBeVisible();
});

test("404 page", async ({ page }) => {
  await page.goto("/this-route-does-not-exist");
  await expect(page.getByRole("heading", { name: /Page not found/i })).toBeVisible();
});

test("no admin route", async ({ page }) => {
  const res = await page.goto("/admin");
  expect(res?.status()).toBe(404);
});
