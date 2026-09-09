FROM python:3.12-slim

WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .

ENV SECRET_KEY=build-time-only
ENV DEBUG=False
ENV USE_SQLITE=True
ENV ALLOWED_HOSTS=*
RUN python manage.py collectstatic --noinput

EXPOSE 8000
CMD python manage.py migrate --noinput && gunicorn config.wsgi --bind 0.0.0.0:${PORT:-8000}
