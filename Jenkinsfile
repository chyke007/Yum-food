pipeline {
    agent any
    
    tools {nodejs "node"}

    environment {
        DOCKER_REPO = 'chyke007/yumfood' // Replace with your Docker Hub username and repository name
        IMAGE_TAG = "1.0.0" // Replace with the desired tag for your Docker image
    }

    stages {
  
        stage('Install dependencies') {
            steps {
                sh 'npm install' 
                echo 'Installing dependecies found in branch: ' + env.BRANCH_NAME
            }
        }
        
        stage('Unit Test stage') {
            
            steps {
                sh 'npm run test'
            }
        }

        stage('Integration Test stage') {
            
            steps {
                  sh 'npm run integration-test'
            }
        }

        stage('Build App Docker Images') {
            
            steps {
                echo 'Building App Images'
                sh 'cp frontend/.env.example frontend/.env'
                sh 'docker build -t ${DOCKER_REPO}:${IMAGE_TAG} .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                    sh "docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
                    sh "docker push ${DOCKER_REPO}:${IMAGE_TAG}"
                }
            }
        }
    }
}