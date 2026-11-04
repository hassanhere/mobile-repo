# React Native Deep Linking with Firebase Hosting

This guide explains how to implement HTTPS deep linking in a React Native application using Android App Links, iOS Universal Links, Firebase Hosting, and React Navigation.

This setup is intended for applications that **do not already have a public website or domain**.

Firebase Hosting provides a public `web.app` domain automatically, so no custom domain or separate DNS configuration is required.

---

## Overview

After creating a Firebase Hosting site, Firebase provides a domain similar to:

```text
https://your-project-id.web.app
```

Deep links can then use that domain:

```text
https://your-project-id.web.app/share/12345
```

When the application is installed, Android or iOS can open the application directly.

When the application is not installed, the same URL can open a Firebase Hosting fallback page containing links to the application stores.

### High-level flow

```text
                    HTTPS URL
                       │
                       ▼
          https://your-project-id.web.app
                       │
              ┌────────┴────────┐
              │                 │
        App Installed      App Not Installed
              │                 │
       ┌──────┴──────┐          ▼
       │             │      Firebase Hosting
    Android         iOS      Fallback Page
       │             │          │
   App Links    Universal       ├── Play Store
                   Links        └── App Store
       │             │
       └──────┬──────┘
              ▼
       React Native App
              │
              ▼
        Target Screen
```

---

# 1. Firebase Project

Create or use a Firebase project for the application.

The same Firebase project can also be used for other Firebase services such as Firebase Cloud Messaging, Analytics, Authentication, and other services.

Firebase Hosting is independent of the React Native source code.

---

# 2. Firebase Hosting

Firebase Hosting provides a public HTTPS domain automatically:

```text
https://your-project-id.web.app
```

No custom domain is required.

No DNS server needs to be configured.

No domain registrar needs to be configured.

This makes Firebase Hosting a convenient option for a React Native boilerplate where a public domain is not available.

---

# 3. Firebase CLI

Install the Firebase CLI if it is not already installed:

```bash
npm install -g firebase-tools
```

Log in:

```bash
firebase login
```

The login process uses the Google account associated with the Firebase project.

---

# 4. Hosting Directory

Keep Firebase Hosting in a separate directory inside the React Native project.

Example:

```text
project/
├── android/
├── ios/
├── src/
├── package.json
├── yarn.lock
│
└── firebase-hosting/
    ├── firebase.json
    ├── .firebaserc
    └── public/
        ├── index.html
        └── .well-known/
            ├── assetlinks.json
            └── apple-app-site-association
```

Firebase Hosting only uses the files inside:

```text
firebase-hosting/public/
```

This does not interfere with the React Native Android, iOS, or JavaScript source code.

---

# 5. Initialize Firebase Hosting

Move into the hosting directory:

```bash
cd firebase-hosting
```

Initialize Firebase Hosting:

```bash
firebase init hosting
```

Select the Firebase project associated with the application.

When asked for the public directory, use:

```text
public
```

The resulting configuration will use:

```text
firebase-hosting/public/
```

as the Hosting root.

---

# 6. Deploy Firebase Hosting

From the `firebase-hosting` directory:

```bash
firebase deploy --only hosting
```

After deployment, Firebase provides a public URL similar to:

```text
https://your-project-id.web.app
```

This is the URL used for deep linking.

---

# 7. Define the Deep-Link URL Structure

Choose a URL structure for the application.

For example:

```text
https://your-project-id.web.app/share/12345
```

Dynamic routes can represent different resources:

```text
/share/:postId
/profile/:userId
/product/:productId
```

The same URL structure should be used consistently in Android, iOS, React Navigation, share URL generation, and Firebase Hosting.

---

# 8. Android App Links

Android uses `assetlinks.json` to verify that the Firebase Hosting domain is associated with the application.

Create:

```text
firebase-hosting/public/.well-known/assetlinks.json
```

Example:

```json
[
  {
    "relation": [
      "delegate_permission/common.handle_all_urls"
    ],
    "target": {
      "namespace": "android_app",
      "package_name": "com.example.app",
      "sha256_cert_fingerprints": [
        "YOUR_SHA256_CERTIFICATE_FINGERPRINT"
      ]
    }
  }
]
```

Replace the package name and SHA-256 fingerprint with the application's actual values.

### Google Play App Signing

If the application uses Google Play App Signing, use the SHA-256 fingerprint of the **Google Play App Signing certificate**.

The upload-key fingerprint and Play App Signing fingerprint can be different.

Multiple fingerprints can be configured if necessary:

```json
[
  {
    "relation": [
      "delegate_permission/common.handle_all_urls"
    ],
    "target": {
      "namespace": "android_app",
      "package_name": "com.example.app",
      "sha256_cert_fingerprints": [
        "FINGERPRINT_1",
        "FINGERPRINT_2"
      ]
    }
  }
]
```

---

# 9. AndroidManifest.xml

