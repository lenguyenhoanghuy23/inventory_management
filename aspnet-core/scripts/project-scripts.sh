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
echo "----------------------------------------------------"
echo "🗸 Run Dotnet restechoore"
echo "----------------------------------------------------"
cd $GITHUB_WORKSPACE/$PROJECT_APPKEY/ && pwd
echo "dotnet restore --verbosity quiet" && dotnet restore --verbosity quiet

if [ "$?" = 1 ]; then
    echo "donet restore failed!" 😡
    DOTNET_RESTORE_RESULT="failure!" && echo DOTNET_RESTORE_RESULT:$DOTNET_RESTORE_RESULT exit 1
else
    echo "donet restore passed!" 😊
    DOTNET_RESTORE_RESULT="passed!"  && echo DOTNET_RESTORE_RESULT:$DOTNET_RESTORE_RESULT
fi
# echo "🧪 Test $REPO_APPKEY-$PROJECT_APPKEY @ $CONFIG"
# cd $GITHUB_WORKSPACE/$PROJECT_APPKEY
# npm run test 