установка Docker 
https://www.youtube.com/watch?v=2vwwwA4AEyk&t=103s

настройка db
https://www.youtube.com/watch?v=iBZrUpcqaIk

Запуск БД

Эта команда запустит нам контейнер PostgreSQL в фоновом 
(detached) режиме и присвоит ему имя habr-pg:


```
docker run --name habr-pg -e POSTGRES_PASSWORD=pgpwd4habr -d postgres
```