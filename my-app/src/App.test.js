import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders app title", () => {
  render(<App />);
  const title = screen.getByText(/coffee calc/i);
  expect(title).toBeInTheDocument();

  // ensure navigation includes all modes
  expect(screen.getByRole("button", { name: /time ratios/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /manual entry/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /charge temp/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /dtr planner/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /post‑roast weight loss/i })).toBeInTheDocument();
});
