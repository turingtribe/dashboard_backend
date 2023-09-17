## Welcome to Dashboard_Backend

## Activities Routes

The following routes are available for managing activities:

### POST /activities

Creates a new activity.

**Request body:**

* `type`: The type of activity.
* `instructor_name`: The name of the instructore taking the activites.
* `photoUrl`: The URL of the activity photo.
* `startDate`: The start date of the activity.
* `endDate`: The end date of the activity.
* `register`: Whether or not the activity requires registration.
* `vedioUrl`: The URL of the activity video.
* `zoomlink`: The Zoom link for the activity.

**Response:**

The newly created activity.

### GET /activities/1

Retrieves a spectific activity.

**Response:**

A single activity

### GET /activities/

Retrieves all the activities.

**Request parameter:**

* `activityId`: The ID of the activity to retrieve.

**Response:**

The activity with the specified ID.

### DELETE /activities/:activityId

Deletes a specific activity.

**Request parameter:**

* `activityId`: The ID of the activity to delete.

**Response:**

An empty response.

### Example usage

To create a new activity, send a POST request to the `/activities` endpoint with the following body:

```json
{
  "type": true,
  "photoUrl": "https://example.com/activity.jpg",
  "instructor_name":"abc";
  "startDate": "2023-09-18T10:00:00.000Z",
  "endDate": "2023-09-18T11:00:00.000Z",
  "register": false,
  "vedioUrl": "https://example.com/activity.mp4",
  "zoomlink": "https://example.com/zoom"
}


To retrieve all activities, send a GET request to the `/activities` endpoint.

To retrieve a specific activity, send a GET request to the `/activities/:activityId` endpoint, where `activityId` is the ID of the activity to retrieve.

To delete a specific activity, send a DELETE request to the `/activities/:activityId` endpoint, where `activityId` is the ID of the activity to delete.
