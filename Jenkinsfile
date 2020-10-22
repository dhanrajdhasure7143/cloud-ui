node {
  stage("Init") {
    echo  env.JOB_NAME
    echo env.BRANCH_NAME
  }
  stage('SCM Check Out'){
    checkout([$class: 'GitSCM', branches: [[name: env.BRANCH_NAME]], 
    doGenerateSubmoduleConfigurations: false, 
    extensions: [], submoduleCfg: [], 
    userRemoteConfigs: [[credentialsId: 'jenkins', url: 'git@10.11.0.91:aiotal/cloud-ui.git']]])
  }
  stage('Build Application'){
    sh label: '', script: './gradlew buildAll'
  }
}
