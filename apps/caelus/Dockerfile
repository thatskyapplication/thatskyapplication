FROM debian:bullseye as builder

ARG NODE_VERSION=18.8.0

RUN apt-get update; apt install -y curl
RUN curl https://get.volta.sh | bash
ENV VOLTA_HOME /root/.volta
ENV PATH /root/.volta/bin:$PATH
RUN volta install node@${NODE_VERSION}
RUN volta install yarn

#######################################################################

RUN mkdir /caelus
WORKDIR /caelus

COPY . .

RUN yarn
RUN yarn run build
FROM debian:bullseye

COPY --from=builder /root/.volta /root/.volta
COPY --from=builder /caelus /caelus

WORKDIR /caelus
ENV NODE_ENV production
ENV PATH /root/.volta/bin:$PATH

CMD [ "yarn", "run", "start" ]
