describe("Landing Page", () => {
  beforeEach(() => {
    // Stub geolocation so that a known position is returned.
    cy.window().then((win) => {
      cy.stub(win.navigator.geolocation, "getCurrentPosition").callsFake((success) => {
        success({
          coords: { latitude: 12.34, longitude: 56.78 },
        });
      });
    });

    // Intercept the GraphQL configuration query to return a fake API key.
    cy.intercept("POST", "**/graphql/", (req) => {
      if (req.body.query.includes("query Configuration")) {
        req.reply({
          data: { configuration: { googleApiKey: "FAKE_GOOGLE_API_KEY" } },
        });
      }
    }).as("getConfig");

    // Intercept the Google Maps Geocoding API call and return a known address.
    cy.intercept("GET", "https://maps.googleapis.com/maps/api/geocode/json*", {
      statusCode: 200,
      body: {
        status: "OK",
        results: [{ formatted_address: "123 Test Address" }],
      },
    }).as("geocode");

    // Visit the landing page.
    cy.visit("http://localhost:3000");

    // Wait for both the configuration and geocoding API calls to complete.
    cy.wait("@getConfig");
    cy.wait("@geocode");
  });

  it("should display the navbar with populated address", () => {
    // Verify the navbar exists and contains the correct elements.
    cy.get("nav").should("exist");
    cy.contains("ENATEGA").should("be.visible");
    cy.contains("Login").should("be.visible");
    cy.contains("Sign up").should("be.visible");

    // Verify the navbar location button shows the auto-populated address.
    cy.get("nav")
      .find("button")
      .contains("📍")
      .parent()
      .should("contain", "123 Test Address");
  });

  it("should display a read-only search input populated with the user's address", () => {
    cy.get("input[placeholder='Enter Delivery Address']")
      .should("have.value", "123 Test Address")
      .and("have.attr", "readonly");
  });

  it("should display the hero section with location buttons", () => {
    cy.contains("Share Location").should("be.visible");
    cy.contains("Find Restaurants").should("be.visible");
  });

  it("should navigate to /restaurant-list when 'Find Restaurants' is clicked", () => {
    cy.contains("Find Restaurants").click();
    cy.url().should("include", "/restaurant-list");
  });
});
