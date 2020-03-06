GOTO_LARA=cd laradock
EXEC_WS=docker-compose exec workspace
EXEC_AS_LARA=docker-compose exec -u laradock workspace

first-run:
	$(GOTO_LARA) && \
	cp env-example .env && \
	docker-compose up -d nginx postgres redis && \
	$(EXEC_WS) cp .env.example .env && \
	$(EXEC_WS) composer install && \
	$(EXEC_WS) php artisan key:generate && \
	$(EXEC_WS) php artisan jwt:secret && \
	$(EXEC_WS) php artisan storage:link && \
	$(EXEC_WS) php artisan migrate && \
	$(EXEC_WS) php artisan db:seed && \
	docker-compose stop

start:
	$(GOTO_LARA) && \
	docker-compose up nginx postgres redis

stop:
	$(GOTO_LARA) && \
	docker-compose stop && \
	docker container prune -f

bash:
	$(GOTO_LARA) && $(EXEC_AS_LARA) bash
