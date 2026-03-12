import { render, screen, fireEvent } from "@testing-library/react";
import DTRPlanner from "./DTRPlanner";

describe("DTRPlanner component", () => {
  it("calculates remaining times for given FC", () => {
    render(<DTRPlanner />);
    const minInput = screen.getByLabelText(/minutes:/i);
    const secInput = screen.getByLabelText(/seconds:/i);
    fireEvent.change(minInput, { target: { value: "8" } });
    fireEvent.change(secInput, { target: { value: "30" } });
    fireEvent.click(screen.getByText(/calculate/i));
    // Expect list entries for each percent, including total time
    expect(screen.getByText(/fc as 75%/i)).toBeInTheDocument();
    expect(screen.getByText(/fc as 80%/i)).toBeInTheDocument();
    // also verify total is shown: for 8:30 and 75% total = 11:20
    expect(screen.getByText(/total 11:20/i)).toBeInTheDocument();
  });
});