Add an HTTPS intent filter to the appropriate React Native activity.

Example:

```xml
<intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />

    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />

    <data
        android:scheme="https"
        android:host="your-project-id.web.app"
        android:pathPrefix="/share" />
</intent-filter>
```

Replace the host with the Firebase Hosting domain of the project.

---

# 10. iOS Universal Links

iOS uses an Apple App Site Association file to verify that the Firebase Hosting domain can open the application.

Create:

```text
firebase-hosting/public/.well-known/apple-app-site-association
```

The filename must be exactly:

```text
apple-app-site-association
```

There should be no `.json` extension.

Example:

```json
{
  "applinks": {
    "details": [
      {
        "appID": "TEAM_ID.com.example.app",
        "paths": [
          "/share/*"
        ]
      }
    ]
  }
}
```

Replace the Team ID/App ID prefix and Bundle ID with the application's actual values.

---

# 11. iOS Associated Domains

In Xcode:

```text
Target
→ Signing & Capabilities
→ Associated Domains
```

Add:

```text
applinks:your-project-id.web.app
```

The domain must match the domain used in the AASA file and shared URLs.

---

# 12. React Navigation

React Navigation can map incoming URLs to screens.

Example:

```tsx
const linking = {
  prefixes: ['https://your-project-id.web.app'],
  config: {
    screens: {
      Post: 'share/:postId',
    },
  },
};
```

Then:

```tsx
<NavigationContainer linking={linking}>
  {/* Navigation */}
</NavigationContainer>
```

A URL such as:

```text
https://your-project-id.web.app/share/12345
```

maps to the `Post` screen with:

```text
postId = 12345
```

---

# 13. Multiple Deep-Link Routes

Multiple routes can be configured:

```tsx
const linking = {
  prefixes: ['https://your-project-id.web.app'],
  config: {
    screens: {
      Home: 'home',
      Post: 'share/:postId',
      Profile: 'profile/:userId',
      Product: 'product/:productId',
    },
  },
};
```

---

# 14. Cold Start and Warm Start

Deep links can reach the application in two situations.

### Cold Start

The application is completely closed.

For manual deep-link handling:

```tsx
const url = await Linking.getInitialURL();
```

### Warm Start

The application is already running or in the background:

```tsx
const subscription = Linking.addEventListener('url', ({ url }) => {
  // Handle URL
});
```

If React Navigation handles linking, avoid duplicating navigation logic unless manual processing is required.

---

# 15. Generate Share URLs

The Firebase Hosting domain is simply a normal HTTPS URL.

No Firebase API call is required to create a deep link.

Example:

```ts
const getPostShareUrl = (postId: string) =>
  `https://your-project-id.web.app/share/${postId}`;
```

Result:

```text
https://your-project-id.web.app/share/12345
```

The dynamic portion is simply part of the URL:

```text
/share/:postId
```

---

# 16. Firebase Hosting Fallback Page

When the application is not installed, Firebase Hosting can display a web page.

Create:

```text
firebase-hosting/public/index.html
```

The page can contain:

- Application branding
- Application description
- Google Play button
- App Store button
- Other relevant information

For example:

```text
Open this content in the app

[ Download for Android ]

