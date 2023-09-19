## Welcome to Dashboard_Backend

# Project Name

Brief project description here.

## Table of Contents

- [Project Overview](#project-overview)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

Provide a brief overview of the project, its purpose, and any key features.

## Database Schema

### User

- `userId`: Primary key
- `profileImage`: VARCHAR(20)
- `dob`: DATE
- `graduation`: DATE
- `work`: BOOLEAN
- `adharcard`: BOOLEAN
- `userName`: VARCHAR(20) (Not null)
- `email`: VARCHAR(20) (Not null)
- `phoneNumber`: VARCHAR(20) (Not null)


### Course

- `courseId`: Primary key
- `title`: VARCHAR(20) (Not null)
- `startDate`: DATE
- `courseTypes`: ENUM (UXUI, WD, DA, AD)
- `batch`: BOOLEAN
- `user_Id`: INTEGER (References User)

### MSAT

- `msatId`: Primary key
- `attempt`: INTEGER
- `user_Id`: INTEGER (References User)

### MSAT Subsection

- `sub_sectionId`: Primary key
- `sub_section_name`: VARCHAR(20) (Not null)
- `msat_id`: VARCHAR (References MSAT)
- `score`: INTEGER

### Question

- `question_id`: Primary key
- `question_text`: VARCHAR(255) (Not null)
- `sub_sectionId`: VARCHAR (References MSAT Subsection)

### Options

- `option_id`: Primary key
- `option_text`: VARCHAR(255) (Not null)
- `question_id`: VARCHAR (References Question)
- `is_correct`: BOOLEAN (Not null)

### Activities

- `activitiesId`: Primary key
- `type`: BOOLEAN (webinar/master class)
- `photoUrl`: VARCHAR
- `instructor_name`: VARCHAR
- `startDate`: DATETIME
- `endDate`: DATETIME
- `register`: BOOLEAN
- `vedioUrl`: VARCHAR
- `zoomlink`: VARCHAR
- `user_Id`: INTEGER (References User)

## API Endpoints

## API Endpoints

List the available API endpoints and their descriptions here.

# Backend API Documentation

Welcome to the backend API documentation for our project. This documentation provides information on available endpoints and how to use them for frontend development.

## Table of Contents

1. [User Routes](#activities-routes)
2. [Activities Routes](#course-routes)
3. [Courses Routes](#msat-routes)
4. [Msat Routes](#user-routes)

---

## User Routes

### Register User

- **URL:** `https://dash-board.up.railway.app/register`
- **Method:** `POST`
- **Description:** Register a new user.
- **Request Body:**
  - Include user registration details.

### Login User

- **URL:** `https://dash-board.up.railway.app/log-in`
- **Method:** `POST`
- **Description:** Log in an existing user.
- **Request Body:**
  - Include user login credentials.

### Logout User

- **URL:** `https://dash-board.up.railway.app/logout`
- **Method:** `GET`
- **Description:** Log out the authenticated user.
- **Authentication:** Requires user authentication.

<!-- ### Login by Mobile Number

- **URL:** `https://dash-board.up.railway.app/login-by-number`
- **Method:** `GET`
- **Description:** Log in using a mobile number.

### Verify OTP

- **URL:** `https://dash-board.up.railway.app/verify`
- **Method:** `POST`
- **Description:** Verify the OTP (One-Time Password). -->

### Update User Profile

- **URL:** `https://dash-board.up.railway.app//update-profile`
- **Method:** `PATCH`
- **Description:** Update the user's profile.
- **Authentication:** Requires user authentication.

### Get User Details

- **URL:** `https://dash-board.up.railway.app/user-details`
- **Method:** `GET`
- **Description:** Retrieve user details.
- **Authentication:** Requires user authentication.

## Activities Routes

### Create an Activity

- **URL:** `https://dash-board.up.railway.app/activities`
- **Method:** `POST`
- **Description:** Create a new activity.
- **Authentication:** Requires user authentication.
- **Request Body:**
  - Include details for the new activity.

### Get All Activities

- **URL:** `https://dash-board.up.railway.app/activities`
- **Method:** `GET`
- **Description:** Retrieve a list of all activities.

### Get Activity by ID

- **URL:** `https://dash-board.up.railway.app/activities/:activityId`
- **Method:** `GET`
- **Description:** Retrieve an activity by its ID.

### Get Activities by Type

- **URL:** `https://dash-board.up.railway.app/type`
- **Method:** `GET`
- **Description:** Retrieve activities by type. <br>
activities?type=1 then it will give result according to masterclass
elseif activities?type=0  according to webinar
else activities  according to that we get all activities

### Delete Activity

- **URL:** `https://dash-board.up.railway.app/activities/:activityId`
- **Method:** `DELETE`
- **Description:** Delete an activity by its ID.
- **Authentication:** Requires user authentication.

---

## Course Routes

### Create a Course

- **URL:** `https://dash-board.up.railway.app/courses`
- **Method:** `POST`
- **Description:** Create a new course.
- **Request Body:**
  - Include details for the new course.

---

### Get a courses

- **URL:** `https://dash-board.up.railway.app/courses`
- **Method:** `GET`
- **Description:** Get all courses. <br>

## MSAT Routes

### Create MSAT Models

- **URL:** `https://dash-board.up.railway.app/msat`
- **Method:** `POST`
- **Description:** Create MSAT models.

### Get All MSAT

- **URL:** `https://dash-board.up.railway.app/msat`
- **Method:** `GET`
- **Description:** Retrieve a list of all MSAT records.

### Calculate MSAT Score

- **URL:** `https://dash-board.up.railway.app/msat/score`
- **Method:** `PATCH`
- **Description:** Calculate MSAT scores.

### Get User's MSAT Score

- **URL:** `https://dash-board.up.railway.app/msat/user-score`
- **Method:** `GET`
- **Description:** Retrieve a user's MSAT score.
- **Authentication:** Requires user authentication.

---

Feel free to refer to this documentation while working on the frontend to understand the available endpoints and their usage.