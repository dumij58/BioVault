# BioVault Backend API Documentation

Welcome to the **BioVault REST API Documentation**. This document provides detailed information on all backend endpoints, authentication mechanisms, request/response formats, security roles, and status codes.

---

## 1. Overview & Base Configuration

- **Base URL:** `http://localhost:8080`
- **API Version:** `v1`
- **Default Base Path:** `/api/v1`
- **Content-Type:** `application/json`

---

## 2. Authentication & Authorization

BioVault uses **HTTP Basic Authentication** over HTTPS. 

### Credentials
Include an `Authorization` header in HTTP requests:
```http
Authorization: Basic <base64(email:password)>
```

### User Roles
- **`ADMIN`**: Full access to all endpoints including institution management and researcher directory administration.
- **`RESEARCHER`**: Access to read researchers, manage research projects, biological samples, genomic sequences, sequence types, and storage locations.

### Security Access Matrix

| Endpoint Route | HTTP Method | Minimum Access Level |
| :--- | :--- | :--- |
| `/api/v1/auth/register` | `POST` | Public (Permit All) |
| `/api/v1/auth/me` | `GET` | Authenticated (`ADMIN` or `RESEARCHER`) |
| `/api/v1/ping` | `GET` | Authenticated |
| `/api/v1/institutions/**` | Any | Admin Only (`hasRole('ADMIN')`) |
| `/api/v1/researchers/**` | `GET` | Authenticated (`ADMIN` or `RESEARCHER`) |
| `/api/v1/researchers/**` | `POST`, `PUT`, `DELETE` | Admin Only (`hasRole('ADMIN')`) |
| `/api/v1/research_projects/**` | Any | Authenticated |
| `/api/v1/samples/**` | Any | Authenticated |
| `/api/v1/sequence/**` | Any | Authenticated |
| `/api/v1/sequence-types/**` | Any | Authenticated |
| `/api/v1/storage-locations/**` | Any | Authenticated |

---

## 3. Standard Error Responses

When an error occurs, the server returns a structured JSON payload.

### 400 Bad Request (Validation Error)
```json
{
  "status": 400,
  "message": "Validation failed",
  "errors": {
    "email": "Email must be valid",
    "password": "Password must be at least 8 characters"
  }
}
```

### 401 Unauthorized
```json
{
  "message": "Invalid email or password"
}
```

### 404 Not Found
```json
{
  "status": 404,
  "message": "User not found."
}
```

### 409 Conflict (Duplicate Entry)
```json
{
  "status": 409,
  "message": "Email already exists."
}
```

---

## 4. Endpoints Reference

---

### 4.1. Authentication API (`/api/v1/auth`)

#### 1. Register User
Registers a new user account. Upon successful registration as a researcher, a record in the researcher directory is automatically synchronized.

- **URL:** `/api/v1/auth/register`
- **Method:** `POST`
- **Auth Required:** No (Public)
- **Request Body:**
  ```json
  {
    "name": "Dr. Jane Doe",
    "email": "jane.doe@biovault.org",
    "password": "securePassword123",
    "institution": "Genomics Research Institute",
    "designation": "Senior Geneticist"
  }
  ```
  *Validation Rules:*
  - `name`: Required, max 100 characters
  - `email`: Required, valid email format
  - `password`: Required, min 8 characters
  - `institution`: Required
  - `designation`: Required

- **Success Response:** `201 Created`
  ```json
  {
    "id": "64d2f1a5e4b0a123456789ab",
    "name": "Dr. Jane Doe",
    "email": "jane.doe@biovault.org",
    "role": "RESEARCHER",
    "institution": "Genomics Research Institute",
    "designation": "Senior Geneticist"
  }
  ```

#### 2. Get Current Authenticated User Profile
Fetches the profile details of the logged-in user matching the Basic Auth credentials.

- **URL:** `/api/v1/auth/me`
- **Method:** `GET`
- **Auth Required:** Yes
- **Success Response:** `200 OK`
  ```json
  {
    "id": "64d2f1a5e4b0a123456789ab",
    "name": "Dr. Jane Doe",
    "email": "jane.doe@biovault.org",
    "role": "RESEARCHER",
    "institution": "Genomics Research Institute",
    "designation": "Senior Geneticist"
  }
  ```

---

### 4.2. System Health API (`/api/v1`)

#### 1. Ping Server
Health check endpoint to test connection and authentication status.

- **URL:** `/api/v1/ping`
- **Method:** `GET`
- **Auth Required:** Yes
- **Success Response:** `200 OK`
  ```text
  pong
  ```

---

### 4.3. Institution Management API (`/api/v1/institutions`)

