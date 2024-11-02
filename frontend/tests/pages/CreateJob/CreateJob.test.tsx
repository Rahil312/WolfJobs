import { render, screen } from "@testing-library/react";
import React from "react";
import CreateJob from "../../../src/Pages/CreateJob/CreateJob";
import { MemoryRouter } from "react-router";

describe("CreateJob", () => {
  it("renders CreateJob", () => {
    render(
      <MemoryRouter>
        <CreateJob />
      </MemoryRouter>
    );
    // const headline = screen.getByText(/Hello/i);
    // expect(headline).toBeInTheDocument();
  });
});
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import CreateJob from "../../../src/Pages/CreateJob/CreateJob";
import { MemoryRouter } from "react-router";

describe("CreateJob", () => {
  it("renders CreateJob", () => {
    render(
      <MemoryRouter>
        <CreateJob />
      </MemoryRouter>
    );
    // const headline = screen.getByText(/Hello/i);
    // expect(headline).toBeInTheDocument();
  });

  it("renders form fields", () => {
    render(
      <MemoryRouter>
        <CreateJob />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Job Role/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Job Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Pay/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Job Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Required Skills/i)).toBeInTheDocument();
  });

  it("displays validation errors when required fields are empty", async () => {
    render(
      <MemoryRouter>
        <CreateJob />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Proceed/i));

    expect(await screen.findByText(/Job role is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Job pay is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Skills are required/i)).toBeInTheDocument();
  });

  it("submits the form with correct values", async () => {
    render(
      <MemoryRouter>
        <CreateJob />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Job Role/i), { target: { value: "Developer" } });
    fireEvent.change(screen.getByLabelText(/Job Type/i), { target: { value: "full-time" } });
    fireEvent.change(screen.getByLabelText(/Location/i), { target: { value: "Remote" } });
    fireEvent.change(screen.getByLabelText(/Pay/i), { target: { value: "100000" } });
    fireEvent.change(screen.getByLabelText(/Job Description/i), { target: { value: "Develop software" } });
    fireEvent.change(screen.getByLabelText(/Required Skills/i), { target: { value: "JavaScript, React" } });

    fireEvent.click(screen.getByText(/Proceed/i));

    // Add assertions to check if the form submission navigates correctly
  });
});