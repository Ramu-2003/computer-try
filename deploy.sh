#!/bin/bash

echo "🚀 Computer Mode Battle - Deployment Script"
echo "==========================================="

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
fi

# Add all files
echo "📝 Adding files to Git..."
git add .

# Commit
echo "💾 Committing changes..."
read -p "Enter commit message (default: 'Deploy Computer Mode Battle'): " commit_msg
commit_msg=${commit_msg:-"Deploy Computer Mode Battle"}
git commit -m "$commit_msg"

# Set main branch
echo "🌿 Setting main branch..."
git branch -M main

# Check if remote exists
if git remote | grep -q 'origin'; then
    echo "✅ Remote 'origin' already exists"
else
    echo "🔗 Adding remote origin..."
    git remote add origin https://github.com/Ramu-2003/computer-try.git
fi

# Push to GitHub
echo "⬆️  Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Successfully pushed to GitHub!"
echo ""
echo "📋 Next Steps:"
echo "1. Go to https://vercel.com/dashboard"
echo "2. Click 'Add New' → 'Project'"
echo "3. Import your GitHub repository"
echo "4. Add environment variables (see DEPLOYMENT.md)"
echo "5. Deploy!"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"