*Note: All endpoints under `/api/v1/institutions` require `ADMIN` role.*

#### 1. Create Institution
- **URL:** `/api/v1/institutions`
- **Method:** `POST`
- **Auth Required:** Yes (`ADMIN`)
- **Request Body:**
  ```json
  {
    "name": "Global Bio-Repository Institute",
    "country": "Switzerland",
    "address": "12 Science Park Way, Geneva",
    "contactInformation": "contact@globalbio.org"
  }
  ```
- **Success Response:** `200 OK`
  ```json
  {
    "id": "64d2f2b6e4b0a987654321cd",
    "name": "Global Bio-Repository Institute",
    "country": "Switzerland",
    "address": "12 Science Park Way, Geneva",
    "contactInformation": "contact@globalbio.org"
  }
  ```

#### 2. Get All Institutions
- **URL:** `/api/v1/institutions`
- **Method:** `GET`
- **Auth Required:** Yes (`ADMIN`)
- **Success Response:** `200 OK`
  ```json
  [
    {
      "id": "64d2f2b6e4b0a987654321cd",
      "name": "Global Bio-Repository Institute",
      "country": "Switzerland",
      "address": "12 Science Park Way, Geneva",
      "contactInformation": "contact@globalbio.org"
    }
  ]
  ```

#### 3. Get Institution by ID
- **URL:** `/api/v1/institutions/{id}`
- **Method:** `GET`
- **Auth Required:** Yes (`ADMIN`)
- **Success Response:** `200 OK`
  ```json
  {
    "id": "64d2f2b6e4b0a987654321cd",
    "name": "Global Bio-Repository Institute",
    "country": "Switzerland",
    "address": "12 Science Park Way, Geneva",
    "contactInformation": "contact@globalbio.org"
  }
  ```

#### 4. Update Institution
- **URL:** `/api/v1/institutions/{id}`
- **Method:** `PUT`
- **Auth Required:** Yes (`ADMIN`)
- **Request Body:**
  ```json
  {
    "name": "Global Bio-Repository Institute (Updated)",
    "country": "Switzerland",
    "address": "15 Science Park Way, Geneva",
    "contactInformation": "info@globalbio.org"
  }
  ```
- **Success Response:** `200 OK`

#### 5. Delete Institution
- **URL:** `/api/v1/institutions/{id}`
- **Method:** `DELETE`
- **Auth Required:** Yes (`ADMIN`)
- **Success Response:** `200 OK`
  ```text
  Institution deleted successfully with id: 64d2f2b6e4b0a987654321cd
  ```

---

### 4.4. Researcher Directory API (`/api/v1/researchers`)

#### 1. Create Researcher
- **URL:** `/api/v1/researchers`
- **Method:** `POST`
- **Auth Required:** Yes (`ADMIN`)
- **Request Body:**
  ```json
  {
    "name": "Dr. Alex Smith",
    "email": "alex.smith@biovault.org",
    "department": "Molecular Biology",
    "designation": "Principal Investigator"
  }
  ```
- **Success Response:** `201 Created`
  ```json
  {
    "id": "64d2f3c7e4b0b112233445ee",
    "name": "Dr. Alex Smith",
    "email": "alex.smith@biovault.org",
    "department": "Molecular Biology",
    "designation": "Principal Investigator"
  }
  ```

#### 2. Get All Researchers
- **URL:** `/api/v1/researchers`
- **Method:** `GET`
- **Auth Required:** Yes (`ADMIN` or `RESEARCHER`)
- **Success Response:** `200 OK`
  ```json
  [
    {
      "id": "64d2f3c7e4b0b112233445ee",
      "name": "Dr. Alex Smith",
      "email": "alex.smith@biovault.org",
      "department": "Molecular Biology",
      "designation": "Principal Investigator"
    }
  ]
  ```

#### 3. Get Researcher by ID
- **URL:** `/api/v1/researchers/{id}`
- **Method:** `GET`
- **Auth Required:** Yes (`ADMIN` or `RESEARCHER`)
- **Success Response:** `200 OK`

#### 4. Update Researcher
- **URL:** `/api/v1/researchers/{id}`
- **Method:** `PUT`
- **Auth Required:** Yes (`ADMIN`)
- **Request Body:**
  ```json
  {
    "name": "Dr. Alex Smith",
    "email": "alex.smith@biovault.org",
    "department": "Genomics & Bio-Data",
    "designation": "Director of Genomics"
  }
  ```
- **Success Response:** `200 OK`

#### 5. Delete Researcher
- **URL:** `/api/v1/researchers/{id}`
- **Method:** `DELETE`
- **Auth Required:** Yes (`ADMIN`)
- **Success Response:** `204 No Content`

