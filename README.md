# BioVault: Research Sample and Biological Sequence Repository

BioVault is a web-based research data management system designed to help researchers organize biological research projects, laboratory samples, and biological sequence records. The system provides a centralized platform for storing and managing research-related information while maintaining relationships between projects, researchers, samples, and DNA/RNA/protein sequences.

## Getting Started

### Prerequisites

- Java 17 or later
- Node.js and npm (for the client application)
- MongoDB (a local instance, or a hosted cluster such as MongoDB Atlas)
- Docker and Docker Compose (optional, for running MongoDB locally)

### Backend Setup

1. Clone the repository:
   ```bash
   git clone -b <branch-name> https://github.com/dumij58/BioVault.git
   cd BioVault
   ```
2. Create a `.env` file in the project root by copying `.env.example`, and fill in your own values:
   ```bash
   cp .env.example .env
   ```
3. (Optional) Instead of a hosted cluster, run MongoDB locally with the `compose.yaml` file and set `MONGODB_URI` accordingly (e.g. `mongodb://root:secret@localhost:27017`). It can be started either manually:
   ```bash
   docker compose up -d
   ```
   or automatically on application startup by building/running with the `docker` Maven profile, which adds Spring Boot's Docker Compose support:
   ```bash
   ./mvnw spring-boot:run -Pdocker
   ```
4. Build and run the application using the Maven Wrapper:
   ```bash
   ./mvnw spring-boot:run
   ```
   The backend server will start on `http://localhost:8080` by default.

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd src/main/client
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the application in your browser at the URL printed in the terminal (typically `http://localhost:5173`).

---

To build the production version of the application, run (from `BioVault/src/main/client` directory):
   ```bash
   npm run build
   ```
   ```bash
   cd ../../../
   ./mvnw spring-boot:run
   ```
   - This will make your frontend available at `http://localhost:8080/`.
   - And you can access the backend at `http://localhost:8080/api/v1/`.
