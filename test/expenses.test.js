import { expensesController } from "../controllers/expensesController";
import { StatusCodes } from "http-status-codes";
import { expensesServices } from "../services/expensesServices.js";
import { ErrorHandler } from "../middleware/errorHandler.js";
import { CONSTANTS } from "../config/constants.js";


jest.mock("../services/expensesServices.js"); // Mock the expenses services module

describe("Expense Controller", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      user: {
        _id: "user123",
      },
      body: {
        amount: 100,
        description: "Test expense",
        // ... other properties if needed
      },
      params: {
        id: "expense123",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  describe("createExpense", () => {
    it("should create an expense and return CREATED status", async () => {
      const mockExpense = { _id: "expense123", ...req.body };
      expensesServices.addExpense.mockResolvedValueOnce(mockExpense);

      await expensesController.createExpense(req, res, next);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
      expect(res.json).toHaveBeenCalledWith(mockExpense);
    });

    it("should call next with ErrorHandler if an error occurs", async () => {
      const errorMessage = "Error creating expense";
      expensesServices.addExpense.mockRejectedValueOnce(
        new Error(errorMessage)
      );

      await expensesController.createExpense(req, res, next);

      expect(next).toHaveBeenCalledWith(
        new ErrorHandler(StatusCodes.BAD_REQUEST, errorMessage)
      );
    });
  });

  describe("getExpensesByUserId", () => {
    it("should return expenses for a user and status OK", async () => {
      const mockExpenses = [{ _id: "expense123", ...req.body }];
      expensesServices.expensesByUserId.mockResolvedValueOnce(mockExpenses);

      await expensesController.getExpensesByUserId(req, res, next);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith(mockExpenses);
    });

    it("should call next with ErrorHandler if an error occurs", async () => {
      const errorMessage = "Error fetching expenses";
      expensesServices.expensesByUserId.mockRejectedValueOnce(
        new Error(errorMessage)
      );

      await expensesController.getExpensesByUserId(req, res, next);

      expect(next).toHaveBeenCalledWith(
        new ErrorHandler(StatusCodes.NOT_FOUND, errorMessage)
      );
    });
  });

  describe("updateExpenses", () => {
    it("should update an expense and return OK status", async () => {
      const mockExpense = { _id: "expense123", ...req.body };
      expensesServices.updateUserExpense.mockResolvedValueOnce(mockExpense);

      await expensesController.updateExpenses(req, res, next);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith({
        message: CONSTANTS.EXPENSES_DELETED,
      });
    });

    it("should return NOT_FOUND if expense does not exist", async () => {
        expensesServices.updateUserExpense.mockResolvedValueOnce(null);

      await expensesController.updateExpenses(req, res, next);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
      expect(res.json).toHaveBeenCalledWith({
        message: CONSTANTS.EXPENSES_NOT_FOUND,
      });
    });

    it("should call next with ErrorHandler if an error occurs", async () => {
      const errorMessage = "Error updating expense";
      expensesServices.updateUserExpense.mockRejectedValueOnce(
        new Error(errorMessage)
      );

      await expensesController.updateExpenses(req, res, next);

      expect(next).toHaveBeenCalledWith(
        new ErrorHandler(StatusCodes.INTERNAL_SERVER_ERROR, errorMessage)
      );
    });
  });

  describe("deleteExpenses", () => {
    it("should delete an expense and return OK status", async () => {
        expensesServices.deleteUserExpenses.mockResolvedValueOnce(true);

      await expensesController.deleteExpenses(req, res, next);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith({
        message: CONSTANTS.EXPENSES_DELETED,
      });
    });

    it("should return NOT_FOUND if expense does not exist", async () => {
        expensesServices.deleteUserExpenses.mockResolvedValueOnce(null);

      await expensesController.deleteExpenses(req, res, next);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
      expect(res.json).toHaveBeenCalledWith({
        message: CONSTANTS.EXPENSES_NOT_FOUND,
      });
    });

    it("should call next with ErrorHandler if an error occurs", async () => {
      const errorMessage = "Error deleting expense";
      expensesServices.deleteUserExpenses.mockRejectedValueOnce(
        new Error(errorMessage)
      );

      await expensesController.deleteExpenses(req, res, next);

      expect(next).toHaveBeenCalledWith(
        new ErrorHandler(StatusCodes.INTERNAL_SERVER_ERROR, errorMessage)
      );
    });
  });
});
