def jobTokens = "${env.JOB_NAME}".tokenize("//")
def appRepo = jobTokens.get(jobTokens.size())

node {
  stage('SCM Check Out') {
    script {
      checkout([$class: 'GitSCM', branches: [[name: env.BRANCH_NAME]], 
        doGenerateSubmoduleConfigurations: false, 
        extensions: [], submoduleCfg: [], 
        userRemoteConfigs: [[credentialsId: 'jenkins', url: "git@10.11.0.91:aiotal/${appRepo}.git"]]])
    }
  }
  //stage('Build Application') {
  //  sh "./gradlew buildAll"
  //}
  stage('Deploy Application') {
    sh "docker ps"
  }
}
