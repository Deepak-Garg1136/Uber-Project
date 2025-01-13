const axios = require("axios");
const captainModel = require("../models/captainModel");
module.exports.getAddressCoordinates = async (address) => {
  // const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  // const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
  //   address
  // )}&key=${apiKey}`;

  // try {
  //   const response = await axios.get(url);
  //   if (response.data.status === "OK") {
  //     const location = response.data.results[0].geometry.location;
  //     return {
  //       lat: location.lat,
  //       lng: location.lng,
  //     };
  //   } else {
  //     throw new Error("Unable to fetch coordinates");
  //   }
  // } catch (error) {
  //   console.error(error);
  //   throw new Error("Error fetching coordinates");
  // }
  return {
    lng: 76.58524059182368,
    ltd: 28.8822719444765,
  };
};

module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      const data = response.data.rows[0].elements[0];
      return {
        distance: data.distance.text,
        duration: data.duration.text,
      };
    } else {
      throw new Error("Unable to fetch distance and time");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching distance and time");
  }
};

module.exports.getSuggestions = async (input) => {
  if (!input) {
    throw new Error("Query is required");
  }
  //   const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  //   const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
  //     input
  //   )}&types=(cities)&key=${apiKey}`;
  //   try {
  //     const response = await axios.get(url);
  //     if (response.data.status === "OK") {
  //       return response.data.predictions;
  //     } else {
  //       throw new Error("Unable to fetch suggestions");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     throw new Error("Error fetching suggestions");
  //   }

  return [
    "Delhi",
    "Department of Computer science and Applications Maharshi Dayanand University, Rohtak",
    "Mumbai",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "Hyderabad",
    "Pune",
    "Jaipur",
    "Ahmedabad",
    "Surat",
  ];
};

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
  if (!ltd || !lng || !radius) {
    throw new Error("Latitude, Longitude and Radius are required");
  }
  const captains = await captainModel.find({
    // radius in km
    location: {
      $geoWithin: {
        $centerSphere: [[lng, ltd], radius / 6371],
      },
    },
  });
  return captains;
};
