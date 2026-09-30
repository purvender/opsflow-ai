from fastapi import FastAPI

app = FastAPI(
    title="OpsFlow AI Service",
    version="0.1.0",
)


@app.get("/health")
def health() -> dict[str, str]:
    return {
        "service": "ai-service",
        "status": "UP",
    }
