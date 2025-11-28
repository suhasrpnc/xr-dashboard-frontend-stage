pipeline {
    agent any

    environment {
        GIT_CREDENTIALS     = 'Jenkinstoken'
        REPO_URL            = 'https://github.com/suhasrpnc/xr-dashboard-frontend-stage.git'

        DEPLOY_BASE         = 'D:\\buildforpipeline'
        APP_FOLDER          = 'xr-dashboard\\browser'

        NODE_PATH           = 'C:\\Program Files\\nodejs'

        IIS_SITE_NAME       = 'XRdashboardfrontend'
        IIS_PORT            = '9005'

        EXTRA_FOLDER_SOURCE = 'C:\Pipeline\Extra'

        // Your email – used by the mail() step
        PERSONAL_EMAIL      = 'reddydr257@gmail.com'
    }

    stages {
        stage('Checkout & Build') {
            steps {
                withEnv(["PATH=${NODE_PATH};${env.PATH}"]) {
                    git branch: 'main',
                        credentialsId: "${GIT_CREDENTIALS}",
                        url: "${REPO_URL}"

                    bat 'node -v'
                    bat 'npm -v'

                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Deploy to Folder') {
            steps {
                bat '''
                echo Cleaning old deploy folder...
                if exist "%DEPLOY_BASE%\\%APP_FOLDER%" (
                    rmdir /S /Q "%DEPLOY_BASE%\\%APP_FOLDER%"
                )

                echo Creating target folder...
                mkdir "%DEPLOY_BASE%\\%APP_FOLDER%"

                echo Copying ONLY inner build folder...
                xcopy /E /I /Y "dist\\xr-dashboard\\browser\\*" "%DEPLOY_BASE%\\%APP_FOLDER%\\"

                echo Copying EXTRA folder...
                if exist "%EXTRA_FOLDER_SOURCE%" (
                    xcopy /E /I /Y "%EXTRA_FOLDER_SOURCE%\\*" "%DEPLOY_BASE%\\%APP_FOLDER%\\"
                ) else (
                    echo EXTRA FOLDER NOT FOUND: %EXTRA_FOLDER_SOURCE%
                )
                '''
            }
        }

        stage('Update IIS Site & Restart') {
            steps {
                powershell '''
                    Import-Module WebAdministration

                    $siteName     = $env:IIS_SITE_NAME
                    $physicalPath = "$env:DEPLOY_BASE\\$env:APP_FOLDER"
                    $port         = [int]$env:IIS_PORT

                    Write-Host "Setting IIS Physical Path to $physicalPath"

                    $site = Get-Item "IIS:\\Sites\\$siteName" -ErrorAction Stop

                    Set-ItemProperty "IIS:\\Sites\\$siteName" -Name physicalPath -Value $physicalPath

                    $pattern = "*:" + $port + ":*"
                    $bindings = $site.Bindings.Collection
                    $hasPortBinding = $bindings | Where-Object { $_.bindingInformation -like $pattern }

                    if (-not $hasPortBinding) {
                        New-WebBinding -Name $siteName -Protocol "http" -Port $port -IPAddress "*" -HostHeader ""
                    }

                    Restart-WebItem "IIS:\\Sites\\$siteName"
                '''
            }
        }
    }

    post {
        success {
            echo 'Build succeeded — sending success email...'

            mail to: "${env.PERSONAL_EMAIL}",
                 subject: "SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: """Hello Suhas,

The Jenkins job '${env.JOB_NAME}' build #${env.BUILD_NUMBER} completed SUCCESSFULLY.

Job name : ${env.JOB_NAME}
Build URL: ${env.BUILD_URL}

Regards,
Jenkins
"""
        }

        failure {
            echo 'Build failed — sending failure email...'

            mail to: "${env.PERSONAL_EMAIL}",
                 subject: "FAILURE: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: """Hello Suhas,

The Jenkins job '${env.JOB_NAME}' build #${env.BUILD_NUMBER} has FAILED.

Job name : ${env.JOB_NAME}
Build URL: ${env.BUILD_URL}

Please check the console output in Jenkins for details.

Regards,
Jenkins
"""
        }

        always {
            echo 'Post actions finished.'
        }
    }
}
