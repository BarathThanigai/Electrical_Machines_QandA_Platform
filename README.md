# AskVoltieAI

AskVoltieAI is a Django-based Q&A platform for electrical machines. Authenticated users can ask questions, receive AI-generated answers, and store exchanges in a MySQL database.

## Features

- User registration and login
- Authenticated question submission
- OpenAI ChatGPT integration for electrical machine answers
- Persistent question and answer history per user
- Responsive, AJAX-enhanced interface
- Sample seed data for 10 users and 10 Q&A entries

## Database Schema

The app uses the following table structure for electrical machine Q&A:

- `user` (ForeignKey to Django User)
- `question_text` (TextField)
- `answer_text` (TextField)
- `plugin_source` (CharField)
- `created_at` (DateTimeField)

This schema satisfies the requirement for 5 fields/columns in the Q&A table, plus the default Django `id` field.

## Setup

1. Clone the repository.
2. Create and activate a Python virtual environment:

```bash
python3 -m venv venv
source venv/bin/activate
```

3. Install requirements:

```bash
pip install -r requirements.txt
```

4. Copy environment variables:

```bash
cp .env.example .env
```

5. Edit `.env` and provide values for `SECRET_KEY`, `OPENAI_API_KEY`, and MySQL settings.

6. Create the MySQL database and user.

7. Run Django migrations:

```bash
python manage.py migrate
```

8. Seed sample users and Q&A entries:

```bash
python manage.py seed_data
```

9. Start the development server:

```bash
python manage.py runserver
```

## Environment Variables

Required values in `.env`:

- `SECRET_KEY`
- `DEBUG` (`True` or `False`)
- `ALLOWED_HOSTS` (comma-separated list)
- `MYSQL_DATABASE`
- `MYSQL_USER`
- `MYSQL_PASSWORD`
- `MYSQL_HOST`
- `MYSQL_PORT`
- `OPENAI_API_KEY`
- `OPENAI_MODEL` (optional, defaults to `gpt-3.5-turbo`)

## Running the App

Visit:

```bash
http://127.0.0.1:8000/
```

Seeded sample users are available as:

- `user1` through `user10`
- password: `password123`

## Ubuntu Deployment

Example Ubuntu deployment steps:

```bash
sudo apt update
sudo apt install python3-pip python3-venv mysql-server libmysqlclient-dev
sudo mysql -e "CREATE DATABASE electrical_qa_db; CREATE USER 'django_user'@'localhost' IDENTIFIED BY 'django123'; GRANT ALL PRIVILEGES ON electrical_qa_db.* TO 'django_user'@'localhost'; FLUSH PRIVILEGES;"
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# update .env with real values
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py runserver 0.0.0.0:8000
```

For production, use Gunicorn and Nginx as the WSGI server and reverse proxy.

## Notes

- ChatGPT integration is implemented through OpenAI chat completions.
- AJAX handles question submission and updates the chat history without reloading the page.
- The admin site registers the `QAEntry` model for review.

## Helpful Commands

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py seed_data
```
