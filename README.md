# Issue Tracker

A fully featured issue tracker similar to like GitHub issues which keeps track of any issues for a particular project.

### User Stories:-
- The user can send a POST request to /api/issues/{projectname} with form data containing the required fields issue_title, issue_text, created_by, and optionally assigned_to and status_text and this request will return the created object, with all of the submitted fields. Excluded optional fields will be returned as empty strings. Additionally I have included created_on (date/time), updated_on (date/time), open (boolean, true for open - default value, false for closed), and _id.
- If sent a POST request to /api/issues/{projectname} without the required fields, return will be the error { error: 'required field(s) missing' }
- If user sends a GET request to /api/issues/{projectname} response is an array of all issues for that specific projectname, with all the fields present for each issue.
- User can send a GET request to /api/issues/{projectname} and filter the request by also passing along any field and value as a URL query (ie. /api/issues/{project}?open=false). User can pass one or more field/value pairs at once.
- User can send a PUT request to /api/issues/{projectname} with an _id and one or more fields to update. On success, the updated_on field will be updated, and return is { result: 'successfully updated', '_id': _id }.
- When the PUT request is sent to /api/issues/{projectname} does not include an id, the return value is { error: 'missing id' }.
- When the PUT request is sent to /api/issues/{projectname} does not include update fields, the return value is { error: 'no update field(s) sent', 'id': _id }.
- User can send a DELETE request to /api/issues/{projectname} with an _id to delete an issue. If no _id is sent, the return value is { error: 'missing id' }. On success, the return value in JSON response is { result: 'successfully deleted', 'id': _id }.

### Steps to run this repo:-
1.Clone this repository from GitHub.

2.Upon heading to your favourite Code Editor run this command into the terminal ```npm install``` to install all the required dependencies.

3.When all the required dependencies are installed, run ```npm run start``` in the terminal to start the development server, the API will start running in the port 3000, to view it go to the following URL "http://localhost:3000".

4.Create a .env file and add a variable named URI and add your Mongodb connection url, as by doing this the short URLs will be directly saved into your database. Now you can start making requests to the API endpoints.

