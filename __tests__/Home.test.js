import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../app/page";

describe("Home Component", () => {
    it("renders the todo list", () => {
        render(<Home />);
        expect(screen.getByText("Todo List")).toBeInTheDocument();
    });

    it("allows adding a task", async () => {
        render(<Home />);
        const input = screen.getByPlaceholderText("Add a new task");
        const addButton = screen.getByText("Add");

        fireEvent.change(input, { target: { value: "New Task" } });
        fireEvent.click(addButton);

        expect(await screen.findByText("New Task")).toBeInTheDocument();
    });
});
