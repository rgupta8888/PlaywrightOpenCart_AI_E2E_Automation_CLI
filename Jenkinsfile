
/*
Pipeline Stages:
1. Checkout source code
2. Install Node.js dependencies
3. Install Playwright browsers
4. Configure .env
5. Execute selected Playwright test suite
6. Archive and publish reports
7. Send email notification
8. Clean up allure-results on success

Platform: macOS
Shell: Bash / sh
*/

pipeline {
    agent any

    tools {
        git 'Default'
    }

    options {
        timestamps()
    }

    parameters {
        choice(
            name: 'TEST_SUITE',
            choices: [
                'test:api',
                'test:master',
                'test:sanity',
                'test:regression',
                'test:e2e',
                'test:web',
                'test:datadriven'
            ],
            description: 'Select the test suite to run'
        )

        choice(
            name: 'BROWSER',
            choices: ['chromium', 'firefox', 'webkit'],
            description: 'Select browser for tests'
        )

        choice(
            name: 'MODE',
            choices: ['headless', 'headed'],
            description: 'Select headless or headed mode'
        )
    }

    environment {
        NODE_ENV = 'test'
        CI = '1'

        // macOS Homebrew Node.js path
        PATH = "/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin:${env.PATH}"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Verify Environment') {
            steps {
                sh '''
                    echo "Checking macOS environment..."

                    sw_vers
                    java -version
                    node -v
                    npm -v
                    git --version
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                sh '''
                    npx playwright install

                    if [ ! -f .env ] && [ -f .env.example ]; then
                        cp .env.example .env
                    fi
                '''
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    def suite = params.TEST_SUITE
                    def browserFlag = "--project=${params.BROWSER}"
                    def modeFlag = params.MODE == 'headed' ? '--headed' : ''

                    sh """
                        npm run ${suite} -- ${browserFlag} ${modeFlag}
                    """
                }
            }
        }
    }

    post {

        always {

            archiveArtifacts(
                artifacts: 'reports/**,custom-report/**,allure-results/**',
                allowEmptyArchive: true
            )

            junit(
                testResults: 'reports/results.xml',
                allowEmptyResults: true
            )

            allure(
                includeProperties: false,
                results: [[path: 'allure-results']]
            )

            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'reports',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])

            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'custom-report',
                reportFiles: '*.html',
                reportName: 'Custom Test Report'
            ])

            emailext(
                subject: "Jenkins Build: ${env.JOB_NAME} #${env.BUILD_NUMBER} - ${currentBuild.currentResult}",

                body: """
                    <h2>Playwright Test Execution Report</h2>

                    <p><b>Job:</b> ${env.JOB_NAME}</p>
                    <p><b>Build:</b> #${env.BUILD_NUMBER}</p>
                    <p><b>Status:</b> ${currentBuild.currentResult}</p>
                    <p><b>Test Suite:</b> ${params.TEST_SUITE}</p>
                    <p><b>Browser:</b> ${params.BROWSER}</p>
                    <p><b>Mode:</b> ${params.MODE}</p>

                    <p>
                        <a href="${env.BUILD_URL}">
                            Open Jenkins Build
                        </a> |
                        <a href="${env.BUILD_URL}Playwright_20HTML_20Report">
                            Open Playwright HTML Report
                        </a> |
                        <a href="${env.BUILD_URL}Custom_20Test_20Report">
                            Open Custom Report
                        </a>
                    </p>
                """,

                to: "RECIVER_EMAIL_ADDRESS",
                from: "SENDER_EMAIL_ADDRESS",
                replyTo: "RECIVER_EMAIL_ADDRESS",
                mimeType: "text/html"
            )
        }

        success {
            sh '''
                if [ -d allure-results ]; then
                    rm -rf allure-results
                    echo "Allure results cleaned up."
                fi
            '''
        }
    }
}
