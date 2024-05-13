pipeline {
        agent any

        environment {
            REGISTRY = 'amorimmg/portfolionestjs'
            DOCKER_TAG = "1.$BUILD_NUMBER"
        }

        stages {
            stage('Checkout SCM') {
                steps {
                    checkout scm
                }
            }

            stage('Docker Stop Previous Build') {
                steps {
                    script {
                        sh "docker ps -a -q --filter ancestor=$REGISTRY | xargs -r docker stop"
                        sh "docker ps -a -q --filter ancestor=$REGISTRY | xargs -r docker rm"

                        sh "docker images -q $REGISTRY | xargs -r docker rmi -f"
                    }
                }
            }

            stage('Docker Build Image') {
                steps {
                    script {
                        docker.build(REGISTRY, "-f Dockerfile --target production . -t $REGISTRY:$DOCKER_TAG")
                    }
                }
            }

            stage('Docker Push Image') {
                steps {
                    script {
                        withCredentials([
                            usernamePassword(
                                credentialsId: 'docker_cred',
                                usernameVariable: 'USERNAME',
                                passwordVariable: 'PASSWORD'
                            )
                        ]) {
                            sh "docker login -u $USERNAME -p $PASSWORD"
                            docker.image(REGISTRY).push(DOCKER_TAG)
                        }
                    }
                }
            }

            stage('Docker Run Build') {
                steps {
                    script {
                        sh "docker run --restart=always --network bridge -d -p 5001:4000/tcp $REGISTRY:$DOCKER_TAG"
                    }
                }
            }
        }
}
