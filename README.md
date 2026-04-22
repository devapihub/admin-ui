# Build image
````
docker buildx build \
  --platform linux/amd64 \
  -t trivip002/admin-ui:1.0.2 \
  -t trivip002/admin-ui:latest \
  --push .