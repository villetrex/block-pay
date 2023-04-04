FROM node:16

#add turborepo
RUN yarn global add turbo

ENV NODE_ENV production

# Set working directory
WORKDIR /app

# Copy app dependencies
COPY  ["../../yarn.lock", "./package.json", "./"]

# Copy source files
COPY . .
# Install app dependencies
RUN yarn install
# Build app artifacts
RUN yarn run build:backend

EXPOSE 3000

WORKDIR /apps/backend

CMD ["yarn", "start"]
