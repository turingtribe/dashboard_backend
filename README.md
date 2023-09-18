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

### /api/users

- `GET`: Retrieve a list of users.
- `POST`: Create a new user.

### /api/users/:userId

- `GET`: Retrieve details of a specific user.
- `PUT`: Update user details.
- `DELETE`: Delete a user.

### /api/courses

- `GET`: Retrieve a list of courses.
- `POST`: Create a new course.

### /api/courses/:courseId

- `GET`: Retrieve details of a specific course.
- `PUT`: Update course details.
- `DELETE`: Delete a course.

### /api/msats

- `GET`: Retrieve a list of MSAT records.
- `POST`: Create a new MSAT record.

### /api/msats/:msatId

- `GET`: Retrieve details of a specific MSAT record.
- `PUT`: Update MSAT record details.
- `DELETE`: Delete an MSAT record.

### /api/msat-subsections

- `GET`: Retrieve a list of MSAT subsections.
- `POST`: Create a new MSAT subsection.

### /api/msat-subsections/:sub_sectionId

- `GET`: Retrieve details of a specific MSAT subsection.
- `PUT`: Update MSAT subsection details.
- `DELETE`: Delete an MSAT subsection.

### /api/questions

- `GET`: Retrieve a list of questions.
- `POST`: Create a new question.

### /api/questions/:questionId

- `GET`: Retrieve details of a specific question.
- `PUT`: Update question details.
- `DELETE`: Delete a question.

### /api/options

- `GET`: Retrieve a list of options.
- `POST`: Create a new option.

### /api/options/:optionId

- `GET`: Retrieve details of a specific option.
- `PUT`: Update option details.
- `DELETE`: Delete an option.

### /api/activities

- `GET`: Retrieve a list of activities.
- `POST`: Create a new activity.

### /api/activities/:activitiesId

- `GET`: Retrieve details of a specific activity.
- `PUT`: Update activity details.
- `DELETE`: Delete an activity.

### ...

List other API endpoints if applicable.

## Usage

Provide instructions on how to run and use the project. Include any environment setup, dependencies, and startup commands.

## Contributing

Explain how others can contribute to the project if applicable.


## Details UnderStanding

# API Endpoints

This document provides details about the available API endpoints and their descriptions for your project.

## User Routes

### Register a New User

- *URL:* `/api/user/register`
- *Method:* `POST`
- *Description:* Register a new user.
- *Request Body:*
  - `userName` (string, required): User's username.
  - `email` (string, required): User's email address.
  - `phoneNumber` (string, required): User's phone number.
  - `password` (string, required): User's password.

### User Login by email_OTP

- *URL:* `/api/user/login`
- *Method:* `POST`
- *Description:* Log in a user.
- *Request Body:*
  - `email` (string, required): User's email address.
  - `OTP` (string, required): User's password.<br>
  <br>After getting OTP pass otp as a query to same endpoints =>
  /api/user/login?otp="otp that user entered" <br>
  

### Login by Mobile Number

- *URL:* `/api/user/login-by-number`
- *Method:* `GET`
- *Description:* Log in using a mobile number.
- *Query Parameters:*
  - `mobile` (string, required): User's mobile number.
  
### Verify OTP

- *URL:* `/api/user/verify`
- *Method:* `POST`
- *Description:* Verify OTP for login.
- *Request Body:*
  - `mobile` (string, required): User's mobile number.
  - `otp` (string, required): OTP for verification.

  
### Logout User
- *URL:* `/api/user/logout`
- *Method:* `GET`
- *Description:* Log out the authenticated user.
- *Authentication:* Requires user authentication.


### Get User Details

- *URL:* `/api/user/details`
- *Method:* `GET`
- *Description:* Get details of the authenticated user.
- *Authentication:* Requires user authentication.

### Add details of User
- *URL:* `/api/user/addDetails`
- *Method:* `Post`
- *Description:* Adds details about user like name and profile picture,
profileImage,dob,graduation,work,adharcard,userName,email,phoneNumber
  post the authenticated user.
- *Request body* :

### Update User Profile

- *URL:* `/api/user/profile`
- *Method:* `PATCH`
- *Description:* Update the authenticated user's profile.
- *Authentication:* Requires user authentication.
- *Request Body:*
  - Include fields that can be updated (e.g., `userName`, `email`, `phoneNumber`, etc.).

## Course Routes

### Create a New Course

- *URL:* `/api/course`
- *Method:* `POST`
- *Description:* Create a new course.
- *Request Body:*
  - `title` (string, required): Course title.
  - `startDate` (date): Course start date.
  - `courseTypes` (enum: UXUI, WD, DA, AD): Course types.
  - `batch` (boolean): Batch information.
- *Authentication:* Requires user authentication.

## MSAT Routes

### Create an MSAT Record

- *URL:* `/api/msat`
- *Method:* `POST`
- *Description:* Create a new MSAT record.
- *Request Body:*
  - Include required fields for creating an MSAT record.
- *Authentication:* Requires user authentication.

### Get All MSAT Records

- *URL:* `/api/msat`
- *Method:* `GET`
- *Description:* Retrieve a list of all MSAT records.

### Calculate MSAT Score

- *URL:* `/api/msat/score`
- *Method:* `PATCH`
- *Description:* Calculate the MSAT score.
- *Authentication:* Requires user authentication.

### Get User's MSAT Score

- *URL:* `/api/msat/user-score`
- *Method:* `GET`
- *Description:* Get the MSAT score of the authenticated user.
- *Authentication:* Requires user authentication.

# Tech Stack
<ul>
  <li>Nodejs</li>
  <li>express</li>
  <li>sequelize</li>
  <li>MySQL</li>
  <li>nodemailer</li>
  <li>jwt</li>
  </ul>

# Contributors:-
 
 - [@Omkar tripathi](https://github.com/triggeredcode)
 - [@Bivek Rai](https://github.com/HazeCom)
 - [@Anmol Jagota](https://github.com/Anmoljagota)
 - [@Vishal Girhepunje](https://github.com/vishal-girhepunje)
 
