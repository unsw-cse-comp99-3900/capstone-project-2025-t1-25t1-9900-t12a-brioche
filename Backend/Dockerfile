FROM python:3.10-slim-buster
RUN apt-get update && apt-get install -y gcc g++ gfortran libopenblas-dev liblapack-dev default-libmysqlclient-dev pkg-config netcat
WORKDIR /app
COPY . /app
RUN pip install --upgrade pip setuptools wheel
RUN pip install --no-cache-dir -r requirements.txt
COPY wait_for_db.sh /wait_for_db.sh
RUN chmod +x /wait_for_db.sh
CMD ["sh", "/wait_for_db.sh"]
