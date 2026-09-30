# ADR-001: Service Boundaries

## Status

Accepted

## Decision

OpsFlow AI will use separate services for the web application, core business operations, customers, orders, AI capabilities, notifications, auditing, and MCP tool access.

## Why

The boundaries represent different ownership and scaling concerns:

- Core owns transactional business rules.
- AI owns LLM and retrieval concerns.
- Customer Service owns customer data.
- Order Service owns order data.
- Notification Service owns notification delivery.
- Audit consumers process events independently.

## Alternatives considered

### Single monolith

A monolith would be faster initially, but it would mix transactional business logic, AI provider code, background processing, and notification concerns.

### Many small services

Creating a service for every small domain would add unnecessary network calls, operational overhead, and debugging complexity.

## Consequences

- Clear ownership boundaries.
- Independent scaling options.
- More deployment and integration complexity.
- Need for explicit APIs and event contracts.