[ Download for iOS ]
```

---

# 17. Handle Dynamic Fallback URLs

If the URL is:

```text
https://your-project-id.web.app/share/12345
```

Firebase Hosting can serve the fallback page for the `/share/**` route.

Example:

```json
{
  "hosting": {
    "public": "public",
    "rewrites": [
      {
        "source": "/share/**",
        "destination": "/index.html"
      }
    ]
  }
}
```

The browser keeps the original URL while Firebase serves `index.html`.

The fallback page can read the path:

```js
const path = window.location.pathname;
```

For:

```text
/share/12345
```

the value is:

```text
/share/12345
```

---

# 18. Store Links

The fallback page should contain the application's store links.

Android:

```text
https://play.google.com/store/apps/details?id=YOUR_PACKAGE_NAME
```

iOS:

```text
https://apps.apple.com/app/YOUR_APP_ID
```

Replace the placeholders with the actual application values.

---

# 19. Recommended firebase.json

A basic configuration can look like:

```json
{
  "hosting": {
    "public": "public",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "/share/**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "/.well-known/assetlinks.json",
        "headers": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ]
      },
      {
        "source": "/.well-known/apple-app-site-association",
        "headers": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ]
      }
    ]
  }
}
```

Add additional rewrites if the application uses other deep-link paths.

---

# 20. Verify Firebase Hosting

After deployment, open:

```text
https://your-project-id.web.app
```

Test Android:

```text
https://your-project-id.web.app/.well-known/assetlinks.json
```

Test iOS:

```text
https://your-project-id.web.app/.well-known/apple-app-site-association
```

Both association files must be publicly accessible.

---

# 21. Android Testing

Check Android's App Link configuration:

```bash
adb shell pm get-app-links com.example.app
```

Request verification again:

```bash
adb shell pm verify-app-links --re-verify com.example.app
```

Test a deep link:

```bash
adb shell am start   -a android.intent.action.VIEW   -d "https://your-project-id.web.app/share/12345"
```

If Android has cached an earlier verification state, uninstalling and reinstalling the application can help during testing.

---

# 22. iOS Testing

Install the application on a physical iOS device and open:

```text
https://your-project-id.web.app/share/12345
```

Verify that:

- The application opens.
- The correct screen is displayed.
- Dynamic parameters are received correctly.
- The URL opens the fallback web page when the application is not installed.

---

# 23. Common Android Problems

If the application does not open, check:

- `android:autoVerify="true"` is configured.
- The package name is correct.
- The SHA-256 fingerprint is correct.
- The production signing certificate is being used.
- The Firebase Hosting domain is correct.
- `assetlinks.json` is publicly accessible.
- The URL uses HTTPS.
- The URL path matches the intent filter.
- The application was reinstalled after configuration changes.

If debug works but production does not, check the signing certificate first.

---

# 24. Common iOS Problems

If the application opens Safari instead, check:

- Associated Domains capability is enabled.
- The Firebase Hosting domain is correct.
- `applinks:your-project-id.web.app` is configured.
- The AASA file is accessible.
- The App ID is correct.
- The Bundle ID is correct.
- The URL path matches the AASA `paths`.
- The application was installed after adding the Associated Domains configuration.

---

# 25. Local Firebase Hosting Development

Test Firebase Hosting locally before deploying.

From the hosting directory:

```bash
cd firebase-hosting
```

Start the Hosting emulator:

```bash
firebase emulators:start --only hosting
```

Firebase will provide a local URL, usually similar to:

```text
http://127.0.0.1:5000
```

This is useful for testing:

- `index.html`
- CSS
- JavaScript
- Hosting rewrites
- Static assets

However, Android App Links and iOS Universal Links require a publicly accessible HTTPS domain for actual operating-system verification.

The local emulator is therefore useful for testing the web page and hosting configuration, but not for replacing production App Link/Universal Link verification.

---

# 26. Production Checklist

## Firebase

- [ ] Firebase project created.
- [ ] Firebase Hosting initialized.
- [ ] `public` directory configured.
- [ ] Firebase Hosting deployed.
- [ ] Firebase `web.app` URL is accessible.

## Android

- [ ] Package name configured.
- [ ] SHA-256 signing certificate configured.
- [ ] `assetlinks.json` created.
- [ ] `assetlinks.json` deployed.
- [ ] `android:autoVerify="true"` configured.
- [ ] Firebase Hosting domain configured in Android.
- [ ] App Link tested.

## iOS

- [ ] Bundle ID configured.
- [ ] App ID prefix/Team ID configured.
- [ ] AASA file created.
- [ ] AASA file deployed.
- [ ] Associated Domains capability enabled.
- [ ] Firebase Hosting domain added.
- [ ] Universal Link tested.

## React Native

- [ ] React Navigation `linking` configuration added.
- [ ] URL prefixes configured.
- [ ] Dynamic URL parameters configured.
- [ ] Cold-start handling verified.
- [ ] Warm-start handling verified when manual handling is used.

## Fallback

- [ ] `index.html` created.
- [ ] Firebase Hosting rewrite configured.
- [ ] Android store link added.
- [ ] iOS store link added.
- [ ] Fallback URL tested without the application installed.

---

# Final Architecture

For a project without an existing public domain:

```text
React Native Project
        │
        ├── android/
        ├── ios/
        ├── src/
        │
        └── firebase-hosting/
              │
              └── public/
                    │
                    ├── index.html
                    │
                    └── .well-known/
                          ├── assetlinks.json
                          └── apple-app-site-association
                                  │
                                  ▼
                       Firebase Hosting
                                  │
                                  ▼
                 https://project-id.web.app
                                  │
                   ┌──────────────┴──────────────┐
                   │                             │
              App Installed                App Not Installed
                   │                             │
          ┌────────┴────────┐                    ▼
          │                 │             Firebase Web Page
       Android             iOS                   │
      App Links       Universal Links      Store Download
          │                 │
          └────────┬────────┘
                   ▼
             React Native
                   │
                   ▼
            Target Screen
```

## Key Points

1. A custom domain is not required.
2. Firebase Hosting automatically provides a public `*.web.app` domain.
3. No separate DNS server is required.
4. Firebase Hosting serves `assetlinks.json` for Android.
5. Firebase Hosting serves `apple-app-site-association` for iOS.
6. Android App Links and iOS Universal Links connect the HTTPS domain to the native application.
7. React Navigation maps URL paths to application screens.
8. The same HTTPS URL can show a Firebase Hosting fallback page when the application is not installed.
9. Firebase Dynamic Links are not required.
10. The deep-link URL is simply a normal HTTPS URL with dynamic path parameters.
