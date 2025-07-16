# Deployment Guide for Shared Hosting

This guide will help you deploy your AI Global Tech website to any shared hosting provider.

## 🚀 Quick Start

### 1. Build the Project

```bash
# Install dependencies
npm install

# Build for production
npm run build
```

This will create a `dist` folder with all the static files.

### 2. Upload to Shared Hosting

1. **Connect to your hosting via FTP/SFTP** or use the hosting control panel file manager
2. **Navigate to your public_html or www folder**
3. **Upload all contents from the `dist` folder** to your hosting's public directory
4. **Make sure the `.htaccess` file is uploaded** (it's in the `client` folder)

### 3. Configure Firebase

1. **Create a Firebase project** at [https://console.firebase.google.com](https://console.firebase.google.com)
2. **Enable Authentication** and create an admin user
3. **Enable Firestore Database**
4. **Update Firebase config** in `client/src/lib/firebase.ts`

## 🔧 Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add project"
3. Enter project name: `aiglobaltech`
4. Follow the setup wizard

### 2. Enable Authentication

1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password"
5. Create an admin user:
   - Go to "Users" tab
   - Click "Add user"
   - Enter admin email and password

### 3. Enable Firestore

1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location close to your users

### 4. Update Firebase Config

Edit `client/src/lib/firebase.ts`:

```typescript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

Get these values from your Firebase project settings.

## 📁 File Structure After Deployment

Your hosting should look like this:

```
public_html/
├── index.html
├── .htaccess
├── assets/
│   ├── index-[hash].css
│   ├── index-[hash].js
│   └── [other assets]
└── [other static files]
```

## 🔒 Security Rules for Firestore

In Firebase Console > Firestore > Rules, set these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to write applications
    match /receivedApplications/{document} {
      allow write: if true;
      allow read: if request.auth != null; // Only authenticated users can read
    }
    
    // Allow authenticated users to read all data
    match /{document=**} {
      allow read: if request.auth != null;
    }
  }
}
```

## 🌐 Domain Configuration

### 1. Custom Domain (Optional)

1. In Firebase Console, go to "Hosting"
2. Click "Add custom domain"
3. Follow the DNS configuration instructions
4. Update your domain's DNS records

### 2. SSL Certificate

Most shared hosting providers automatically provide SSL certificates. If not:
1. Contact your hosting provider
2. Enable SSL in your hosting control panel
3. Update your site to use HTTPS

## 📧 Email Configuration

For form submissions, you can:

1. **Use Firebase Functions** (requires paid plan)
2. **Use a third-party service** like Formspree or Netlify Forms
3. **Set up email forwarding** in your hosting control panel

## 🔍 Testing Your Deployment

1. **Visit your website** and test the application form
2. **Submit a test application** to verify Firebase integration
3. **Login to admin panel** at `yourdomain.com/admin`
4. **Check that applications appear** in the admin dashboard

## 🛠️ Troubleshooting

### Common Issues:

1. **404 Errors on Refresh**
   - Ensure `.htaccess` file is uploaded
   - Check that mod_rewrite is enabled on your hosting

2. **Firebase Connection Issues**
   - Verify Firebase config is correct
   - Check that Firestore rules allow writes
   - Ensure your domain is added to Firebase authorized domains

3. **Admin Login Not Working**
   - Verify admin user is created in Firebase Authentication
   - Check that email/password authentication is enabled

4. **Form Submissions Not Working**
   - Check browser console for errors
   - Verify Firebase project ID is correct
   - Check Firestore rules allow writes

### Performance Optimization:

1. **Enable Gzip compression** (usually automatic with `.htaccess`)
2. **Set up caching** for static assets
3. **Optimize images** before uploading
4. **Use CDN** for better global performance

## 📊 Analytics Setup

### Google Analytics

1. Create a Google Analytics account
2. Add tracking code to `client/index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔄 Updates and Maintenance

### To update your website:

1. **Make changes locally**
2. **Test thoroughly**
3. **Build the project**: `npm run build`
4. **Upload new files** to hosting
5. **Clear browser cache** if needed

### Regular Maintenance:

1. **Monitor Firebase usage** (free tier limits)
2. **Backup your data** regularly
3. **Update dependencies** periodically
4. **Monitor website performance**

## 💰 Cost Considerations

### Free Tier Limits (Firebase):
- **Authentication**: 10,000 users/month
- **Firestore**: 1GB storage, 50,000 reads/day, 20,000 writes/day
- **Hosting**: 10GB storage, 360MB/day transfer

### Shared Hosting:
- **Storage**: Usually 1-10GB
- **Bandwidth**: Usually 1-100GB/month
- **Domains**: Usually 1-5 domains

## 🆘 Support

If you encounter issues:

1. **Check the troubleshooting section above**
2. **Review Firebase console logs**
3. **Check browser developer tools**
4. **Contact your hosting provider**
5. **Review Firebase documentation**

## 🎉 Success!

Your AI Global Tech website is now live and ready to accept applications! The admin panel will help you manage all incoming applications efficiently. 