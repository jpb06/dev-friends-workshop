import React from "react";

import { render, screen } from "@testing-library/react";

import { LinearLoading } from "./LinearLoading";

describe("LinearLoading component", () => {
  it("should display a loading indicator", () => {
    render(<LinearLoading />);

    screen.getByRole("progressbar", { name: "linear-loading" });
  });
});
