# BioVault Backend API Sample Data & Complete Workflow Guide

This document contains realistic sample data for all BioVault backend REST endpoints, tailored to research contexts in **Sri Lanka**. It uses **Sri Lankan State/Government Universities** and local biological research domains (e.g. endemic species conservation, vector surveillance, and herbal genetics).

---

## 1. End-to-End Project Creation Workflow Example

This section demonstrates a complete real-world biological research workflow in BioVault, showing step-by-step how a Research Project, its Biological Samples, and their associated Genomic Sequences are created and linked together.

### Workflow Prerequisites & Context

Before creating the project, the following core entities are established in the system:

- **Institution:** `University of Colombo`
  - *ID:* `65f1a100e4b0111111111101`
- **Storage Location:** Central Bio-Repository - Ultra-Low Freezer 02
  - *ID:* `65f1a200e4b0222222222201`
  - *Public Storage ID:* `LOC-CMB-001`
  - *Location Details:* Genomics Building, Lab 304, -80°C Freezer 02, Shelf 03, Box A-12
- **Principal Researcher:** Dr. Gayani Samarasinghe
  - *ID:* `65f1a300e4b0333333333301`
  - *Email:* `g.samarasinghe@med.cmb.ac.lk`
- **Sequence Types:**
  - `Viral RNA-Seq` (*ID:* `65f1a400e4b0444444444401`)
  - `Mitochondrial DNA (mtDNA)` (*ID:* `65f1a400e4b0444444444402`)

---

### Step 1: Create the Research Project

- **HTTP Request:** `POST /api/v1/research_projects/save`
- **Payload:**
```json
{
  "title": "Genomic Surveillance of Dengue Virus Lineages in Western Province, Sri Lanka",
  "description": "Molecular characterization and genomic sequencing of DENV-2 and DENV-3 circulating strains isolated from clinical samples in Colombo and Gampaha districts.",
  "startDate": "2026-01-15",
  "endDate": "2026-12-31",
  "status": "ACTIVE",
  "principalResearcherId": "65f1a300e4b0333333333301"
}
```

- **Server Response:** `200 OK`
```json
{
  "id": "65f1a500e4b0555555555501",
  "title": "Genomic Surveillance of Dengue Virus Lineages in Western Province, Sri Lanka",
  "description": "Molecular characterization and genomic sequencing of DENV-2 and DENV-3 circulating strains isolated from clinical samples in Colombo and Gampaha districts.",
  "startDate": "2026-01-15",
  "endDate": "2026-12-31",
  "status": "ACTIVE",
  "principalResearcherId": "65f1a300e4b0333333333301"
}
```
> **Assigned Project ID:** `65f1a500e4b0555555555501`

---

### Step 2: Register Biological Samples under the Project

Three biological samples collected across Western Province are registered and stored at location `LOC-CMB-001` under Project `65f1a500e4b0555555555501`.

#### Sample 1: DENV-2 Patient Clinical Isolate (Colombo North)
- **HTTP Request:** `POST /api/v1/samples`
- **Payload:**
```json
{
  "species": "Dengue virus 2 (Homo sapiens host)",
  "sampleType": "Viral RNA Extract / Serum",
  "collectionDate": "2026-02-10",
  "storageLocation": "Genomics Lab 304, -80C Freezer 02, Shelf 3, Box A-12",
  "projectId": "65f1a500e4b0555555555501",
  "storageLocationId": "LOC-CMB-001"
}
```
- **Server Response:** `201 Created` (*Assigned Sample ID:* `65f1a601e4b0666666666601`)

#### Sample 2: DENV-3 Patient Clinical Isolate (Colombo South)
- **HTTP Request:** `POST /api/v1/samples`
- **Payload:**
```json
{
  "species": "Dengue virus 3 (Homo sapiens host)",
  "sampleType": "Viral RNA Extract / Serum",
  "collectionDate": "2026-02-18",
  "storageLocation": "Genomics Lab 304, -80C Freezer 02, Shelf 3, Box A-12",
  "projectId": "65f1a500e4b0555555555501",
  "storageLocationId": "LOC-CMB-001"
}
```
- **Server Response:** `201 Created` (*Assigned Sample ID:* `65f1a602e4b0666666666602`)

