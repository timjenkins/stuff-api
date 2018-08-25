FROM node:8

# Create app directory
RUN mkdir -p /srv/app/stuff-api
WORKDIR /srv/app/stuff-api

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /srv/app/stuff-api/

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . /srv/app/stuff-api

EXPOSE 8080
CMD [ "npm", "start" ]
