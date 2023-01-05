FROM openjdk:11-jdk
COPY ./build/libs/*.jar squadmap.jar
ENTRYPOINT ["java","-jar","-Dspring.profile.active=prod","/squadmap.jar"]
