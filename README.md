A Management System for Math & Science Center of AUIS

There are two Roles within this system:

- Admin
  Admins can view, add, and delete tutors,
  can add, and delete shifts,
  read and export all data such ass Attendance, Tutors, and Absents

- Tutor
  Tutors only can check in and checkout
  Tutor has to be assigned by admins to be able sign in

Authentication:
authentication within this system is all handled by Google Auth

Conditions:
in the environment vars if this variable is set to true, then the tutors can sign in in the system,
otherwise they cannot access the system.
IS_TUTOR_ALLOWED="false"

A random generated string have been set to the session
NUXT_SESSION_PASSWORD=

MongoDB Connection is required as well
MONGO_URL="mongodb://localhost:27017/mathcenter"
