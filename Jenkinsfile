pipeline {
    agent any
    
    tools {nodejs "node"}
    stages {
  
        stage('Install dependencies') {
            steps {
                sh 'npm install'
                echo 'Installing dependecies found in branch: ' + env.BRANCH_NAME
            }
        }
        
        // stage('Unit Test stage') {
            
        //     steps {
        //         sh 'npm run test'
        //     }
        // }

        // stage('Integration Test stage') {
            
        //     steps {
        //           sh 'npm run integration-test'
        //     }
        // }

        stage('Deploy stage:Dev') {

             when {
                branch 'dev'
            }

            steps {
                echo "Running Dev Deploy"
                sh 'chmod +x ./setup.sh'
                sh './setup.sh && ansible-playbook playbook.yml --tags dev'
            }
        }

        //  stage('Deploy stage:Prod') {

        //      when {
        //         branch 'master'
        //     }

        //     steps {
        //         echo "Running Prod Deploy"
        //         sh 'chmod +x ./setup.sh'
        //         sh './setup.sh && ansible-playbook playbook.yml --tags prod && rm -rf /home/ubuntu/.ssh/ssh_key.pem'
        //     }
        // }
    }
}