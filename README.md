*POS Application*

Overview

The POS (Point of Sale) Application is a web-based platform designed to manage various business operations, such as product and category management, customer invoicing, statistics tracking, and more. The application features an admin panel for managing products and categories, a live search function, and a fake payment method for simulating transactions. The application is built with a RESTful API using Node.js and Express.js on the backend, and React with Redux on the frontend.

- Features
  - CRUD Operations: Fully implemented Create, Read, Update, Delete operations for products, categories, invoices, and customers.
  
  - Admin Panel: Secure admin panel for managing products and categories.
  
  - User Authentication: Login and registration system with password hashing using bcrypt.
  
  - Live Search: Search products dynamically in real-time.
  
  - Fake Payment Method: Simulate payment processes for transactions.
  
  - Statistics: View detailed statistics on sales and other key metrics.
  
  - Responsive Design: The UI is designed to be responsive across all devices.
  
  - Frontend: Developed using React, Redux, TailwindCSS, and Ant Design.
  
  - Backend: Built with Node.js, Express.js, and MongoDB, using Mongoose as the ORM.
 
- Technology Stack
  - Frontend:
    - React
    - Redux
    - TailwindCSS
    - Ant Design

  - Backend:
     - Node.js
     - Express.js
     - MongoDB
     - Mongoose
     - bcrypt
     - express-validator

  - Dependencies For Frontend:
    
          {
            "@ant-design/charts": "^2.1.2",
            "@ant-design/plots": "^2.2.8",
            "@reduxjs/toolkit": "^2.2.7",
            "@testing-library/jest-dom": "^5.17.0",
            "@testing-library/react": "^13.4.0",
            "@testing-library/user-event": "^13.5.0",
            "antd": "^5.20.0",
            "react": "^18.3.1",
            "react-dom": "^18.3.1",
            "react-highlight-words": "^0.20.0",
            "react-redux": "^9.1.2",
            "react-router-dom": "^6.26.0",
            "react-scripts": "5.0.1",
            "react-to-print": "^2.15.1",
            "web-vitals": "^2.1.4"
          }
  - Dependencies For Backend:
    
          {
            "bcrypt": "^5.1.1",
            "cors": "^2.8.5",
            "dotenv": "^16.4.5",
            "express": "^4.19.2",
            "express-validator": "^7.1.0",
            "mongoose": "^8.5.2",
            "morgan": "^1.10.0"
          }
    
  - Installation and Setup:
     -CLone the repository:
       
          git clone <repository-url>
          cd pos-application
    
     -Install dependencies:
      - Frontend:
 
            cd frontend
            npm install
    
      - Backend:
 
            cd backend
            npm install

    - Setup environment variables:
      
      Create a .env file in the backend directory with the following content:

          PORT=5000
          MONGO_URI=your-mongodb-uri

    - Run the application:
      - Start Backend Server:

            npm start

      - Start Frontend Server:
     
            npm start

        The application should now be running on http://localhost:3000 for the frontend and http://localhost:5000 for the backend.

        This project is licensed under the MIT License. See the LICENSE file for details.


![image](https://github.com/user-attachments/assets/309613fb-d602-42d8-9b3d-8c251da724b5)

![image](https://github.com/user-attachments/assets/b35d7857-640f-4934-87f6-749e90fe50b2)

![image](https://github.com/user-attachments/assets/b755868a-5e70-4aa5-bd58-b3e72c0d3316)

![image](https://github.com/user-attachments/assets/71365bac-f9ef-4efa-a660-2186b54324f3)

![image](https://github.com/user-attachments/assets/eeeea364-6461-4798-b6b7-99494be20f77)

![image](https://github.com/user-attachments/assets/95f071d5-d18d-40e5-926f-2bf6c1b8b071)

![image](https://github.com/user-attachments/assets/05d9c9e2-0b8e-4cc3-92ba-b9f9a581ca8c)
