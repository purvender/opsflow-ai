# OpsFlow AI Engineering Rules

## Architecture

OpsFlow AI is an AI-native enterprise operations platform.

The main components are:

- Next.js frontend
- Java/Spring Boot Core Service
- Java/Spring Boot Customer Service
- Java/Spring Boot Order Service
- Python/FastAPI AI Service
- Notification Service
- Audit Consumer
- MCP Server
- PostgreSQL
- Redis
- Kafka
- S3-compatible object storage
- pgvector for AI retrieval

## Ownership rules

- Core Service owns tenants, users, requests, workflows, approvals, authorization, and outbox records.
- Customer Service owns customer data and customer database access.
- Order Service owns order data and order database access.
- AI Service owns conversations, documents, chunks, embeddings, and AI metadata.
- No service may directly access another service's database.
- AI agents must never directly access business databases.
- Business actions must pass through authorized APIs.
- High-risk AI actions require human approval.

## Implementation rules

- Add tests for new behavior.
- Preserve tenant isolation.
- Validate all external input.
- Use explicit transaction boundaries.
- Consider retries, timeouts, idempotency, and failure recovery.
- Do not introduce unnecessary dependencies.
- Do not modify unrelated files.
- Prefer clear, boring, maintainable code over clever code.

## End-of-day skill check

At the end of each day, answer: did today create a repeatable workflow (used 2+ times or needed again later)? If yes, create or update one skill under `.opencode/skills/<id>/SKILL.md`; if no, write nothing.