const { get } = require("http");
const rideModel = require("../models/rideModel");
const mapService = require("../services/maps.service");
const crypto = require("crypto");
const { sendMessageToSocketId } = require("../socket");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and Destination are required");
  }
  // const distanceTime = await mapService.getDistanceTime(pickup, destination);

  const baseFare = {
    car: 50,
    auto: 30,
    moto: 20,
  };

  const perKmRate = {
    car: 15,
    auto: 10,
    moto: 8,
  };

  const perMinuteRate = {
    car: 3,
    auto: 2,
    moto: 5,
  };

  // const fare = {
  //   car: Math.round(
  //     baseFare.car +
  //       (distanceTime.distance.value / 1000) * perKmRate.car +
  //       (distanceTime.duration.value / 60) * perMinuteRate.car
  //   ),
  //   auto:
  //     Math.round(baseFare.auto +
  //     (distanceTime.distance.value / 1000) * perKmRate.auto +
  //     (distanceTime.duration.value / 60) * perMinuteRate.auto),
  //   moto:
  //     Math.round(baseFare.moto +
  //     (distanceTime.distance.value / 1000) * perKmRate.moto +
  //     (distanceTime.duration.value / 60) * perMinuteRate.moto),
  // };
  // return fare;
  return { car: 500, auto: 300, moto: 200 };
}

function getOpt(num) {
  function generateOtp(num) {
    return crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
      .toString();
  }

  return generateOtp(num);
}
module.exports.createride = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup.trim() || !destination.trim() || !vehicleType.trim()) {
    throw new Error("All fields are required");
  }

  const fare = await getFare(pickup, destination);

  const ride = rideModel.create({
    user,
    pickup,
    destination,
    fare: fare[vehicleType],
    otp: getOpt(6),
  });
  return ride;
};

module.exports.getFare = getFare;

module.exports.confirmRide = async (rideId, _id) => {
  if (!rideId) {
    throw new Error(" Ride is required");
  }
  try {
    await rideModel.findOneAndUpdate(
      {
        _id: rideId,
      },
      {
        status: "accepted",
        captain: _id,
      }
    );
    const ride = await rideModel
      .findOne({
        _id: rideId,
      })
      .populate("user")
      .populate("captain")
      .select("+otp");

    if (!ride) {
      throw new Error("Ride not found");
    }

    return ride;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

module.exports.startRide = async ({ rideId, otp, captain }) => {
  if (!rideId || !otp) {
    throw new Error("Ride id and otp are required");
  }

  try {
    const ride = await rideModel
      .findOne({
        _id: rideId,
      })
      .populate("user")
      .populate("captain")
      .select("+otp");
    if (!ride) {
      throw new Error("Invalid OTP or Ride not found");
    }

    if (ride.otp !== otp) {
      throw new Error("Invalid OTP");
    }

    if (ride.status !== "accepted") {
      throw new Error("Ride not accepted");
    }

    await rideModel.findOneAndUpdate(
      {
        _id: rideId,
      },
      {
        status: "ongoing",
      }
    );

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride_started",
      data: ride,
    });

    return ride;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

module.exports.endRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride id is required");
  }

  try {
    const ride = await rideModel
      .findOne({
        _id: rideId,
        captain: captain._id,
      })
      .populate("user")
      .populate("captain")
      .select("+otp");
    if (!ride) {
      throw new Error("Ride not found");
    }

    await rideModel.findOneAndUpdate(
      {
        _id: rideId,
      },
      {
        status: "completed",
      }
    );

    return ride;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
