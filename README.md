# Firebase Firestore Rules

For the application to function correctly, you need to update your Firebase Firestore rules. These rules control access to your database collections.

## Builds Collection

To allow users to submit builds, you need to allow write access to the `builds` collection.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /builds/{buildId} {
      allow write: if true;
    }
  }
}
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env.local file:

`NEXT_PUBLIC_ADMIN_PASSWORD`

This password is used to access the admin panel.

## Settings and Admin Collections

For the new admin functionality and dynamic pricing, you'll need to create `settings` and `admin` collections. The `settings` collection should be readable by anyone, but only writable by authenticated admin users. The `admin` collection should only be accessible by authenticated admin users.

To implement this, you would typically use Firebase Authentication to identify admin users. Since we're starting with a simple password, we'll restrict write access for now and you can manually edit the data in the Firebase console.

Here are the recommended rules for the `settings` collection:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /settings/{settingId} {
      allow read: if true;
      allow write: if false; // Change this to allow only admin access later
    }
  }
}
```
