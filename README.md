# Invoice Generator Website

## Overview

The Invoice Generator website allows users to create, review, and download invoices. It supports customization of invoice details including billing information, item descriptions, and more.

## Features

- **Create Invoices**: Input billing information, item details, and additional notes.
- **Review Invoices**: Preview the invoice before finalizing.
- **Download Invoices**: Download the generated invoice as a PDF file.

## Setup and Installation

### Frontend

1. **Clone the Repository**:
    ```sh
    git clone <repository-url>
    cd <repository-directory>/frontend
    ```

2. **Install Dependencies**:
    ```sh
    npm install
    ```

3. **Environment Configuration**:
    - Create a `.env` file in the root directory of the frontend.
    - Add your environment variables as needed.

4. **Start the Development Server**:
    ```sh
    npm start
    ```

### Backend

1. **Navigate to Backend Directory**:
    ```sh
    cd <repository-directory>/backend
    ```

2. **Install Dependencies**:
    ```sh
    npm install
    ```

3. **Environment Configuration**:
    - Create a `.env` file in the root directory of the backend.
    - Add your API key:
      ```
      API_KEY=your_api_key_here
      ```

4. **Start the Backend Server**:
    ```sh
    npm start
    ```

## Usage

1. **Access the Website**:
   - Open `http://localhost:3000` in your web browser during development.

2. **Create an Invoice**:
   - Fill in the billing information, items, and additional details in the form.

3. **Review Invoice**:
   - Click the "Review Invoice" button to preview the invoice.

4. **Download Invoice**:
   - Once satisfied, download the invoice as a PDF.

## API Endpoints

- **Create Invoice**:
  - **URL**: `https://invoice-generator-qys7.onrender.com/api/create-invoice`
  - **Method**: POST
  - **Headers**: 
    - `Content-Type: application/json`
    - `Authorization: Bearer <API_KEY>`
  - **Body**: Invoice data in JSON format.

 ### Website link - [ Invoice Generator](https://invoice-generator-nine-green.vercel.app/)
