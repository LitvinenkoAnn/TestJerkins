pipeline {
  agent any
  stages {
    stage('Install dependencies') {
      steps {
        sh '''
          npm install
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
