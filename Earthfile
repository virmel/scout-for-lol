VERSION 0.8
FROM ubuntu:jammy

lock:
  BUILD ./packages/backend+lock
  BUILD ./packages/report+lock
  BUILD ./packages/data+lock

ci:
  ARG EARTHLY_CI
  ARG EARTHLY_GIT_SHORT_HASH
  ARG git_sha=$EARTHLY_GIT_SHORT_HASH
  ARG --required version

  BUILD +check
  WAIT
    BUILD +build
  END
  BUILD +deploy --stage=beta --version=$version

build:
  ARG EARTHLY_GIT_SHORT_HASH
  ARG git_sha=$EARTHLY_GIT_SHORT_HASH
  ARG --required version

  BUILD ./packages/backend+image --version=$version --git_sha=$git_sha
  BUILD ./packages/report+dnt.build --version=$version

check:
  BUILD ./packages/backend+check
  BUILD ./packages/report+check
  BUILD ./packages/data+check
  BUILD +pre-commit

deno:
  FROM denoland/deno
  WORKDIR /workspace

deno-node:
  ARG NODE_MAJOR=22
  FROM +deno
  RUN apt update
  RUN apt install -y ca-certificates curl gnupg
  RUN mkdir -p /etc/apt/keyrings
  RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
  RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
  RUN apt update
  RUN apt install nodejs -y
  RUN npm install -g npm

prepare:
  FROM +deps
  COPY packages packages

gh:
  ARG gh_version=2.63.2
  ARG TARGETARCH
  FROM ubuntu:noble
  RUN apt update && apt install -y git curl
  RUN curl -L -o ghcli.deb https://github.com/cli/cli/releases/download/v$gh_version/gh_$gh_version\_linux_$TARGETARCH.deb
  RUN dpkg -i ghcli.deb
  RUN rm ghcli.deb
  RUN git config --global user.name 'scout-for-lol'
  RUN git config --global user.email 'github@sjer.red'

deploy:
  ARG --required stage
  ARG --required version
  FROM +gh
  WORKDIR /workspace
  # clone repo
  GIT CLONE --branch=main https://github.com/shepherdjerred/homelab .
  ARG git_hash=$(git rev-parse HEAD)
  RUN git remote set-url origin https://github.com/shepherdjerred/homelab
  RUN git fetch --depth=2
  RUN git checkout main
  # make the edit
  RUN sed -i "s/\"shepherdjerred\/scout-for-lol\/beta\": \".*\"/\"shepherdjerred\/scout-for-lol\/beta\": \"$version\"/" cdk8s/src/versions.ts
  # make the PR
  RUN git add .
  RUN git checkout -b scout/$version
  RUN git commit -m "chore: update scout-for-lol version to $version"
  RUN --push --secret GH_TOKEN gh auth setup-git
  RUN --push --secret GH_TOKEN git push --set-upstream origin scout/$version
  RUN --push --secret GH_TOKEN gh pr create --title "chore: update scout-for-lol version to $version" --body "This PR updates the scout-for-lol version to $version" --base main --head scout/$version
  # enable auto-merge
  RUN --push --secret GH_TOKEN gh pr merge --auto --rebase
  # TODO: notify sentry of release
  # https://docs.sentry.io/product/releases/setup/

pre-commit:
  FROM python
  WORKDIR /workspace
  RUN curl -fsSL https://deno.land/install.sh | sh
  ENV DENO_INSTALL="/root/.deno"
  ENV PATH="$DENO_INSTALL/bin:$PATH"
  RUN pip install pre-commit

  COPY --dir .pre-commit-config.yaml .
  # init a dummy git repo because pre-commit requires it
  RUN git init
  CACHE ~/.cache/pre-commit
  RUN pre-commit install-hooks

  COPY . .
  COPY ./packages/backend+prisma.generate/ packages/backend/
  COPY ./packages/backend+deps/node_modules/ packages/backend/node_modules
  COPY ./packages/report+deps/node_modules/ packages/report/node_modules
  RUN pre-commit run --all-files
