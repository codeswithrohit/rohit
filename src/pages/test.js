import React from 'react';
import 'tailwindcss/tailwind.css';

const Test = () => {
  return (
    <div className="p-4 bg-gray-800 text-white font-mono leading-relaxed">
      To transfer a Firebase project (including its database) from one Google account (email) to another, follow these steps:
      <br /><br />
      1. Add the New Email as a Project Owner
      <br />
      Sign in to the Firebase Console with the original email.
      <br />
      Select the Firebase project you want to transfer.
      <br />
      Go to the Settings gear icon (⚙️) in the left-hand menu and select Users and permissions.
      <br />
      Click on Add Member.
      <br />
      Enter the new email address (the one you want to transfer the project to).
      <br />
      Set the role to Owner.
      <br />
      Click Add.
      <br /><br />
      2. Accept the Invitation
      <br />
      Sign in to the Google account associated with the new email.
      <br />
      Go to your email inbox and find the invitation email from Firebase.
      <br />
      Accept the invitation to join the Firebase project.
      <br /><br />
      3. Transfer Ownership (Optional)
      <br />
      If you want the new email to be the sole owner:
      <br />
      After adding the new email as an Owner, you can remove the original email if you no longer want it to have access.
      <br />
      In the Users and permissions section, click on the three dots next to the original email and select Remove.
      <br /><br />
      4. Verify Database and Project Access
      <br />
      Log in to the Firebase Console using the new email to verify you have full access to the project and database.
      <br />
      Ensure all functionalities work as expected.
      <br /><br />
      5. Update Any Associated Services
      <br />
      If you use other Google Cloud services (like Cloud Firestore, Cloud Functions, etc.), ensure they are correctly associated with the new owner.
      <br />
      Update any billing information if needed.
      <br /><br />
      6. Update Codebases and Integrations
      <br />
      If your Firebase project is integrated with apps or services, check that all necessary credentials, API keys, and other settings are correctly updated with the new email where applicable.
      <br /><br />
      7. Revoke Access (If Necessary)
      <br />
      If the original owner no longer needs access to the Firebase project, revoke the account's access as mentioned earlier.
    </div>
  )
}

export default Test;
