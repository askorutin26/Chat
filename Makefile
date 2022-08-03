install:
	npm ci
start-server:
	npm run start
start-frontend:
	make -C chat start
start:
	make start-server & make start-frontend
