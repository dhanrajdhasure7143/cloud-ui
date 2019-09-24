node {

    stage('SCM Check Out'){
        checkout([$class: 'GitSCM', branches: [[name: '*/develop']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'Gitlab', url: 'git@10.11.0.91:aiotal/cloud-ui.git']]])
    }
    
    stage('NPM Package'){
        sh label: '', script: 'npm install bot-grid'
    }
    
    stage('NPM Package'){
        sh label: '', script: 'npm run build'
    }
    
    stage('Build Docker Image'){
        sh label: '', script: 'docker build -f Dockerfile -t jaswanthmadala/aiotal_UI .'
    }
    
    stage('Pushing Docker Image'){
        sh label: '', script: 'docker login -u jaswanthmadala -p Welcome@123'
        sh label: '', script: 'docker push jaswanthmadala/aiotal_UI'
    }
    
}