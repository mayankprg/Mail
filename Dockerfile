FROM python:3.10.6
WORKDIR /django
COPY . .
RUN pip install -r requirements.txt

