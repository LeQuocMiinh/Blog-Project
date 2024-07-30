Web API về Dự án trang web Blog, được sử dụng NodeJs và ExpressJs
Waiting for launch data... Done
Created app 'blogs-anythings' in organization 'personal'
Admin URL: https://fly.io/apps/blogs-anythings
Hostname: blogs-anythings.fly.dev
Run `fly tokens create deploy -x 999999h` to create a token and set it as the FLY_API_TOKEN secret in your GitHub repository settings
See https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions
installing: yarn add @flydotio/dockerfile@latest --dev
yarn add v1.22.19
warning ..\..\..\..\package.json: No license field
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
success Saved lockfile.
success Saved 6 new dependencies.
info Direct dependencies
└─ @flydotio/dockerfile@0.5.8
info All dependencies
├─ @flydotio/dockerfile@0.5.8
├─ async@3.2.5
├─ diff@5.2.0
├─ ejs@3.1.10
├─ filelist@1.0.4
└─ jake@10.9.2
Done in 8.29s.
     create  Dockerfile
Wrote config file fly.toml
Validating C:\Users\minhl\OneDrive\Máy tính\Node JS\Blog Project\fly.toml
✓ Configuration is valid
==> Building image
Waiting for remote builder fly-builder-young-log-1735...
Waiting for remote builder fly-builder-young-log-1735...
Waiting for remote builder fly-builder-young-log-1735...
Waiting for remote builder fly-builder-young-log-1735...
Waiting for remote builder fly-builder-young-log-1735...
Waiting for remote builder fly-builder-young-log-1735...
Waiting for remote builder fly-builder-young-log-1735...
Waiting for remote builder fly-builder-young-log-1735...
Waiting for remote builder fly-builder-young-log-1735...
Waiting for remote builder fly-builder-young-log-1735...
Waiting for remote builder fly-builder-young-log-1735...
Waiting for remote builder fly-builder-young-log-1735...
Waiting for remote builder fly-builder-young-log-1735...
Waiting for remote builder fly-builder-young-log-1735...
Waiting for remote builder fly-builder-young-log-1735...
Waiting for remote builder fly-builder-young-log-1735...
Waiting for remote builder fly-builder-young-log-1735...
Remote builder fly-builder-young-log-1735 ready
Waiting for remote builder fly-builder-young-log-1735...
Waiting for remote builder fly-builder-young-log-1735...
Waiting for remote builder fly-builder-young-log-1735...
Waiting for remote builder fly-builder-young-log-1735...
Waiting for remote builder fly-builder-young-log-1735...
Waiting for remote builder fly-builder-young-log-1735...
Waiting for remote builder fly-builder-young-log-1735...
Waiting for remote builder fly-builder-young-log-1735...
Waiting for remote builder fly-builder-young-log-1735...
Remote builder fly-builder-young-log-1735 ready
==> Building image with Docker
--> docker host: 24.0.7 linux x86_64
[+] Building 39.1s (15/15) FINISHED
 => [internal] load build definition from Dockerfile                                                               0.2s
 => => transferring dockerfile: 966B                                                                               0.2s
 => [internal] load .dockerignore                                                                                  0.2s
 => => transferring context: 52B                                                                                   0.2s
 => resolve image config for docker.io/docker/dockerfile:1                                                         0.9s
 => docker-image://docker.io/docker/dockerfile:1@sha256:fe40cf4e92cd0c467be2cfc30657a680ae2398318afd50b0c80585784  0.2s
 => => resolve docker.io/docker/dockerfile:1@sha256:fe40cf4e92cd0c467be2cfc30657a680ae2398318afd50b0c80585784c604  0.0s
 => => sha256:fe40cf4e92cd0c467be2cfc30657a680ae2398318afd50b0c80585784c604f28 8.40kB / 8.40kB                     0.0s
 => => sha256:dc9e236567481e0aca4c1f52351af213b9a176622f10e3f4a86e5cc48919fa01 482B / 482B                         0.0s
 => => sha256:fd020648a727ee1aa6fe2924bf9c498d19385fa2491ddeecb9da9a499c43e35a 1.26kB / 1.26kB                     0.0s
 => => sha256:2ba8a93af1b3f8d1c5354117c15aa2eaa674a24a81b6622506a8a524ba8d3fc9 12.46MB / 12.46MB                   0.1s
 => => extracting sha256:2ba8a93af1b3f8d1c5354117c15aa2eaa674a24a81b6622506a8a524ba8d3fc9                          0.1s
 => [internal] load metadata for docker.io/library/node:18.20.2-slim                                               0.6s
 => [internal] load build context                                                                                  2.3s
 => => transferring context: 470.60kB                                                                              2.3s
 => [base 1/3] FROM docker.io/library/node:18.20.2-slim@sha256:2697eb70c760c3720ad9811871d5ab19c4ad2f2e0a3735785e  2.8s
 => => resolve docker.io/library/node:18.20.2-slim@sha256:2697eb70c760c3720ad9811871d5ab19c4ad2f2e0a3735785e53192  0.0s
 => => sha256:2bc7a07d2136e8d3d145f1d9f08c97cddf0a4191717bdba1a4a37979ba3a7148 7.70kB / 7.70kB                     0.0s
 => => sha256:09f376ebb190216b0459f470e71bec7b5dfa611d66bf008492b40dcc5f1d8eae 29.15MB / 29.15MB                   0.3s
 => => sha256:44f5fe9df22b4c549ef3e662bd64e1e6edb8d3738224047ce56d83ab2f498943 3.35kB / 3.35kB                     0.0s
 => => sha256:730fa21f85a623df6db5f2da7943ebf03fe00098f89ef55beb08e1c997a5eda3 38.15MB / 38.15MB                   0.3s
 => => sha256:52f1498a3941a827c4cb3b8390e2bb897276f7f4a46879cf13c15dcf83542b28 1.71MB / 1.71MB                     0.0s
 => => sha256:203a38d2f6dc9fbc0e0bf531d320515e553d905dc853ee7f419d692ee152db91 452B / 452B                         0.0s
 => => sha256:2697eb70c760c3720ad9811871d5ab19c4ad2f2e0a3735785e531927ab99bd39 1.21kB / 1.21kB                     0.0s
 => => sha256:884d136a79b6134c637b705875eb5cd13dce73854c2125dedcd238484ce4f835 1.37kB / 1.37kB                     0.0s
 => => extracting sha256:09f376ebb190216b0459f470e71bec7b5dfa611d66bf008492b40dcc5f1d8eae                          1.1s
 => => extracting sha256:44f5fe9df22b4c549ef3e662bd64e1e6edb8d3738224047ce56d83ab2f498943                          0.0s
 => => extracting sha256:730fa21f85a623df6db5f2da7943ebf03fe00098f89ef55beb08e1c997a5eda3                          1.2s
 => => extracting sha256:52f1498a3941a827c4cb3b8390e2bb897276f7f4a46879cf13c15dcf83542b28                          0.1s
 => => extracting sha256:203a38d2f6dc9fbc0e0bf531d320515e553d905dc853ee7f419d692ee152db91                          0.0s
 => [base 2/3] WORKDIR /app                                                                                        0.1s
 => [base 3/3] RUN npm install -g yarn@1.22.19 --force                                                             2.3s
 => [build 1/4] RUN apt-get update -qq &&     apt-get install --no-install-recommends -y build-essential node-gy  17.3s
 => [build 2/4] COPY --link package.json yarn.lock ./                                                              0.0s
 => [build 3/4] RUN yarn install --frozen-lockfile                                                                10.4s
 => [build 4/4] COPY --link . .                                                                                    0.1s
 => [stage-2 1/1] COPY --from=build /app /app                                                                      1.5s
 => exporting to image                                                                                             1.1s
 => => exporting layers                                                                                            1.1s
 => => writing image sha256:3e2f64c5af3e0f44d4ce0f33ff557d596da8d2dda04ee60164b5d8081c6dbc71                       0.0s
 => => naming to registry.fly.io/blogs-anythings:deployment-01J429H6D8Z9YT5Z8J76K350GP                             0.0s
