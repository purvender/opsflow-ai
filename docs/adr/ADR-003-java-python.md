# ADR-003: Java for Business Services and Python for AI

## Status

Accepted

## Decision

Java and Spring Boot will be used for transactional business services. Python and FastAPI will be used for AI orchestration, retrieval, and model integrations.

## Why Java

- Strong existing backend expertise.
- Mature Spring ecosystem.
- Strong transaction and security support.
- Excellent tooling for enterprise services.
- Good fit for long-running business systems.

## Why Python

- Strong LLM and machine-learning ecosystem.
- Fast experimentation.
- Broad provider and AI-library support.
- Good fit for ingestion, retrieval, and agent orchestration.

## Consequences

- Two language ecosystems must be maintained.
- APIs and contracts must be explicit.
- Observability must work consistently across both languages.