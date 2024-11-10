// Contact.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Contact from "../pages/Contact"; // Adjust the import path based on your project structure
import axios from "axios";

// Mock the axios module
jest.mock("axios");

describe("Contact Component - Message Form", () => {
  beforeEach(() => {
    // Clear local storage and mock functions before each test
    localStorage.clear();
    jest.clearAllMocks();
  });

  test("renders all form elements", () => {
    render(<Contact />);
    expect(screen.getByPlaceholderText(/your name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/subject/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/your message/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send message/i })).toBeInTheDocument();
  });

  test("submits form successfully and displays success message", async () => {
    // Mock successful axios post response
    axios.post.mockResolvedValueOnce({ data: { message: "Message sent successfully!" } });

    render(<Contact />);

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText(/your name/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByPlaceholderText(/your email/i), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByPlaceholderText(/subject/i), { target: { value: "Test Subject" } });
    fireEvent.change(screen.getByPlaceholderText(/your message/i), { target: { value: "This is a test message." } });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    // Wait for success message to appear and button to be disabled
    await waitFor(() => {
      expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /send message/i })).toBeDisabled();
    });

    // Verify local storage item is set
    expect(localStorage.getItem("messageSubmitted")).toBe("true");
  });

  test("shows error alert on form submission failure", async () => {
    // Mock axios post to reject with an error
    axios.post.mockRejectedValueOnce(new Error("Network Error"));

    render(<Contact />);

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText(/your name/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByPlaceholderText(/your email/i), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByPlaceholderText(/subject/i), { target: { value: "Test Subject" } });
    fireEvent.change(screen.getByPlaceholderText(/your message/i), { target: { value: "This is a test message." } });

    // Mock alert to avoid actual pop-ups during test
    window.alert = jest.fn();

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    // Wait for alert to be called
    await waitFor(() => expect(window.alert).toHaveBeenCalledWith("Failed to send message. Please try again later."));
  });
});