#### Sample 3: Mosquito Vector Tissue Isolate (Gampaha)
- **HTTP Request:** `POST /api/v1/samples`
- **Payload:**
```json
{
  "species": "Aedes aegypti (Vector Mosquito)",
  "sampleType": "Mosquito Pool Tissue Homogenate",
  "collectionDate": "2026-03-01",
  "storageLocation": "Genomics Lab 304, -80C Freezer 02, Shelf 3, Box A-12",
  "projectId": "65f1a500e4b0555555555501",
  "storageLocationId": "LOC-CMB-001"
}
```
- **Server Response:** `201 Created` (*Assigned Sample ID:* `65f1a603e4b0666666666603`)

---

### Step 3: Add Genomic Sequences for Each Sample

#### Sequences for Sample 1 (`65f1a601e4b0666666666601` - DENV-2 Isolate)

##### Sequence 1.1: Envelope (E) Gene Region
- **HTTP Request:** `POST /api/v1/sequence/save`
- **Payload:**
```json
{
  "name": "DENV-2 Envelope (E) Gene Region - Strain CMB-2026-01",
  "sequence": "ATGCGATGCGTAGCATGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGC",
  "seqLength": 50,
  "seqTypeId": "65f1a400e4b0444444444401",
  "sampleId": "65f1a601e4b0666666666601"
}
```
- **Server Response:** `200 OK` (*Sequence ID:* `65f1a701e4b0777777777701`)

##### Sequence 1.2: Non-Structural Protein 1 (NS1) Region
- **HTTP Request:** `POST /api/v1/sequence/save`
- **Payload:**
```json
{
  "name": "DENV-2 NS1 Polyprotein Region - Strain CMB-2026-01",
  "sequence": "CGTACGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCG",
  "seqLength": 50,
  "seqTypeId": "65f1a400e4b0444444444401",
  "sampleId": "65f1a601e4b0666666666601"
}
```
- **Server Response:** `200 OK` (*Sequence ID:* `65f1a702e4b0777777777702`)

---

#### Sequences for Sample 2 (`65f1a602e4b0666666666602` - DENV-3 Isolate)

##### Sequence 2.1: Envelope (E) Gene Sequence
- **HTTP Request:** `POST /api/v1/sequence/save`
- **Payload:**
```json
{
  "name": "DENV-3 Envelope (E) Gene - Strain CMB-2026-02",
  "sequence": "ATGAAACGGGCAACGGTTGCAAGGCTAACCGGTAGCTAGCTAGCTAGCTA",
  "seqLength": 50,
  "seqTypeId": "65f1a400e4b0444444444401",
  "sampleId": "65f1a602e4b0666666666602"
}
```
- **Server Response:** `200 OK` (*Sequence ID:* `65f1a703e4b0777777777703`)

##### Sequence 2.2: 5' Untranslated Region (5' UTR)
- **HTTP Request:** `POST /api/v1/sequence/save`
- **Payload:**
```json
{
  "name": "DENV-3 5' UTR Regulatory Loop - Strain CMB-2026-02",
  "sequence": "AGTTGTTAGTCTACGTGGACCGACAAGAACAGTTTCGAATCGATCGATCG",
  "seqLength": 50,
  "seqTypeId": "65f1a400e4b0444444444401",
  "sampleId": "65f1a602e4b0666666666602"
}
```
- **Server Response:** `200 OK` (*Sequence ID:* `65f1a704e4b0777777777704`)

---

#### Sequences for Sample 3 (`65f1a603e4b0666666666603` - Aedes aegypti Vector)

##### Sequence 3.1: Cytochrome c Oxidase Subunit I (COI) Barcode
- **HTTP Request:** `POST /api/v1/sequence/save`
- **Payload:**
```json
{
  "name": "Aedes aegypti COI Mitochondrial DNA Barcode - Vector GMP-01",
  "sequence": "AACATTATATTTTATTTTTGGAATTTGAGCAGGAATAATTGGAACATCCTTAAGC",
  "seqLength": 55,
  "seqTypeId": "65f1a400e4b0444444444402",
  "sampleId": "65f1a603e4b0666666666603"
}
```
- **Server Response:** `200 OK` (*Sequence ID:* `65f1a705e4b0777777777705`)

