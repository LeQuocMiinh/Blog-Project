Web API về Dự án trang web Blog, được sử dụng NodeJs và ExpressJs
Waiting for launch data... Done
Created app 'blogs-anythings' in organization 'personal'
Admin URL: https://fly.io/apps/blogs-anythings
Hostname: blogs-anythings.fly.dev
Run `fly tokens create deploy -x 999999h` to create a token and set it as the FLY_API_TOKEN secret in your GitHub repository settings

Register params = {
    name: { type: String, maxLength: 255, required: true },
    email: { type: String, maxLength: 255, required: true },
    password: { type: String, maxLength: 255, minLength: 8, required: true },
}

Login params = {
   email: { type: String, maxLength: 255, required: true },
   password: { type: String, maxLength: 255, minLength: 8, required: true },
}

