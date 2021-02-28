import React from "react";

import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";

import { StatusReport } from "./StatusReport";

describe("Status report component", () => {
  it("should display an error", () => {
    render(<StatusReport status="errored" />);

    screen.getByText(/oh no!/i);
    screen.getByText(/something went wrong... sorry!/i);
  });

  it("should display a loading indicator", () => {
    render(<StatusReport status="loading" />);

    screen.getByRole("progressbar", { name: "circle-loading" });
  });

  it("should display nothing", () => {
    render(<StatusReport status="ready" />);

    expect(screen.queryByText(/oh no!/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/something went wrong... sorry!/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("progressbar", { name: "circle-loading" })
    ).not.toBeInTheDocument();
  });
});
