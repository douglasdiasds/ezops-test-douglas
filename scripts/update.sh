docker pull diasdasilvadouglas/douglas-images
docker stop ezops
docker rm ezops
docker run -p 80:3000 --name ezops -d diasdasilvadouglas/douglas-images