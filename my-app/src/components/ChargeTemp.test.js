import { render, screen, fireEvent } from "@testing-library/react";
import ChargeTemp from "./ChargeTemp";

describe("ChargeTemp component", () => {
  it("shows range based on density", () => {
    render(<ChargeTemp />);
    const input = screen.getByLabelText(/bean density/i);
    fireEvent.change(input, { target: { value: "640" } });
    fireEvent.click(screen.getByText(/calculate/i));
    // conservative: diff 10 -> +1 => 181; aggressive: diff 10 -> +5 => 185
    expect(screen.getByText(/estimated charge temp/i)).toHaveTextContent("181.0–185.0°C");
  });
});
