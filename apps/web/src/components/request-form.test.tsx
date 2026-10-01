import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { RequestForm } from "./request-form";

describe("RequestForm", () => {
  it("shows validation errors for an empty submission", async () => {
    const user = userEvent.setup();
    render(<RequestForm />);

    await user.click(screen.getByRole("button", { name: /preview request/i }));

    expect(screen.getByText("Use at least 5 characters")).toBeInTheDocument();
    expect(screen.getByText("Use at least 20 characters")).toBeInTheDocument();
  });

  it("previews a valid request without claiming it was saved", async () => {
    const user = userEvent.setup();
    render(<RequestForm />);

    await user.type(screen.getByLabelText("Title"), "New laptop");
    await user.type(
      screen.getByLabelText("Description"),
      "A new laptop is needed for backend development.",
    );
    await user.click(screen.getByRole("button", { name: /preview request/i }));

    expect(
      screen.getByText("Valid demo request—not saved"),
    ).toBeInTheDocument();
  });
});
