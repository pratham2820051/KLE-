

# SDP Project

## Overview

The SDP (Substance Dependence Program) is a healthcare management system for managing patients, counselors, and camps for substance dependence treatment. It includes features for patient registration, allocation, and prediction models for health outcomes.

## Repository Structure

- **SDP-CLIENT**: Frontend React application for the user interface.
- **SDP-SERVER**: Backend Node.js application with Express.js for API services.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

## Setup

### Clone the Repository

```bash
git clone https://github.com/AmoghTalawar/SDP-Client.git
git clone https://github.com/AmoghTalawar/SDP-backend.git
```

### Backend Setup

1. Navigate to the backend directory:

```bash
cd SDP-SERVER
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `.env` file in the root of `SDP-SERVER` with the following content:

```env
NODE_ENV=development
PORT=5000
JWT_SECRET=your_jwt_secret_here  # You can generate a secret using: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
MONGODB_URI=mongodb://localhost:27017/sdp
EMAIL=your_email@gmail.com
PASSWORD=your_email_password
```

4. Run the backend:

```bash
npm start
```

The backend will run on `http://localhost:5000`.

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd SDP-CLIENT
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `.env` file in the root of `SDP-CLIENT` with the following content:

```env
REACT_APP_API_URL=http://localhost:5000
```

4. Run the frontend:

```bash
npm start
```

The frontend will run on `http://localhost:3000`.

## Running the Application

1. Ensure the backend server is running on `http://localhost:5000`.
2. Ensure the frontend development server is running on `http://localhost:3000`.
3. Open your browser and go to `http://localhost:3000`.

## Testing

### Login as Admin

1. Navigate to `http://localhost:3000/login`.
2. Enter admin credentials (default: email: `admin@example.com`, password: `admin`).
3. Access the admin dashboard to manage patients, counselors, and camps.

### Login as Faculty

1. Use faculty credentials provided in the system.
2. Access the faculty dashboard to view assigned patients and add new ones.

### Adding a New Patient

1. Login as admin or faculty.
2. Navigate to the "Patients" section.
3. Click "Add Patient".
4. Fill in the form with the following details:
   - Basic Info: Name, age, gender, address, phone, etc.
   - Medical History: Past and present medical problems, psychiatric complications.
   - Family History: Family members' health status.
   - Treatment History: Previous treatments and details.
   - Counsellor Section: Childhood history, educational background, etc.
5. Submit the form to save the patient.

### Allocating Patients

1. Login as admin.
2. Go to the "Camp" section.
3. View unallocated patients.
4. Select patients and assign them to a counselor.
5. Update the allocation status.

## Prediction Model

The system includes prediction models for health outcomes.

### Using the Prediction Model

1. Navigate to the "Prediction" section in the faculty dashboard.
2. Select the type of prediction (Sober Period, AAI, Risk Level).
3. Enter patient data as required.
4. Submit to get predictions.

### API Endpoints for Predictions

- **Sober Period Prediction**: `POST /api/prediction/soberPeriod`
- **AAI Prediction**: `POST /api/prediction/aaiPrediction`
- **Risk Level Prediction**: `POST /api/prediction/riskPrediction`

## Troubleshooting

1. **Backend not connecting**: Check MongoDB connection string in `.env`. Ensure MongoDB is running.
2. **Frontend not loading**: Verify `REACT_APP_API_URL` in `.env` points to the correct backend URL.
3. **Authentication issues**: Check JWT_SECRET in backend `.env`. Ensure tokens are not expired.
4. **Patient data not displaying**: Ensure the user has the correct role (admin or faculty) and the API routes are accessible.
5. **Translation not working**: Check the language context and ensure translations are loaded.

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Make your changes.
4. Commit your changes: `git commit -m 'Add some feature'`.
5. Push to the branch: `git push origin feature/your-feature`.
6. Open a pull request.

## License

This project is licensed under the MIT License.
