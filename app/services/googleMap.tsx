const configurationVariables = {
  SERVER_URL: "https://enatega-multivendor.up.railway.app/",
  WS_SERVER_URL: "wss://enatega-multivendor.up.railway.app/",
};

const GET_CONFIGURATION_QUERY = `
    query Configuration {
      configuration {
        _id
        currency
        currencySymbol
        deliveryRate
        twilioEnabled
        webClientID
        googleApiKey
        webAmplitudeApiKey
        googleMapLibraries
        googleColor
        webSentryUrl
        publishableKey
        clientId
        skipEmailVerification
        skipMobileVerification
        costType
      }
    }
  `;

interface Configuration {
  _id: string;
  currency: string;
  currencySymbol: string;
  deliveryRate: number;
  twilioEnabled: boolean;
  webClientID: string;
  googleApiKey: string;
  webAmplitudeApiKey: string;
  googleMapLibraries: string;
  googleColor: string;
  webSentryUrl: string;
  publishableKey: string;
  clientId: string;
  skipEmailVerification: boolean;
  skipMobileVerification: boolean;
  costType: string;
}

interface GraphQLResponse {
  data: {
    configuration: Configuration;
  };
  errors?: any;
}

async function fetchConfiguration(): Promise<Configuration | null> {
  try {
    const response = await fetch(configurationVariables.SERVER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query: GET_CONFIGURATION_QUERY }),
    });

    const result: GraphQLResponse = await response.json();
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
