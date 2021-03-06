const { STATUS_CODE } = require('../helpers');
const { userServices } = require('../services');

const userLogin = async (request, response) => {
  try {
    const { email, password } = request.body;
    const result = await userServices.userLogin(email, password);
    return response.status(STATUS_CODE.SUCCESS).json(result);
  } catch (error) {
    return response.status(STATUS_CODE.BAD_REQUEST).json({ message: error.message });
  }
};

const userEmail = async (request, response) => {
    try {
      const { email } = request.params;
      const result = await userServices.userEmail(email);
      return response.status(STATUS_CODE.SUCCESS).json({ message: result });
    } catch (error) {
      return response.status(STATUS_CODE.BAD_REQUEST).json({ message: error.message });
    }
};

const userRegistration = async (request, response) => {
  try {
    const { name, email, password, seller } = request.body;
    const result = await userServices.userRegistration(name, email, password, seller);
    return response.status(STATUS_CODE.CREATED).json(result);
  } catch (error) {
    return response.status(STATUS_CODE.BAD_REQUEST).json({ message: error.message });
  }
};

const userProfile = async (request, response) => {
  try {
    const { name, email } = request.body;
    const { authorization } = request.headers;
    const result = await userServices.userProfile(name, email, authorization);
    response.status(STATUS_CODE.SUCCESS).json(result);
  } catch (error) {
    response.status(STATUS_CODE.BAD_REQUEST).json({ message: error.message });
  }
};

module.exports = {
  userLogin,
  userRegistration,
  userEmail,
  userProfile,
};
