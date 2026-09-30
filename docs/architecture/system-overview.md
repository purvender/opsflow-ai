# OpsFlow AI System Overview

## Purpose

OpsFlow AI is an AI-native enterprise operations platform.

It allows users to create and manage operational requests, route them through approval workflows, search organizational documents, and use an AI assistant to inspect information or propose controlled business actions.

## High-level architecture

```text
Browser
    |
    v
Internet
    |
    v
NGINX
    |
    +--> Next.js Web Application
             |
             +--> Core Service
             |       |
             |       +--> Core PostgreSQL
             |       +--> Core Redis
             |       +--> Kafka
             |       +--> Customer Service
             |       +--> Order Service
             |       +--> AI Service
             |
             +--> SSE stream for AI responses
```

## Service responsibilities

### Web Application

The Next.js application provides:

- user interface
- navigation
- forms
- request management screens
- AI assistant interface
- approval interface
- notification interface

### Core Service

The Core Service owns:

- tenants
- users
- authentication context
- authorization
- requests
- workflows
- approvals
- business rules
- outbox events

### AI Service

The AI Service owns:

- conversations
- messages
- documents
- document chunks
- embeddings
- vector retrieval
- LLM provider integrations
- agents
- tool execution orchestration
- AI evaluation metadata

### Customer Service

The Customer Service owns:

- customers
- customer profiles
- customer addresses
- customer database access

### Order Service

The Order Service owns:

- orders
- order items
- order status
- order database access

## Communication styles

### Synchronous communication

Use REST when the caller needs an immediate response.

Examples:

- Core requests customer information.
- Core creates an order.
- Core sends a chat request to AI Service.

### Asynchronous communication

Use Kafka when work can happen later or when multiple consumers need to react.

Examples:

- request submitted
- request approved
- order created
- document uploaded

### SSE

Use Server-Sent Events for streaming AI responses from the backend to the browser.

### WebSockets

Use WebSockets for bidirectional real-time application events such as notifications.

## Request flow

```text
Browser
    |
    v
Next.js
    |
    v
Core Service
    |
    +--> authorization
    +--> business logic
    +--> Core PostgreSQL
    +--> response
```

## AI question flow

```text
Browser
    |
    v
Next.js
    |
    v
Core Service
    |
    v
AI Service
    |
    +--> retrieval
    +--> LLM
    +--> response stream
    |
    v
Core Service
    |
    v
SSE
    |
    v
Browser
```

## Controlled agent action flow

```text
Browser
    |
    v
Next.js
    |
    v
Core Service
    |
    v
AI Service
    |
    v
Agent
    |
    v
MCP Client
    |
    v
MCP Server
    |
    v
Core API
    |
    +--> authorization
    +--> business logic
    +--> Core PostgreSQL
    +--> outbox event
```

The AI agent never directly accesses business databases.

## Security boundaries

- PostgreSQL, Redis, Kafka, and internal services remain private.
- The browser does not directly connect to databases.
- Each service owns its own database.
- Tenant authorization is enforced by the Core Service.
- AI tools call APIs rather than databases.
- High-risk actions require human approval.




flowchart TD
    Browser[Browser] --> Internet[Internet]
    Internet --> Nginx[NGINX]
    Nginx --> Frontend["Next.js Frontend"]
    Frontend -->|"HTTP requests / SSE stream"| Core["Core Service<br/>Java + Spring Boot"]

    Core -->|"Own application data"| CoreDB[("Core DB<br/>PostgreSQL")]
    Core -->|"Own cache; e.g. Redis"| CoreRedis[("Core Redis")]
    Core -->|"Publish events"| Kafka[Kafka]
    Core -->|"HTTP request / streaming response"| AI["AI Service<br/>Python + FastAPI"]

    Core -->|"Customer API"| Customer["Customer Service<br/>Spring Boot"]
    Customer -->|"Only Customer Service accesses"| CustomerDB[("Customer DB<br/>PostgreSQL")]

    Core -->|"Order API"| Order["Order Service<br/>Spring Boot"]
    Order -->|"Only Order Service accesses"| OrderDB[("Order DB<br/>PostgreSQL")]
    Order -->|"Publish order events"| Kafka

    Kafka --> Notification["Notification Service"]
    Kafka --> Audit["Audit / Event Consumer"]
    Notification -->|"Only Notification Service accesses"| NotificationDB[("Notification DB")]
    Audit -->|"Only Audit Service accesses"| AuditDB[("Audit DB")]
    Notification --> Notifications[Notifications]

    AI -->|"Own AI data"| AIDB[("AI DB<br/>PostgreSQL + pgvector")]
    AI --> LLM[LLM integration]
    LLM --> Providers["OpenAI / Anthropic / Gemini"]

    AI --> RAG[RAG pipeline]
    RAG -->|"Vector search"| AIDB
    RAG -->|"Document storage"| S3["S3 bucket<br/>AI-owned documents"]

    AI --> Agent[Agent]
    Agent --> MCPClient[MCP Client]
    MCPClient --> MCP["MCP Server"]
    MCP -->|"Controlled tool calls"| CoreAPI["Core API"]
    CoreAPI --> Core

    Core --> Authorization[Authorization]
    Authorization --> BusinessLogic[Business logic]
    BusinessLogic --> CoreDB
    BusinessLogic --> Outbox["Outbox<br/>in Core DB"]
    Outbox -->|"Publish committed events"| Kafka

    Core --> DocumentAPI["Document API<br/>within Core Service"]
    DocumentAPI -->|"Upload document"| S3
    DocumentAPI -->|"Publish document-uploaded event"| Kafka
    Kafka -->|"Document-uploaded event"| Ingestion["AI ingestion worker"]
    Ingestion --> Parse[Parse]
    Parse --> Clean[Clean]
    Clean --> Chunk[Chunk]
    Chunk --> Embedding[Embedding]
    Embedding -->|"Store vectors"| AIDB
    AIDB -->|"Indexed document available"| RAG