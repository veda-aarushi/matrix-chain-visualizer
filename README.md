# matrix-chain-visualizer

This is a fullstack web application that solves and visualizes the Matrix Chain Multiplication problem. The backend is built with Node.js and Express, while the frontend is implemented using HTML, CSS, JavaScript, and SVG for tree visualization.

#Overview

Matrix Chain Multiplication is a classic optimization problem in dynamic programming. The objective is to find the most efficient way to multiply a sequence of matrices, minimizing the total number of scalar multiplications.

This project:
- Computes the optimal multiplication cost
- Displays the multiplication order
- Visualizes the multiplication order as a binary tree


# How to Run

### Backend

1. Navigate to the backend directory:
cd backend

markdown
Copy
Edit

2. Install dependencies:
npm install

markdown
Copy
Edit

3. Start the server:
node server.js

markdown
Copy
Edit

The backend will run on `http://localhost:5000`.

### Frontend

1. Open `frontend/index.html` directly in a web browser.

2. Enter matrix dimensions (comma-separated) and click "Optimize" to see results and visualization.

## Example

Input:
10, 20, 30, 40


Output:
- Optimal Cost: 18000
- Order: ((A1 x A2) x A3)

A tree is rendered showing the optimal order visually using SVG.

# Technologies Used

- Node.js
- Express
- HTML, CSS, JavaScript
- SVG for visualization

# License

This project is licensed under the MIT License.
