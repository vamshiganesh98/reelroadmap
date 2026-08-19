#!/usr/bin/env bash
set -euo pipefail

REMOTE="${1:-origin}"
BRANCH="${2:-main}"

echo "Pushing to GitHub ($REMOTE/$BRANCH)..."
git push -u "$REMOTE" "$BRANCH"
echo "Done."
