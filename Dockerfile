FROM node:slim
WORKDIR /
COPY . /
RUN npm install
EXPOSE 5175
CMD npm run dev