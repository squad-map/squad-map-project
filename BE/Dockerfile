FROM openjdk:11-jdk
COPY ./build/libs/*.jar squadmap.jar
ENTRYPOINT ["java","-jar","-Dspring.profiles.active=prod","/squadmap.jar"]
