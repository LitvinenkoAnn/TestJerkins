pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.42.1-focal'
            args '-u root' // Добавляем опцию -u root для запуска контейнера от имени root пользователя
        }
    }
    environment {
        DISPLAY = ':99' // Устанавливаем переменную среды DISPLAY для использования Xvfb
    }
    stages {
        stage('Setup Xvfb') {
            steps {
                sh 'Xvfb :99 -ac &'
                sleep 3 // Даем немного времени для запуска Xvfb
            }
        }
        stage('Update playwright') {
            steps {
                sh '''
                    npm i -D @playwright/test
                    npx playwright install
                '''
            }
        }
        stage('test') {
            steps {
                sh '''
                    npm run test:promova
                '''
            }
            post {
                success {
                    archiveArtifacts(artifacts: 'homepage-*.png', followSymlinks: false)
                    sh 'rm -rf *.png'
                }
            }
        }
    }
}