describe("Todo List E2E Tests", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
    });

    it("Should add a new task", () => {
        cy.get("input[placeholder='Add a new task']").type("Test Task");
        cy.contains("Add").click();

        cy.contains("Test Task").should("exist");
    });

    it("Should mark a task as completed", () => {
        cy.get("input[placeholder='Add a new task']").type("Complete Task");
        cy.contains("Add").click();

        cy.contains("Complete Task").click();
        cy.contains("Complete Task").should("have.css", "text-decoration", "line-through solid rgb(128, 128, 128)");
    });

    it("Should delete a task", () => {
        cy.get("input[placeholder='Add a new task']").type("Delete Me");
        cy.contains("Add").click();

        cy.contains("Delete Me").parent().find("button").click();
        cy.contains("Delete Me").should("not.exist");
    });
});
