# Mool Gyan App

A spiritual content management app built with Next.js and Capacitor for Android APK deployment.

## Features

- 📱 **Mobile-First Design**: Built with Next.js and Radix UI components
- 📺 **Video Management**: Add YouTube videos or upload files directly
- 📚 **Book Store**: Manage spiritual books and documents
- 🖼️ **Photo Gallery**: Organize spiritual photos and events
- 📝 **News & Updates**: Content management system
- 🔔 **Notifications**: Push notification support
- 🌐 **Multi-language**: Internationalization support

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **UI**: Radix UI, Tailwind CSS
- **State Management**: React Context API
- **Storage**: GitHub API (replaces Firebase/Supabase)
- **Mobile**: Capacitor for Android APK builds
- **Build Tools**: Vite, PostCSS, Autoprefixer

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Android Studio (for APK builds)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd mool-new-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.local.example` to `.env.local` and configure:
   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local`:
   ```env
   # GitHub Storage Configuration
   NEXT_PUBLIC_GITHUB_TOKEN=your_github_token_here
   NEXT_PUBLIC_GITHUB_REPO=your-username/your-repo-name
   NEXT_PUBLIC_GITHUB_BRANCH=main
   
   # App Configuration
   NEXT_PUBLIC_APP_NAME="Mool Gyan"
   NEXT_PUBLIC_APP_VERSION="5.0.0"
   ```

4. **Generate GitHub Token**
   
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Generate new token with `repo` permissions
   - Copy the token to your `.env.local` file

5. **Start development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:9002](http://localhost:9002) in your browser.

## Building for Android

### Prerequisites

- Android Studio installed
- Android SDK configured
- Java Development Kit (JDK)

### Build Process

1. **Initialize Capacitor (first time only)**
   ```bash
   npm run cap:init
   npm run cap:add:android
   ```

2. **Build the app**
   ```bash
   npm run cap:build:apk
   ```

3. **Locate the APK**
   
   The APK will be generated at:
   ```
   android/app/build/outputs/apk/release/app-release.apk
   ```

### Alternative Build Commands

```bash
# Prepare Android project
npm run cap:prepare:android

# Run on connected device/emulator
npm run cap:run:android

# Open Android Studio
npm run cap:open:android
```

## GitHub Storage Setup

This app uses GitHub as storage instead of Firebase/Supabase to avoid costs.

### Repository Structure

Your GitHub repository should have this structure:
```
your-repo/
├── spiritual-photos/
├── satsang-videos/
├── book-store/
├── news/
└── assets/
```

### Permissions

Ensure your GitHub token has these permissions:
- `repo` - Full control of private repositories

## Data Management

The app uses localStorage for local data persistence and GitHub API for file storage. All data is synchronized with your GitHub repository.

## Troubleshooting

### Common Issues

1. **GitHub API Rate Limits**
   - Use a personal access token with sufficient permissions
   - Consider using a GitHub App for production

2. **Android Build Failures**
   - Ensure Android SDK is properly configured
   - Check Gradle version compatibility
   - Verify Java version (Java 11 recommended)

3. **GitHub Upload Failures**
   - Check internet connection
   - Verify repository permissions
   - Ensure branch exists

### Development Tips

- Use `npm run dev` for development with hot reload
- Check browser console for API errors
- Use Android Studio's Logcat for mobile debugging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Check the GitHub Issues
- Review the documentation
- Contact the development team

## Notes

- This app is designed to be cost-free by using GitHub storage instead of paid services
- All user data is stored in your GitHub repository
- The app works offline with cached data
- Regular backups are handled automatically through GitHub commits