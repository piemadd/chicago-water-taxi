export const taxiStations = {
  ogilvie_union: {
    name: "Ogilvie/Union (Riverside Plaza & Madison)",
    coordinates: [
      41.88224963761097,
      -87.63860020208031
    ],
    mapsLink: "https://goo.gl/maps/QtLZUMW7D6PmmNgq8",
    color: "#277bb3",
    textColor: "#fff",
    to: {
      michigan: {
        departures: [
          "2023-06-24T10:05:00-05:00",
          "2023-06-24T11:45:00-05:00",
          "2023-06-24T13:25:00-05:00",
          "2023-06-24T15:05:00-05:00",
          "2023-06-24T16:45:00-05:00",
        ],
        duration: 20,
      },
      chinatown: {
        departures: [
          "2023-06-24T10:45:00-05:00",
          "2023-06-24T12:25:00-05:00",
          "2023-06-24T14:05:00-05:00",
          "2023-06-24T15:45:00-05:00",
        ],
        duration: 30,
      },
    }
  },
  michigan: {
    name: "Michigan Avenue (Wrigley Building & Rush)",
    coordinates: [
      41.88929991088218,
      -87.62521941056612
    ],
    mapsLink: "https://goo.gl/maps/AnDKWCQkLZCEj5sT9",
    color: "#4fd5fc",
    textColor: "#181a1b",
    to: {
      ogilvie_union: {
        departures: [
          "2023-06-24T10:25:00-05:00",
          "2023-06-24T12:05:00-05:00",
          "2023-06-24T13:45:00-05:00",
          "2023-06-24T15:25:00-05:00",
          "2023-06-24T17:05:00-05:00",
        ],
        duration: 20,
      },
      chinatown: {
        departures: [
          "2023-06-24T10:25:00-05:00",
          "2023-06-24T12:05:00-05:00",
          "2023-06-24T13:45:00-05:00",
          "2023-06-24T15:25:00-05:00",
        ],
        duration: 50,
      },
    }
  },
  chinatown: {
    name: "Chinatown (Ping Tom Park)",
    coordinates: [
      41.85714382088655,
      -87.63499474723132
    ],
    mapsLink: "https://goo.gl/maps/sNp2rDfcRrUsRWjj9",
    color: "#522298",
    textColor: "#fff",
    to: {
      ogilvie_union: {
        departures: [
          "2023-06-24T11:15:00-05:00",
          "2023-06-24T12:55:00-05:00",
          "2023-06-24T14:35:00-05:00",
          "2023-06-24T16:15:00-05:00",
        ],
        duration: 30,
      },
      michigan: {
        departures: [
          "2023-06-24T11:15:00-05:00",
          "2023-06-24T12:55:00-05:00",
          "2023-06-24T14:35:00-05:00",
          "2023-06-24T16:15:00-05:00",
        ],
        duration: 50,
      },
    }
  }
};

export default taxiStations;