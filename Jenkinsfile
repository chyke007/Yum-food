pipeline {
    agent any
    
    tools {nodejs "node"}
    stages {

        stage('Cloning Git') {
            steps {
                git 'https://github.com/chyke007/Yum-food'
            }
        }
            
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Lint Stage') {
            
            steps {
            
               sh 'npm run lint'
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

        stage('Deploy stage:Dev') {

             when {
                branch 'dev'
            }

            steps {
                 sh 'setup.sh && sudo ansible-playbook mern.yml --tags Ansible_CF_Dev && sudo rm -rf /home/ubuntu/.ssh/ssh_key.pem'
            }
        }

         stage('Deploy stage:Prod') {

             when {
                branch 'main'
            }

            steps {
                 sh 'setup.sh && sudo ansible-playbook mern.yml --tags Ansible_CF_Prod && sudo rm -rf /home/ubuntu/.ssh/ssh_key.pem'
            }
        }
    }
}