/**
 * @swagger
 * tags:
 *   name: Expenses
 *   description: Expense management
 */

/**
 * @swagger
 * /api/expenses:
 *   post:
 *     summary: Create a new expense
 *     description: Creates a new expense for the authenticated user.
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     securityDefinitions:
 *       JWT:
 *        type: apiKey
 *        in: header
 *        name: access_token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 5000
 *               title:
 *                 type: string
 *                 example: Testing
 *               category:
 *                 type: string
 *                 example: Pooja Expenses
 *     responses:
 *       201:
 *         description: Expense created successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/expenses:
 *   get:
 *     summary: Retrieve expenses for the authenticated user
 *     description: Retrieves a list of expenses for the authenticated user.
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     securityDefinitions:
 *       JWT:
 *        type: apiKey
 *        in: header
 *        name: access_token
 *     responses:
 *       200:
 *         description: A list of expenses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: Testing
 *                   amount:
 *                     type: number
 *                     example: 5000
 *                   category:
 *                     type: string
 *                     example: Pooja Expenses
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/expenses/{id}:
 *   put:
 *     summary: Update an existing expense
 *     description: Updates an existing expense for the authenticated user.
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the expense to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 6000
 *               title:
 *                 type: string
 *                 example: Updated Expense
 *               category:
 *                 type: string
 *                 example: Updated Category
 *     responses:
 *       200:
 *         description: Expense updated successfully
 *       404:
 *         description: Expense not found
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/expenses/{id}:
 *   delete:
 *     summary: Delete an expense
 *     description: Deletes an expense for the authenticated user.
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the expense to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Expense deleted successfully
 *       404:
 *         description: Expense not found
 *       401:
 *         description: Unauthorized
 */