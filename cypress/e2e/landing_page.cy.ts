describe("End-to-End Flow", () => {
  beforeEach(() => {
    // 1. Stub geolocation
    cy.visit("/", {
      onBeforeLoad(win) {
        cy.stub(win.navigator.geolocation, "getCurrentPosition").callsFake(
          (successCallback) => {
            successCallback({
              coords: { latitude: 33.7294, longitude: 73.0931 },
            });
          }
        );
      },
    });
  });

  it("loads config, gets user location, and displays nearby restaurants", () => {
    // 2. Intercept config query
    cy.intercept(
      "POST",
      "https://enatega-multivendor.up.railway.app/graphql",
      (req) => {
        if (req.body.query && req.body.query.includes("query Configuration")) {
          req.reply({
            data: {
              configuration: {
                googleApiKey: "FAKE_GOOGLE_API_KEY",
              },
            },
          });
        } else if (
          req.body.query &&
          req.body.query.includes("query Restaurants")
        ) {
          req.reply({
            data: {
              nearByRestaurants: {
                offers: [],
                sections: [],
                restaurants: [
                  {
                    _id: "abc123",
                    name: "Test Resutaurant",
                    address: "Islamabad, Pakistan",
                    slug: "test-restaurant",
                    deliveryTime: 20,
                    minimumOrder: 5,
                    rating: 4.5,
                    isAvailable: true,
                    location: { coordinates: [73.0931, 33.7294] },
                    image:
                      "https://img.freepik.com/free-photo/restaurant-interior_1127-3392.jpg?t=st=1739694232~exp=1739697832~hmac=46cc6eb0ae705bbca4cac753ed56b61aa85802866af440e148d746d6384f56f8&w=740",
                    reviewData: {
                      total: 10,
                      ratings: 4.5,
                      reviews: [],
                    },
                    categories: [],
                    openingTimes: [],
                    tax: 0,
                  },
                ],
              },
            },
          });
        }
      }
    ).as("graphql");

    // 3. Intercept reverse-geocoding
    cy.intercept("GET", "https://maps.googleapis.com/maps/api/geocode/json*", {
      status: "OK",
      results: [
        {
          formatted_address: "Test Address, Islamabad, Pakistan",
        },
      ],
    }).as("reverseGeocode");

    // Wait for configuration to load
    cy.wait("@graphql");

    // Wait for reverse-geocoding
    cy.wait("@reverseGeocode");

    // Check the address is displayed
    cy.get('[data-test="search-bar"]').should(
      "have.value",
      "Test Address, Islamabad, Pakistan"
    );

    // Trigger restaurant query
    cy.get('[data-test="find-restaurants-button"]').click();

    // Wait for restaurant list to come back
    cy.wait("@graphql");

    // Check the restaurant is displayed
    cy.get('[data-test="restaurant-card"]', { timeout: 10000 }).should(
      "contain.text",
      "Test Resutaurant"
    );
  });
});
