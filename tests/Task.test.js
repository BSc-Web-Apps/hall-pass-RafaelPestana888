import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import Task from '../components/Task';

// Mock any components or contexts used by Task
jest.mock("", () => ({
  
}));

describe("Task", () => {
  test("renders a task", () => {
    const task = {
      id: 1,
      text: "Test Task",
      description: "Test Category",
      isChecked: false,
    };

    render(<Task taskItem={task} />);

    // Just check if the title and category are displayed
    const titleElement = screen.getByText("Test Task");
    const categoryElement = screen.getByText("Test Category");
    console.log({titleElement});
    expect(titleElement).toBeTruthy();
    expect(categoryElement).toBeTruthy();
  });
});