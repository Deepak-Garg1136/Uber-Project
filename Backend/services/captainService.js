const capModel = require("../models/captainModel");

module.exports.createCaptain = async (
  firstname,
  lastname,
  email,
  password,
  color,
  plate,
  capacity,
  vehicleType
) => {
  console.log(
    firstname,
    lastname,
    email,
    password,
    color,
    plate,
    capacity,
    vehicleType
  );

  if (
    !firstname.trim() ||
    !lastname.trim() ||
    !email.trim() ||
    !password.trim() ||
    !color.trim() ||
    !plate.trim() ||
    capacity == 0 ||
    !vehicleType.trim()
  ) {
    throw new Error("All fields are required");
  }

  const captain = await capModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    vehicle: {
      color,
      plate,
      capacity,
      vehicleType,
    },
  });

  return captain;
};