---

### 4.5. Research Project Management API (`/api/v1/research_projects`)

#### 1. Save Research Project
- **URL:** `/api/v1/research_projects/save`
- **Method:** `POST`
- **Auth Required:** Yes
- **Request Body:**
  ```json
  {
    "title": "Oncology Biomarker Discovery",
    "description": "Identification of novel genetic markers in colorectal cancer.",
    "startDate": "2026-01-10",
    "endDate": "2026-12-20",
    "status": "ACTIVE",
    "principalResearcherId": "64d2f3c7e4b0b112233445ee"
  }
  ```
- **Success Response:** `200 OK`
  ```json
  {
    "id": "64d2f4d8e4b0c223344556ff",
    "title": "Oncology Biomarker Discovery",
    "description": "Identification of novel genetic markers in colorectal cancer.",
    "startDate": "2026-01-10",
    "endDate": "2026-12-20",
    "status": "ACTIVE",
    "principalResearcherId": "64d2f3c7e4b0b112233445ee"
  }
  ```

#### 2. Get All Research Projects
- **URL:** `/api/v1/research_projects/getall`
- **Method:** `GET`
- **Auth Required:** Yes
- **Success Response:** `200 OK`

#### 3. Get Research Project by ID
- **URL:** `/api/v1/research_projects/{id}`
- **Method:** `GET`
- **Auth Required:** Yes
- **Success Response:** `200 OK`

#### 4. Update Research Project
- **URL:** `/api/v1/research_projects/update/{id}`
- **Method:** `PUT`
- **Auth Required:** Yes
- **Request Body:** Same as Save Research Project.
- **Success Response:** `200 OK`

#### 5. Delete Research Project
- **URL:** `/api/v1/research_projects/delete/{id}`
- **Method:** `DELETE`
- **Auth Required:** Yes
- **Success Response:** `200 OK`

---

### 4.6. Sample Management API (`/api/v1/samples`)

#### 1. Create Biological Sample
- **URL:** `/api/v1/samples`
- **Method:** `POST`
- **Auth Required:** Yes
- **Request Body:**
  ```json
  {
    "species": "Homo sapiens",
    "sampleType": "Blood Tissue",
    "collectionDate": "2026-02-14",
    "storageLocation": "Freezer Alpha - Shelf 3",
    "projectId": "64d2f4d8e4b0c223344556ff",
    "storageLocationId": "LOC-001"
  }
  ```
- **Success Response:** `201 Created`
  ```json
  {
    "id": "64d2f5e9e4b0d334455667aa",
    "species": "Homo sapiens",
    "sampleType": "Blood Tissue",
    "collectionDate": "2026-02-14",
    "storageLocation": "Freezer Alpha - Shelf 3",
    "projectId": "64d2f4d8e4b0c223344556ff",
    "storageLocationId": "LOC-001"
  }
  ```

#### 2. Get All Biological Samples
- **URL:** `/api/v1/samples`
- **Method:** `GET`
- **Auth Required:** Yes
- **Success Response:** `200 OK`

#### 3. Get Biological Sample by ID
- **URL:** `/api/v1/samples/{id}`
- **Method:** `GET`
- **Auth Required:** Yes
- **Success Response:** `200 OK`

#### 4. Update Biological Sample
- **URL:** `/api/v1/samples/{id}`
- **Method:** `PUT`
- **Auth Required:** Yes
- **Request Body:** Same as Create Sample.
- **Success Response:** `200 OK`

#### 5. Delete Biological Sample
- **URL:** `/api/v1/samples/{id}`
- **Method:** `DELETE`
- **Auth Required:** Yes
- **Success Response:** `204 No Content`

---

### 4.7. Genomic Sequence API (`/api/v1/sequence`)

#### 1. Save Genomic Sequence
- **URL:** `/api/v1/sequence/save`
- **Method:** `POST`
- **Auth Required:** Yes
- **Request Body:**
  ```json
  {
    "name": "BRCA1 Exon 11 Target",
    "sequence": "ATCGGCTAAGCTAGGCTA...",
    "seqLength": 18,
    "seqTypeId": "64d2f6fae4b0e445566778bb",
    "sampleId": "64d2f5e9e4b0d334455667aa"
  }
  ```
- **Success Response:** `200 OK`
  ```json
  {
    "id": "64d2f70be4b0f556677889cc",
    "name": "BRCA1 Exon 11 Target",
    "sequence": "ATCGGCTAAGCTAGGCTA...",
    "seqLength": 18,
    "seqTypeId": "64d2f6fae4b0e445566778bb",
    "sampleId": "64d2f5e9e4b0d334455667aa"
  }
  ```