--> Building image done
==> Pushing image to fly
The push refers to repository [registry.fly.io/blogs-anythings]
26da69960ad3: Pushed
642ff62ba845: Pushed
54de0e38a364: Pushed
51496867a9b6: Pushed
a2c354ef7975: Pushed
a603af9aa619: Pushed
6f611743c2e1: Pushed
5d4427064ecc: Pushed
deployment-01J429H6D8Z9YT5Z8J76K350GP: digest: sha256:9c1bd2f062534ae2b84b52745788dfb8c7b840a382945cac0918f9f0371fcd80 size: 1995
--> Pushing image done
image: registry.fly.io/blogs-anythings:deployment-01J429H6D8Z9YT5Z8J76K350GP
image size: 235 MB

Watch your deployment at https://fly.io/apps/blogs-anythings/monitoring

Provisioning ips for blogs-anythings
  Dedicated ipv6: 2a09:8280:1::3e:eeef:0
  Shared ipv4: 66.241.125.101
  Add a dedicated ipv4 with: fly ips allocate-v4

This deployment will:
 * create 2 "app" machines

No machines in group app, launching a new machine

WARNING The app is not listening on the expected address and will not be reachable by fly-proxy.
You can fix this by configuring your app to listen on the following addresses:
  - 0.0.0.0:3000
Found these processes inside the machine with open listening sockets:
  PROCESS        | ADDRESSES
-----------------*--------------------------------------
  /.fly/hallpass | [fdaa:9:ad16:a7b:81:e3be:b3a5:2]:22

Creating a second machine to increase service availability
Finished launching new machines
-------
NOTE: The machines for [app] have services with 'auto_stop_machines = "stop"' that will be stopped when idling

-------
Checking DNS configuration for blogs-anythings.fly.dev

Visit your newly deployed app at https://blogs-anythings.fly.dev/