##### Sequence 3.2: Voltage-Gated Sodium Channel (kdr Mutation Locus)
- **HTTP Request:** `POST /api/v1/sequence/save`
- **Payload:**
```json
{
  "name": "Aedes aegypti kdr Insecticide Resistance Locus - Vector GMP-01",
  "sequence": "ATGGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATC",
  "seqLength": 51,
  "seqTypeId": "65f1a400e4b0444444444402",
  "sampleId": "65f1a603e4b0666666666603"
}
```
- **Server Response:** `200 OK` (*Sequence ID:* `65f1a706e4b0777777777706`)

---

## 2. Complete Endpoint Sample Data Collections

Below is a reference of sample data for every individual backend endpoint in BioVault, featuring Sri Lankan research institutions and localized biological research.

---

### 2.1. Authentication API (`/api/v1/auth`)

#### `POST /api/v1/auth/register` (Public User Registration)

**Sample Request 1 (University of Colombo Researcher):**
```json
{
  "name": "Dr. Gayani Samarasinghe",
  "email": "g.samarasinghe@med.cmb.ac.lk",
  "password": "gayani123",
  "institution": "University of Colombo",
  "designation": "Senior Lecturer in Molecular Biology"
}
```

**Sample Response 1 (`201 Created`):**
```json
{
  "id": "65f1a300e4b0333333333301",
  "name": "Dr. Gayani Samarasinghe",
  "email": "g.samarasinghe@med.cmb.ac.lk",
  "role": "RESEARCHER",
  "institution": "University of Colombo",
  "designation": "Senior Lecturer"
}
```

**Sample Request 2 (University of Peradeniya Admin):**
```json
{
  "name": "Prof. Nimal Wickramasinghe",
  "email": "nimal.w@pdn.ac.lk",
  "password": "nimal123",
  "institution": "University of Peradeniya",
  "designation": "Professor"
}
```

---

#### `GET /api/v1/auth/me` (Current User Profile)

**Sample Response (`200 OK`):**
```json
{
  "id": "65f1a300e4b0333333333301",
  "name": "Dr. Gayani Samarasinghe",
  "email": "g.samarasinghe@med.cmb.ac.lk",
  "role": "RESEARCHER",
  "institution": "University of Colombo",
  "designation": "Senior Lecturer in Molecular Biology"
}
```

---

### 2.2. Institution Management API (`/api/v1/institutions`)

#### `POST /api/v1/institutions` (Create Institution - Admin Only)

**Sample Payload 1 (University of Colombo):**
```json
{
  "name": "University of Colombo",
  "country": "Sri Lanka",
  "address": "Kynsey Road, Colombo 00800, Sri Lanka",
  "contactInformation": "info@med.cmb.ac.lk | +94 11 269 5300"
}
```

**Sample Payload 2 (University of Peradeniya):**
```json
{
  "name": "University of Peradeniya",
  "country": "Sri Lanka",
  "address": "Peradeniya 20400, Central Province, Sri Lanka",
  "contactInformation": "dean-science@pdn.ac.lk | +94 81 239 4400"
}
```

**Sample Payload 3 (University of Sri Jayewardenepura):**
```json
{
  "name": "University of Sri Jayewardenepura",
  "country": "Sri Lanka",
  "address": "Gangodawila, Nugegoda 10250, Sri Lanka",
  "contactInformation": "cdr@sjp.ac.lk | +94 11 280 1025"
}
```

**Sample Payload 4 (University of Kelaniya):**
```json
{
  "name": "University of Kelaniya",
  "country": "Sri Lanka",
  "address": "Dalugama, Kelaniya 11600, Sri Lanka",
  "contactInformation": "zoology@kln.ac.lk | +94 11 290 3200"
}
```

#### `GET /api/v1/institutions` (List All Institutions)

