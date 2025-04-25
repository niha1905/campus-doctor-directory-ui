# Deploying to Vercel

This guide will walk you through the process of deploying the Campus Doctor Directory application to Vercel.

## Prerequisites

1. A [Vercel](https://vercel.com) account
2. Git installed on your local machine
3. Node.js and npm installed

## Deployment Steps

### Option 1: Deploy from the Command Line

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Log in to your Vercel account:
   ```bash
   vercel login
   ```

3. Navigate to your project directory:
   ```bash
   cd path/to/campus-doctor-directory-ui
   ```

4. Deploy the project:
   ```bash
   vercel
   ```

5. Follow the prompts to configure your deployment:
   - Set up and deploy: `Y`
   - Link to existing project: `N` (if this is your first deployment)
   - Project name: Accept the default or enter a custom name
   - Directory: `.` (current directory)
   - Override settings: `N` (use the settings from vercel.json)

6. Once deployed, Vercel will provide you with a URL to access your application.

### Option 2: Deploy from GitHub

1. Push your code to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/campus-doctor-directory.git
   git push -u origin main
   ```

2. Go to [Vercel](https://vercel.com) and sign in.

3. Click "Add New" > "Project".

4. Import your GitHub repository.

5. Configure your project settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Environment Variables: Add any necessary environment variables

6. Click "Deploy".

7. Once deployed, Vercel will provide you with a URL to access your application.

## Custom Domain Setup

To connect a custom domain to your Vercel deployment:

1. Go to your project dashboard on Vercel.

2. Click on "Settings" > "Domains".

3. Enter your domain name and click "Add".

4. Follow the instructions to configure your DNS settings.

## Continuous Deployment

When you connect your GitHub repository to Vercel, any changes pushed to your main branch will automatically trigger a new deployment. This ensures that your application is always up-to-date with the latest changes.

## Troubleshooting

If you encounter any issues during deployment:

1. Check the build logs in the Vercel dashboard.

2. Ensure that your application builds successfully locally:
   ```bash
   npm run build
   ```

3. Verify that your vercel.json configuration is correct.

4. Check that all dependencies are properly listed in your package.json file.

For more information, refer to the [Vercel documentation](https://vercel.com/docs).