import { userController } from "../controllers/userController.js"; // Adjust the path to your module
import { StatusCodes } from "http-status-codes"; // Ensure this is imported
import { userServices } from "../services/userServices.js"; // Adjust the path to your user services module
import { CONSTANTS } from "../config/constants.js"; // Adjust the path to your constants module
import { ErrorHandler } from "../middleware/errorHandler.js";

jest.mock("../services/userServices.js"); // Mock the user services module

describe("userRegister", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        email: "test@example.com",
        username: "testuser",
        // ... other user properties if needed
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should create a user and return CREATED status", async () => {
    userServices.createUser.mockResolvedValueOnce({
      _id: "123",
      username: "testuser",
      email: "test@example.com",
    });

    await userController.userRegister(req, res, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
    expect(res.json).toHaveBeenCalledWith({
      _id: "123",
      username: "testuser",
      email: "test@example.com",
    });
  });

  it("should return BAD_REQUEST if user already exists", async () => {
    userServices.createUser.mockRejectedValueOnce({ code: 11000 }); // Simulate duplicate key error

    await userController.userRegister(req, res, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({ message: CONSTANTS.ALREADY_EXIST });
  });

  it("should return BAD_REQUEST for other errors", async () => {
    const errorMessage = "Some other error";
    userServices.createUser.mockRejectedValueOnce(new Error(errorMessage));

    await userController.userRegister(req, res, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });

  it("should handle unexpected errors", async () => {
    const unexpectedError = new Error("Unexpected error");
    userServices.createUser.mockRejectedValueOnce(unexpectedError);

    await userController.userRegister(req, res, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({ message: unexpectedError.message });
  });
});


describe("loginUser", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        email: "test@example.com",
        // ... other properties if needed
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should return user data and status OK if user exists", async () => {
    const mockUser = {
      _id: "123",
      email: "test@example.com",
      username: "testuser",
    };
    userServices.findUserByEmail.mockResolvedValueOnce(mockUser);

    await userController.loginUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  it("should call next with ErrorHandler if an error occurs", async () => {
    const errorMessage = "User not found";
    userServices.findUserByEmail.mockRejectedValueOnce(new Error(errorMessage));

    await userController.loginUser(req, res, next);

    expect(next).toHaveBeenCalledWith(
      new ErrorHandler(StatusCodes.UNAUTHORIZED, errorMessage)
    );
  });
});
