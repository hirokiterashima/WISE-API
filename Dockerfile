FROM maven:3.6.3-openjdk-11

WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline

COPY src/ /app/src/

CMD mvn spring-boot:run