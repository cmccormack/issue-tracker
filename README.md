# issue-tracker
Full Stack Web App for ticket tracking

- [X] Prevent cross site scripting(XSS attack).
- [X] I can **POST** `/api/issues/{projectname}` with form data containing required *issue_title*, *issue_text*, *created_by*, and optional *assigned_to* and *status_text*.
- [X] The object saved (and returned) will include all of those fields (blank for optional no input) and also include *created_on(date/time)*, *updated_on(date/time)*, *open(boolean, true for open, false for closed)*, and *_id*.
- [X] I can **PUT** `/api/issues/{projectname}` with a *_id* and any fields in the object with a value to object said object. Returned will be 'successfully updated' or 'could not update '+_id. This should always update *updated_on*. If no fields are sent return 'no updated field sent'.
- [X] I can **DELETE** `/api/issues/{projectname}` with a *_id* to completely delete an issue. If no _id is sent return '_id error', success: 'deleted '+_id, failed: 'could not delete '+_id.
- [X] I can **GET** `/api/issues/{projectname}` for an array of all issues on that specific project with all the information for each issue as was returned when posted.
- [X] I can filter my get request by also passing along any field and value in the query(ie. `/api/issues/{project}?open=false`). I can pass along as many fields/values as I want.
- [X] All 11 functional tests are complete and passing.

Example usage:
------
```
/api/issues/{project}
/api/issues/{project}?open=true&assigned_to=Joe
```

Example return:
-----
```
[{"_id":"5871dda29faedc3491ff93bb","issue_title":"Fix error in posting data","issue_text":"When we post data it has an error.","created_on":"2017-01-08T06:35:14.240Z","updated_on":"2017-01-08T06:35:14.240Z","created_by":"Joe","assigned_to":"Joe","open":true,"status_text":"In QA"},...]
```

Completed Project:
-----
* https://fcc-issue-tracker-cmccormack.glitch.me/

