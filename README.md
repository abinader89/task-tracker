# TaskTracker

## Design Decisions

So I designed the webapp so that you can register, login/out as in husky_shop.
Also, When you are logged in, on the homepage, a 'Create Tasks' and 
'Edit Tasks' are shown. Users can also always navigate home by clicking on the 
header.

## Operations

A user can register a new user into the database. A logged in user can create 
a task, then if the user navigates to edit task, all tasks that are unassigned 
are shown, followed by the current user's unfinished tasks, followed by 
current users completed tasks. Use this page to assign tasks, mark tasks 
completed, and view previously completed tasks.

## Error Checking and Input Sanitation

There is a unique constraint when creating a user, duplicate email addresses
are not allowed in the database and generate an error.

The select form is used when assigning a task to make sure the user picks a
valid user to assign to.

The timespent form is has a form-control class to make sure the user input is
in increments of 15 minutes.

### User 
A User is, a name and an email address.

### Task
A Task is, a title, description, done, time_spent, and a user_id associated
with a user.


