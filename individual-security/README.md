# README for Individual Security Workshop

There are some problems with this application. You can probably spot some of them yourself, but these are things that should be addressed:

Easier:

* Outdated dependencies with security problems
* No input validation at all
* Use Nodemon to reload your project as you code.
* Move the API Key to a `.env` file
* Fix the SQL Injection issue with the Search Bears route


More Advanced:
* No rate limiting on the API
* CSRF Token Protection (need to add an HTML Form to make this work properly)
* Adding CORS, if this GET API gets called from another server (for instance, a React application running on port 8000)
* Add some kind of authentication or authorization
