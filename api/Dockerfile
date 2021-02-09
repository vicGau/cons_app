FROM node:12.16.1-alpine as development

WORKDIR /usr/src/app

# Copy files to install dependencies
COPY package.json package-lock.json  ./

# Install development dependencies and build application (dev dependencies can be cached in this stage)
RUN npm ci \
    && npm run build \
    && npm cache clean -f

# Copy api source files
COPY . .

FROM node:12.16.1-alpine as production

WORKDIR /usr/src/app

# Copy files to install dependencies
COPY package.json package-lock.json ./

# Copy api source files
COPY . .

# Install just production dependencies
RUN npm i --only=production && npm cache clean -f

# Use cached development dependencies
COPY --from=development /usr/src/app/dist ./dist

USER node

CMD ["node", "dist/src/main"]
