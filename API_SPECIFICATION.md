# API Specification - EnableU Colab

This document outlines the API endpoints required by the React frontend to support the Gamified Accessible Learning App.

## Base URL 
Default: `http://localhost:5000/api`

## Authentication
Most endpoints (except login/register) require a Bearer Token in the `Authorization` header.
`Authorization: Bearer <JWT_TOKEN>`

---

## 1. Authentication Endpoints

### POST `/auth/register`
Create a new user account.
- **Request Body:**
  ```json
  {
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "strongpassword123"
  }
  ```
- **Response (201):**
  ```json
  { "message": "User registered successfully" }
  ```

### POST `/auth/login`
Authenticate user and get token.
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "strongpassword123"
  }
  ```
- **Response (200):**
  ```json
  {
    "token": "JWT_TOKEN_HERE",
    "user": {
      "id": "user_123",
      "fullName": "John Doe",
      "email": "john@example.com"
    }
  }
  ```

### POST `/auth/forgot-password`
Request a password reset link.
- **Request Body:**
  ```json
  { "email": "john@example.com" }
  ```
- **Response (200):**
  ```json
  { "message": "Reset link sent to your email" }
  ```

---

## 2. Dashboard & User Data (Private)

### GET `/auth/stats`
Fetch current user's performance statistics.
- **Response (200):**
  ```json
  {
    "gamesPlayed": 12,
    "totalScore": 84,
    "avgScore": 7.5,
    "rank": 42
  }
  ```

### GET `/auth/leaderboard`
Fetch the global top scores.
- **Response (200):**
  ```json
  [
    { "id": "u1", "name": "AccessibilityPro", "score": 98 },
    { "id": "u2", "name": "ReactWizard", "score": 95 },
    { "id": "u3", "name": "InclusionHero", "score": 92 }
  ]
  ```

---

## 3. Game Endpoints (Private)

### GET `/questions`
Fetch 10 random questions for the MCQ challenge.
- **Response (200):**
  ```json
  [
    {
      "id": 1,
      "question": "What is the primary purpose of 'aria-label'?",
      "options": ["Style", "Accessibility Label", "ID", "Visibility"],
      "correctAnswer": 1
    }
  ]
  ```

### POST `/game/score`
Submit results after completing a game.
- **Request Body:**
  ```json
  {
    "score": 8,
    "totalQuestions": 10,
    "timestamp": "2024-02-12T00:00:00.000Z"
  }
  ```
- **Response (200):**
  ```json
  { "message": "Score saved successfully", "newRank": 41 }
  ```

---

## 4. Error Responses
Standard error format across all APIs:
- **Response (4xx/5xx):**
  ```json
  { "message": "Clear description of what went wrong" }
  ```