**Sample Response (`200 OK`):**
```json
[
  {
    "id": "65f1a100e4b0111111111101",
    "name": "University of Colombo",
    "country": "Sri Lanka",
    "address": "Kynsey Road, Colombo 00800, Sri Lanka",
    "contactInformation": "info@med.cmb.ac.lk | +94 11 269 5300"
  },
  {
    "id": "65f1a100e4b0111111111102",
    "name": "University of Peradeniya",
    "country": "Sri Lanka",
    "address": "Peradeniya 20400, Central Province, Sri Lanka",
    "contactInformation": "dean-science@pdn.ac.lk | +94 81 239 4400"
  },
  {
    "id": "65f1a100e4b0111111111103",
    "name": "University of Sri Jayewardenepura",
    "country": "Sri Lanka",
    "address": "Gangodawila, Nugegoda 10250, Sri Lanka",
    "contactInformation": "cdr@sjp.ac.lk | +94 11 280 1025"
  }
]
```

---

### 2.3. Storage Location API (`/api/v1/storage-locations`)

#### `POST /api/v1/storage-locations` (Create Storage Location)

**Sample Payload 1 (University of Colombo Bio-Repository):**
```json
{
  "storageId": "LOC-CMB-001",
  "building": "Genomics & Molecular Medicine Building",
  "laboratory": "Central Bio-Repository Lab 304",
  "freezerNumber": "ULF-80C02",
  "shelf": "Shelf 03",
  "box": "Box A-12"
}
```

**Sample Payload 2 (University of Peradeniya Plant Genetics Lab):**
```json
{
  "storageId": "LOC-PDN-002",
  "building": "Biological Sciences Building Block B",
  "laboratory": "Plant Molecular Genetics Lab 102",
  "freezerNumber": "DPF-20C03",
  "shelf": "Shelf 01",
  "box": "Box Herb-04"
}
```

**Sample Payload 3 (University of Sri Jayewardenepura Viral Vault):**
```json
{
  "storageId": "LOC-SJP-003",
  "building": "Dengue Research Complex",
  "laboratory": "Level 2 Containment Lab",
  "freezerNumber": "LNCT-01",
  "shelf": "Rack 04",
  "box": "Box Cryo-88"
}
```

---

### 2.4. Researcher Directory API (`/api/v1/researchers`)

#### `POST /api/v1/researchers` (Create Researcher - Admin Only)

**Sample Payload 1:**
```json
{
  "name": "Dr. Kithsiri Perera",
  "email": "kithsiri.perera@pdn.ac.lk",
  "institution": "University of Peradeniya",
  "designation": "Senior Research Fellow"
}
```

**Sample Payload 2:**
```json
{
  "name": "Dr. Chandima Jeewandara",
  "email": "chandima@sjp.ac.lk",
  "institution": "University of Sri Jayewardenepura",
  "designation": "Director & Professor in Immunology"
}
```

**Sample Payload 3:**
```json
{
  "name": "Dr. Priyangi Hasintha",
  "email": "priyangi.h@kln.ac.lk",
  "institution": "University of Kelaniya",
  "designation": "Senior Lecturer in Conservation Genetics"
}
```

---

### 2.5. Research Project Management API (`/api/v1/research_projects`)

#### `POST /api/v1/research_projects/save` (Create Research Project)

**Sample Project 1 (Conservation Genetics of Sri Lankan Elephant):**
```json
{
  "title": "Mitochondrial Phylogeography of Sri Lankan Elephant (Elephas maximus maximus)",
  "description": "Assessing genetic diversity and population structure across Wasgamuwa and Yala National Parks using non-invasive dung DNA sampling.",
  "startDate": "2026-02-01",
  "endDate": "2027-01-31",
  "status": "ACTIVE",
  "principalResearcherId": "65f1a300e4b0333333333302"
}
```

**Sample Project 2 (Herbal Plant Genomics - Kothala Himbutu):**
```json
{
  "title": "Barcoding and Metabolomic Pathway Identification in Salacia reticulata (Kothala Himbutu)",
  "description": "DNA barcoding of wild and cultivated Salacia reticulata specimens in Sinharaja Forest Reserve to identify antidiabetic biosynthesis gene clusters.",
  "startDate": "2026-03-15",
  "endDate": "2026-11-30",
  "status": "PLANNING",
  "principalResearcherId": "65f1a300e4b0333333333303"
}
```

