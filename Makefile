IMAGE = trivip002/admin-ui
TAG   = latest

build:
	npm install && npm run build

docker-build:
	docker buildx build --platform linux/amd64 \
	  -t $(IMAGE):$(TAG) --load .

docker-run:
	docker run --rm -p 8888:80 $(IMAGE):$(TAG)

docker-push:
	docker buildx build --platform linux/amd64 \
	  -t $(IMAGE):$(TAG) --push .

deploy:
	scp -r dist/ root@61.14.234.12:2018:/var/www/hughhuynh97.com/

release: build deploy
