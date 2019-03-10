# TaskTracker

## Introduction

This is the second iteration of task_tracker with manager and timeblocks
implemented. The release is v2.0 and the endpoint is hosted @ 
http://tasks2.cs4550abinader.com. This app is fully functional.

## Design Decisions

I designed the webapp so that you can register as an admin or user, the 
login/out flow is the same as it is in the husky_shop example. Admin users
are managers who can manage other users or create tasks and assign them to
their direct reports. 

Managers can also view the status of their direct report's tasks on the 
homepage, or can go into more detail by clicking on the specific task. 
When viewing a task, a manager is able to view the timeblocks associated with 
the task and edit or delete the timeblocks if they are wrong. 

A user can view their tasks on a separate page and mark them completed by clicking
the 'Finish' button and checking the box off on the resulting form and submitting.
Users can view more detail on a specific task by clicking on the title. On this 
individual task page, users can create timeblocks which is a way to keep track of 
time spent working on the task, provided start and end times. users can add more 
timeblocks to any task that is unfinished. There is also a start/stop working button 
that generates timeblocks without any additional input from the user, simply click 
the button to generate the start time, and click it again to generate the endtime.

Tasks that are already marked as completed cannot have timeblocks added, edited,
or deleted. The individual task details page shows the total time spent finishing
a task in minutes.

## Error Checking and Input Sanitation

There is a unique constraint when creating a user, duplicate email addresses
are not allowed in the database and generate an error.

The select form is used when assigning a task to make sure the user picks a
valid user to assign to.

When creating a timeblock, the start and end must have a difference of at least
zero or the timeblock will not be accepted. The same goes for a manager editing 
a timeblock (manager cannot edit timeblocks to be invalid). Forms require the 
user to input valid timestamp values for start and end; the frontend takes care 
of this logic.

I also added logic so that if a user tries to create a timeblock while working,
that user is prompted with an error and the timeblock is not generated.

### User 
A User is, a name and an email address, and a role.

### Task
A Task is, a title, description, done, and a user_id associated
with a user.

### Timeblock
A timeblock has a start time, end time, delta between the two, and a task_id
associated with a task. The timestamp format is YYYY-MM-DD HH:mm.

## Recommended flow

You can start by creating a user that is a manager. Then create a user for the
manager to manage. Log in as the manager and click manage users, select the user
that you created to manage. Next, create a test task for the user to be assigned.
After creation of the task, assign it to your report. Now you can view the status
of the task assigned to any of your reports on the homepage. Log out and log in
as the user that is being managed and has the assigned task. Click on view my tasks.
You can mark any unfinished task as completed on this form. You can also view the
details of any task assigned to you by clicking on the task title; do this now. 
Now you can create timeblocks to associate with this task two ways, either manually 
enter the start/end times and hit submit timeblock, or use the start/stop working 
button. If there is some timeblock that is incorrect and needs to be edited or 
deleted, the manager account can do this by logging in, and clicking on the task 
on the direct reports section on the bottom half of the homepage. Once you are 
satisfied with the timeblocks and want to mark the task completed. Simply navigate
to the view my tasks page and click on the finish button next to any unfinished task.
