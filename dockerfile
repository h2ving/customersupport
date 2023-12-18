# Step 1: Use an official Node runtime as a parent image
FROM node:14

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Step 4: Install project dependencies
RUN npm install

# Step 5: Bundle the app's source code inside the Docker image
COPY . .

# Step 6: Your app binds to port 3000, so use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 80 443

# Step 7: Define the command to run the app
CMD [ "node", "server.js" ]
