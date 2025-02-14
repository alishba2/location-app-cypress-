describe("Landing Page", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000"); // Adjust if needed
    });
  
    it("should display the navbar correctly", () => {
      cy.get("nav").should("exist");
      cy.contains("ENATEGA").should("be.visible");
      cy.contains("Login").should("be.visible");
      cy.contains("Sign up").should("be.visible");
    });
  
    it("should display the hero section with input and buttons", () => {
      cy.get("input[placeholder='Enter Delivery Address']").should("exist");
      cy.contains("Share Location").should("be.visible");
      cy.contains("Find Restaurants").should("be.visible");
    });
  
    it("should allow user to type an address", () => {
      cy.get("input[placeholder='Enter Delivery Address']")
        .type("123 Main St")
        .should("have.value", "123 Main St");
    });
  
    it("should display the Explore Countries section", () => {
      cy.contains("Explore Countries").should("be.visible");
      cy.contains("Germany").should("be.visible");
      cy.contains("Greece").should("be.visible");
    });
  
    it("should navigate to a country when clicked", () => {
      cy.contains("Germany").click();
      cy.url().should("include", "/germany"); // Adjust based on your routing
    });
  });
  