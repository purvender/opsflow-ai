# ADR-002: Database Ownership

## Status

Accepted

## Decision

Every service owns its data and is the only service allowed to access its database directly.

## Rules

- Core accesses Core DB.
- Customer Service accesses Customer DB.
- Order Service accesses Order DB.
- AI Service accesses AI DB.
- Other services use APIs or events.

## Why

Database ownership prevents hidden coupling and allows services to evolve independently.

It also makes authorization and responsibility clearer.

## Consequences

- No cross-service SQL joins.
- Some views require API calls or event-driven projections.
- Distributed workflows require retries, idempotency, and eventual consistency.