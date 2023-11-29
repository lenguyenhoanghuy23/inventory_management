echo "Execute the project building scripts... "

echo "BUILD_STAGE=RUN_PROJECT_SCRIPTS" >> $GITHUB_ENV

echo "✅ For Debuging Output.. "
echo "REPO_APPKEY:$REPO_APPKEY"
echo "PROJECT_APPKEY:$PROJECT_APPKEY"
echo "CONFIG:$CONFIG"
echo "ENV_FILE_PATH:$ENV_FILE_PATH"
echo "GITHUB_WORKSPACE:$GITHUB_WORKSPACE"

echo "🏗️ Building $REPO_APPKEY-$PROJECT_APPKEY @ $CONFIG"
cd $GITHUB_WORKSPACE/$PROJECT_APPKEY
CI=false
npm install --legacy-peer-deps
npm run build

# echo "🧪 Test $REPO_APPKEY-$PROJECT_APPKEY @ $CONFIG"
# cd $GITHUB_WORKSPACE/$PROJECT_APPKEY
# npm run test 