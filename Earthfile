VERSION 0.8
FROM ubuntu:jammy

ci:
  ARG EARTHLY_CI
  ARG EARTHLY_GIT_SHORT_HASH
  ARG git_sha=$EARTHLY_GIT_SHORT_HASH
  ARG --required version
  BUILD +check
  # BUILD +build
  WAIT
    BUILD ./packages/backend+image --version=$version --git_sha=$git_sha
  END
    # IF [ $EARTHLY_CI = "true" ]
    #   BUILD ./packages/frontend+deploy --stage=prod --git_sha=$git_sha
    # ELSE
    #   BUILD ./packages/frontend+deploy --stage=dev --git_sha=$git_sha
    # END
  # after the backend is built and pushed, update homelab
  BUILD +deploy --stage=beta --version=$version

# build:
#   BUILD ./packages/frontend+build

check:
  # BUILD ./packages/backend+check
  BUILD ./packages/data+check

deno:
  FROM denoland/deno
  WORKDIR /workspace

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
  RUN sed -i "s/\"shepherdjerred\/scout-for-lol\/beta\": \".*\"/\"shepherdjerred\/scout-for-lol\/beta\": \"$version\"/" cdk8s/src/versions/versions.ts
  # make the PR
  RUN git add .
  RUN git checkout -b scout/$version
  RUN git commit -m "chore: update scout-for-lol version to $version"
  RUN --secret GH_TOKEN gh auth setup-git
  RUN git push --set-upstream origin scout/$version
  RUN --push --secret GH_TOKEN gh pr create --title "chore: update scout-for-lol version to $version" --body "This PR updates the scout-for-lol version to $version" --base main
  # enable auto-merge
  RUN --push --secret GH_TOKEN gh pr merge --auto --squash
