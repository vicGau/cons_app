FROM node:12.16.1-alpine as development

WORKDIR /usr/src/app

# Copy files to install dependencies
COPY package*.json  ./

# Copy api source files
COPY . .

# Install development dependencies and build application (dev dependencies can be cached in this stage)
RUN apk --no-cache --virtual build-dependencies add --update python3 make g++ \
    && npm i \
    && npm run build --include-dependencies \
    && npm cache clean -f \
    && apk del build-dependencies

FROM node:12.16.1-alpine as production

WORKDIR /usr/src/app

# Copy files to install dependencies
COPY package*.json ./

COPY . .

# Install just production dependencies
RUN npm i --only=production && npm cache clean -f

# Use cached development dependencies
COPY --from=development /usr/src/app/dist ./dist

USER node

CMD ["node", "dist/src/main"]
