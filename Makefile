VERSION = 0.1.0

clean:
	rm -rf ./dist

dist: clean
	npm run build

image: dist
	docker build . --no-cache --tag mrdxdy/nginx-file-browser:${VERSION}

publish: image
	docker push mrdxdy/nginx-file-browser:${VERSION}
