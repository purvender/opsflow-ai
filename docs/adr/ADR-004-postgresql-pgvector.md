# ADR-004: PostgreSQL and pgvector

## Status

Accepted

## Decision

PostgreSQL will be the primary relational database, and pgvector will initially be used for vector retrieval in the AI Service.

## Why

- PostgreSQL supports transactional application data.
- pgvector allows vector search without adding another database.
- The team can operate fewer technologies initially.
- Metadata filters and relational data can remain close to embeddings.

## Alternatives considered

- Pinecone
- Qdrant
- Weaviate
- Elasticsearch

These may become appropriate at larger scale or for specialized search requirements.

## Consequences

- Simpler local development.
- Fewer operational components.
- Vector workloads share infrastructure with relational workloads.
- A dedicated vector database may be evaluated later if scale or performance requires it.