#### 2. Get All Genomic Sequences
- **URL:** `/api/v1/sequence/getall`
- **Method:** `GET`
- **Auth Required:** Yes
- **Success Response:** `200 OK`
  ```json
  {
    "sequences": [
      {
        "id": "64d2f70be4b0f556677889cc",
        "name": "BRCA1 Exon 11 Target",
        "sequence": "ATCGGCTAAGCTAGGCTA...",
        "seqLength": 18,
        "seqTypeId": "64d2f6fae4b0e445566778bb",
        "sampleId": "64d2f5e9e4b0d334455667aa"
      }
    ],
    "total": 1
  }
  ```

#### 3. Get Sequence by ID
- **URL:** `/api/v1/sequence/{id}`
- **Method:** `GET`
- **Auth Required:** Yes
- **Success Response:** `200 OK`

#### 4. Update Sequence
- **URL:** `/api/v1/sequence/update/{id}`
- **Method:** `PUT`
- **Auth Required:** Yes
- **Success Response:** `200 OK`

#### 5. Delete Sequence
- **URL:** `/api/v1/sequence/delete/{id}`
- **Method:** `DELETE`
- **Auth Required:** Yes
- **Success Response:** `200 OK`

#### 6. Calculate Sequence Length Utility
Computes or validates the nucleotide/amino acid length of a given sequence string.

- **URL:** `/api/v1/sequence/calclength`
- **Method:** `POST`
- **Auth Required:** Yes
- **Request Body:**
  ```json
  {
    "sequence": "ATCGGCTAAGCTAGGCTA",
    "seqLength": null
  }
  ```
- **Success Response:** `200 OK`
  ```json
  {
    "seqLength": 18
  }
  ```

---

### 4.8. Sequence Type Management API (`/api/v1/sequence-types`)

#### 1. Get All Sequence Types
- **URL:** `/api/v1/sequence-types`
- **Method:** `GET`
- **Auth Required:** Yes
- **Success Response:** `200 OK`
  ```json
  [
    {
      "id": "64d2f6fae4b0e445566778bb",
      "name": "DNA Whole Genome",
      "description": "High coverage whole genome sequencing data."
    }
  ]
  ```

#### 2. Create Sequence Type
- **URL:** `/api/v1/sequence-types`
- **Method:** `POST`
- **Auth Required:** Yes
- **Request Body:**
  ```json
  {
    "name": "RNA-Seq",
    "description": "Transcriptomic gene expression sequencing."
  }
  ```
- **Success Response:** `201 Created`

#### 3. Update Sequence Type
- **URL:** `/api/v1/sequence-types/{id}`
- **Method:** `PUT`
- **Auth Required:** Yes
- **Success Response:** `200 OK`

#### 4. Delete Sequence Type
- **URL:** `/api/v1/sequence-types/{id}`
- **Method:** `DELETE`
- **Auth Required:** Yes
- **Success Response:** `204 No Content`

---

### 4.9. Storage Location Management API (`/api/v1/storage-locations`)

#### 1. Create Storage Location
- **URL:** `/api/v1/storage-locations`
- **Method:** `POST`
- **Auth Required:** Yes
- **Request Body:**
  ```json
  {
    "storageId": "LOC-001",
    "building": "Bio-Tech Tower A",
    "laboratory": "Lab 402",
    "freezerNumber": "-80C Ultra-Freezer 01",
    "shelf": "Shelf 2",
    "box": "Box B4"
  }
  ```
- **Success Response:** `200 OK`
  ```json
  {
    "id": "64d2f81ce4b0g667788990dd",
    "storageId": "LOC-001",
    "building": "Bio-Tech Tower A",
    "laboratory": "Lab 402",
    "freezerNumber": "-80C Ultra-Freezer 01",
    "shelf": "Shelf 2",
    "box": "Box B4"
  }
  ```

#### 2. Get All Storage Locations
- **URL:** `/api/v1/storage-locations`
- **Method:** `GET`
- **Auth Required:** Yes
- **Success Response:** `200 OK`

#### 3. Get Storage Location by ID
- **URL:** `/api/v1/storage-locations/{id}`
- **Method:** `GET`
- **Auth Required:** Yes
- **Success Response:** `200 OK`

#### 4. Update Storage Location
- **URL:** `/api/v1/storage-locations/{id}`
- **Method:** `PUT`
- **Auth Required:** Yes
- **Success Response:** `200 OK`

#### 5. Delete Storage Location
- **URL:** `/api/v1/storage-locations/{id}`
- **Method:** `DELETE`
- **Auth Required:** Yes
- **Success Response:** `200 OK`
