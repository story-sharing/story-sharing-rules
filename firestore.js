service cloud.firestore {
  match /databases/{database}/documents {
  
    match /users/{userId} {
      allow read, update, delete: if request.auth.uid == userId;
      allow create: if request.auth.uid != null;
    }
    match /groups/{document=**} {
      allow update, delete: if request.auth.uid in resource.data.owners
      allow read: if request.auth.uid in resource.data.members
      allow create: if request.auth.uid != null;
    }
    match /stories/{document=**} {
      allow update, delete: if request.auth.uid in resource.data.owners
      allow read: if resource.data.groups in get(/databases/$(database)/documents/users/$(request.auth.uid)/groups)
      allow create: if request.auth.uid != null;
    }
  }

}
