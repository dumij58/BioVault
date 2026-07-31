# syntax=docker/dockerfile:1

# ---- Stage 1: Build the frontend (React/Vite client) ----
FROM node:22-alpine AS frontend-build
WORKDIR /app/src/main/client

COPY src/main/client/package.json src/main/client/package-lock.json ./
RUN npm ci

COPY src/main/client/ ./
RUN npm run build

# ---- Stage 2: Build and test the backend (Spring Boot) ----
FROM maven:3.9-eclipse-temurin-17 AS backend-build
WORKDIR /app

COPY pom.xml ./
COPY src ./src

# Bring in the frontend production build so it is packaged as static resources
COPY --from=frontend-build /app/src/main/resources/static ./src/main/resources/static

# A syntactically valid (but not necessarily reachable) URI is enough to satisfy
# Spring's MongoClient bean creation while the test suite runs during the build.
ENV MONGODB_URI=mongodb://localhost:27017

# Run the test suite; the build fails if any test fails
RUN mvn -B -ntp test

# Package the application (tests already ran above)
RUN mvn -B -ntp package -DskipTests

# ---- Stage 3: Runtime image ----
FROM eclipse-temurin:17-jre AS runtime
WORKDIR /app

COPY --from=backend-build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
