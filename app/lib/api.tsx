// lib/api.ts
export const configurationVariables = {
  SERVER_URL: "https://enatega-multivendor.up.railway.app/graphql/",
  WS_SERVER_URL: "wss://enatega-multivendor.up.railway.app/",
};

// Full query with offers, sections, and all restaurant fields
export const RESTAURANT_LIST_QUERY = `
    query Restaurants($latitude: Float, $longitude: Float) {
      nearByRestaurants(latitude: $latitude, longitude: $longitude) {
        offers {
          _id
          name
          tag
          restaurants
        }
        sections {
          _id
          name
          restaurants
        }
        restaurants {
          _id
          name
          image
          slug
          address
          location {
            coordinates
          }
          deliveryTime
          minimumOrder
          tax
          reviewData {
            total
            ratings
            reviews {
              _id
            }
          }
          categories {
            _id
            title
            foods {
              _id
              title
            }
          }
          rating
          isAvailable
          openingTimes {
            day
            times {
              startTime
              endTime
            }
          }
        }
      }
    }
  `;

export const GET_CONFIGURATION_QUERY = `
    query Configuration {
      configuration {
        googleApiKey
      }
    }
  `;

// Extend your TypeScript interfaces
export interface Configuration {
  googleApiKey: string;
}

export interface Review {
  _id: string;
}

export interface ReviewData {
  total: number;
  ratings: number;
  reviews: Review[];
}

export interface Food {
  _id: string;
  title: string;
}

export interface Category {
  _id: string;
  title: string;
  foods: Food[];
}

export interface OpeningTime {
  startTime: string;
  endTime: string;
}

export interface OpeningDay {
  day: string;
  times: OpeningTime[];
}

export interface Restaurant {
  _id: string;
  name: string;
  image: string;
  slug: string;
  address: string;
  location: {
    coordinates: number[];
  };
  deliveryTime: number;
  minimumOrder: number;
  tax: number;
  reviewData: ReviewData;
  categories: Category[];
  rating: number;
  isAvailable: boolean;
  openingTimes: OpeningDay[];
}

// If you want to capture 'offers' and 'sections' too:
export interface Offer {
  _id: string;
  name: string;
  tag: string;
  restaurants: string[];
}

export interface Section {
  _id: string;
  name: string;
  restaurants: string[];
}

export interface NearByRestaurantsResult {
  offers: Offer[];
  sections: Section[];
  restaurants: Restaurant[];
}

// Adjust your fetch function to return everything from nearByRestaurants
// lib/api.ts
export async function fetchRestaurants(
  latitude: number,
  longitude: number
): Promise<Restaurant[] | null> {
  try {
    const response = await fetch(configurationVariables.SERVER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: RESTAURANT_LIST_QUERY,
        variables: { latitude, longitude },
      }),
    });
    const result = await response.json();
    if (result.errors) {
      console.error("GraphQL errors:", result.errors);
      return null;
    }

    // Return only the 'restaurants' array
    return result.data.nearByRestaurants.restaurants;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return null;
  }
}

export async function fetchConfiguration(): Promise<Configuration | null> {
  try {
    const response = await fetch(configurationVariables.SERVER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query: GET_CONFIGURATION_QUERY }),
    });
    const result = await response.json();
    if (result.errors) {
      console.error("GraphQL errors:", result.errors);
      return null;
    }
    return result.data.configuration;
  } catch (error) {
    console.error("Error fetching configuration:", error);
    return null;
  }
}
