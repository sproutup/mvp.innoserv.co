environment_name = develop
platform = docker
application_name = www
region = us-west-2
keypair = endurance
configuration = www
domain = sproutup-co
repo = sproutupco


all: install
	PORT=3002 nodemon bin/www

install:
	npm install

master:
	$(eval environment_name := master)

develop:
	$(eval environment_name := develop)

build:
	docker build -t $(repo)/$(application_name):$(environment_name) .

push: build
	docker push $(repo)/$(application_name):$(environment_name)

deploy: push
	$(MAKE) -C target $(environment_name) deploy

create: push
	$(MAKE) -C target $(environment_name) create

terminate:
	$(MAKE) -C target $(environment_name) terminate

rebuild: stop delete build run

stop:
	docker stop $(application_name)

restart: stop start

start:
	docker start $(application_name)

run:
	docker run -p 9000:9000 -it --rm $(repo)/$(application_name):$(environment_name) /bin/sh

delete: init
	docker rm $(application_name)
