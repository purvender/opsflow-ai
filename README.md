# OpsFlow AI

OpsFlow AI is an AI-native enterprise operations platform built to demonstrate:

- Java and Spring Boot backend engineering
- Python and FastAPI AI integration
- Next.js and TypeScript frontend development
- PostgreSQL, Redis, and Kafka
- Microservice boundaries and database ownership
- RAG, agents, tool calling, and MCP
- Authorization and human approval
- Observability, evaluation, Docker, Kubernetes, and AWS architecture

## Current status

Day 1: Architecture and repository foundation

## Planned services

- web
- core-service
- customer-service
- order-service
- ai-service
- notification-service
- audit-consumer
- mcp-server

## Architecture principle

The AI layer may recommend or request actions, but the Core Service remains the authority for business rules, authorization, and state changes.