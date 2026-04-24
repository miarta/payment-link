FROM node:20-alpine

# create dir
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

# build dependencies
COPY ./package*.json ./
USER node
RUN npm install

# copy in source code
COPY --chown=node:node ./ ./

# port
EXPOSE 3000

# start server
CMD [ "npm", "run", "prod" ]
