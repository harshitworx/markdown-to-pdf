# Backend Dockerfile using Playwright base image (includes browsers)
FROM mcr.microsoft.com/playwright/python:v1.54.0-jammy

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    UV_SYSTEM_PYTHON=1

WORKDIR /app

# Install uv
RUN curl -LsSf https://astral.sh/uv/install.sh | sh
ENV PATH="/root/.local/bin:${PATH}"

# Copy project files necessary for dependency resolution first (for better caching)
COPY pyproject.toml uv.lock ./

# Sync Python dependencies via uv (creates .venv)
RUN uv sync --frozen

# Copy backend source
COPY backend ./backend

EXPOSE 8000

CMD ["uv", "run", "uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]


