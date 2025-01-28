# Rakkaranta

## Team Members

- **Ye Thu Hlaing**: Project Manager  
- **Ahanaf Adil**: Frontend Developer  
- **Dianzhong Wang**: Embedded Engineer  
- **Qian Wang**: Scram master

---

## Project Scope and Goals

![WhatsApp Image 2025-01-28 at 12 58 22 PM](https://github.com/user-attachments/assets/a0099819-12c4-43d8-a95a-ed5e5f876c8f)

- **Objective**: Develop a secure IoT system for environmental monitoring.  
- **Deliverables**:  
  - Functional sensor network.  
  - Data analysis dashboard.  
  - Security protocol implementation.  

---

### Data Pipeline

- MQTT Server: Central message broker
- Telegraf: Data collection and transmission agent
- InfluxDB: Time-series database for real-time data storage
- Supabase: Authentication and User data storage

### Backend
- Node.js powered server
- Handles data processing and WebSocket communication
- Interfaces with multiple data sources

### Frontend
- Next.js React application
- Real-time data visualization
- 3D BIM model interaction

### Cloud Infrastructure & DevOps
- Azure, AWS
- Github Actions

## Architecture
This modern architecture integrates IoT data collection with real-time 3D visualization for building management. At its core, MQTT enables seamless device communication, while Telegraf collects and forwards sensor data to InfluxDB for time-series storage. The Node.js backend processes this data and maintains WebSocket connections for real-time updates to the Next.js frontend, where users interact with 3D BIM models and visualize live sensor data. User authentication and management are handled through Supabase. The infrastructure leverages containerization with Docker. For further implementation, orchestration tool Kubernetes will be accompanied with GitOps principles for deployment through GitHub Actions and ArgoCD. Infrastructure as Code will be implemented using Terraform and Ansible, with monitoring handled by Grafana. The system spans multiple cloud providers (Azure and AWS) to ensure reliability and scalability.

## Milestones and Deadlines

- **Milestone 1**: Project Plan Finalized   
- **Milestone 2**: Preliminary Research Completed 
- **Milestone 3**: Prototype Development
- **Milestone 4**: Production implementation 
- **Milestone 5**: Final Delivery 

---

## Roles and Responsibilities

- **Project Manager**: Oversees project plan, integrate system desgin, and ensures deadlines are met.  
- **Frontend Developer**: Implements the core system design and integrates UI Dashboard.  
- **Embedded Engineer**: Conducts research on sensor technologies, security protocols and implementation.  
- **Scram master**: Make a smoother streamline for the product development.  

---

## Communication Tools

- **WhatApps**: For day-to-day communication.  
- **Telegram**: For meetings and file sharing.  
- **GitHub**: For version control and collaboration.  

---

## Preliminary Research

- **Sensor Technologies**: Researched humidity, temeprature and Distance sensors for warehoues monitoring.  
- **Data Analysis Methods**: Explored machine learning algorithms for data interpretation.  
- **Security Protocols**: Investigated AES encryption for secure data transmission.  

---

## Project Documentation

- **Project Plan**: Documented in the `docs/project_plan.md` file.  
- **Requirements**: Stored in the `docs/requirements.md` file.  
- **Research Findings**: Recorded in the `docs/research.md` file.
  
---
