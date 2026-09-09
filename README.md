# AUqMIA Pet

Site da AUqMIA Pet — banho e tosa em Auriflama/SP.

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Na Vercel, use a pasta `frontend` como **Root Directory**.

Crie as variáveis:

- `VITE_WHATSAPP_NUMBER` — exemplo: `5517991667925`
- `VITE_API_URL` — URL da API, se o backend estiver no ar

## Backend

Local:

```bash
cd backend
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 8000
```

Produção: Railway, pasta `backend`, com PostgreSQL. A Vercel fica só com o frontend.
