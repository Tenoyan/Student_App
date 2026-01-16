# Setup Self-Hosted GitHub Actions Runner for Docker Desktop

To see CI/CD containers in Docker Desktop, you need to run GitHub Actions on your local machine using a self-hosted runner.

## Steps to Setup:

1. **Go to your GitHub repository**
   - Settings → Actions → Runners → New self-hosted runner

2. **Download and configure the runner on Windows:**
   ```powershell
   # Create a folder
   mkdir actions-runner
   cd actions-runner
   
   # Download the latest runner package (Windows x64)
   Invoke-WebRequest -Uri https://github.com/actions/runner/releases/download/v2.311.0/actions-runner-win-x64-2.311.0.zip -OutFile actions-runner-win-x64-2.311.0.zip
   
   # Extract
   Expand-Archive -Path actions-runner-win-x64-2.311.0.zip -DestinationPath .
   
   # Configure (you'll get the token from GitHub)
   .\config.cmd --url https://github.com/YOUR_USERNAME/YOUR_REPO --token YOUR_TOKEN
   
   # Run as a service (so it starts automatically)
   .\run.cmd
   ```

3. **Update the workflow to use self-hosted runner:**
   - Change `runs-on: ubuntu-latest` to `runs-on: self-hosted`

4. **Now when CI/CD runs, containers will appear in your Docker Desktop!**

## Alternative: Run Containers Locally with a Script

If you prefer, I can create a script that automatically runs containers locally when you push code.