---

### 2.6. Sample Management API (`/api/v1/samples`)

#### `POST /api/v1/samples` (Create Biological Sample)

**Sample 1 (Elephant Non-Invasive Dung Sample):**
```json
{
  "species": "Elephas maximus maximus (Sri Lankan Elephant)",
  "sampleType": "Fecal Epithelial DNA Extract",
  "collectionDate": "2026-02-14",
  "storageLocation": "Peradeniya Genetics Lab, -20C Freezer 01, Shelf 01, Box Herb-04",
  "projectId": "65f1a500e4b0555555555502",
  "storageLocationId": "LOC-PDN-002"
}
```

**Sample 2 (Endemic Medicinal Plant Leaf Tissue):**
```json
{
  "species": "Salacia reticulata (Kothala Himbutu)",
  "sampleType": "Lyophilized Leaf Powder DNA Extract",
  "collectionDate": "2026-03-20",
  "storageLocation": "Peradeniya Genetics Lab, -20C Freezer 01, Shelf 01, Box Herb-04",
  "projectId": "65f1a500e4b0555555555503",
  "storageLocationId": "LOC-PDN-002"
}
```

**Sample 3 (Sri Lankan Leopard Tissue Sample):**
```json
{
  "species": "Panthera pardus kotiya (Sri Lankan Leopard)",
  "sampleType": "Hair Follicle DNA Extract",
  "collectionDate": "2026-01-28",
  "storageLocation": "Genomics Lab 304, -80C Freezer 02, Shelf 3, Box A-12",
  "projectId": "65f1a500e4b0555555555502",
  "storageLocationId": "LOC-CMB-001"
}
```

---

### 2.7. Sequence Type Management API (`/api/v1/sequence-types`)

#### `POST /api/v1/sequence-types` (Create Sequence Type)

**Sample 1:**
```json
{
  "name": "Mitochondrial DNA (mtDNA)",
  "description": "Mitochondrial barcode markers (e.g., D-loop, COI, CytB) for population genetics and phylogeography."
}
```

**Sample 2:**
```json
{
  "name": "Viral RNA-Seq",
  "description": "Whole genome or targeted polyprotein RNA sequencing for viral pathogen surveillance."
}
```

**Sample 3:**
```json
{
  "name": "Chloroplast DNA (cpDNA) Barcode",
  "description": "Plastid locus markers (rbcL, matK, trnL-trnF) used for plant species identification."
}
```

---

### 2.8. Genomic Sequence API (`/api/v1/sequence`)

#### `POST /api/v1/sequence/save` (Save Genomic Sequence)

**Sample 1 (Elephant D-Loop Sequence):**
```json
{
  "name": "Elephas maximus Control Region (D-loop) Haplotype E1",
  "sequence": "GGTCTTGTAAACCAAAAATGAAGACTTGCTAGTCAATACACCCAAACACTT",
  "seqLength": 51,
  "seqTypeId": "65f1a400e4b0444444444402",
  "sampleId": "65f1a600e4b0666666666610"
}
```

**Sample 2 (Kothala Himbutu rbcL Plastid Barcode):**
```json
{
  "name": "Salacia reticulata rbcL Gene Partial Sequence",
  "sequence": "ATGTCACCACAAACAGAGACTAAAGCAAGTGTTGGATTCAAAGCTGGTGTTAAAGAGTACAAATTGACTTATTATACTC",
  "seqLength": 79,
  "seqTypeId": "65f1a400e4b0444444444403",
  "sampleId": "65f1a600e4b0666666666611"
}
```

#### `POST /api/v1/sequence/calclength` (Calculate Sequence Length Utility)

**Sample Request:**
```json
{
  "sequence": "ATGTCACCACAAACAGAGACTAAAGCAAGTGTTGGATTCAAAGCTGGTGTTAAAGAGTACAAATTGACTTATTATACTC",
  "seqLength": null
}
```

**Sample Response (`200 OK`):**
```json
{
  "seqLength": 79
}
```
