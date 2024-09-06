WEBSITE BLOG - API - USING NODEJS & EXPRESSJS

Install package: yarn install

Run: yarn dev

Init file .env & fill information fields: 

    JWT_ACCESS_TOKEN_SECRET=""

    JWT_SIGN_OPTIONS={"expiresIn":"7 days"}

    ADMIN_SETUP_PASSWORD=""

    CLOUDINARY_NAME=""

    CLOUDINARY_API_KEY=""
    
    CLOUDINARY_API_SECRET=""


Using Cloudinary storage image
Using MongoDB Atlas storage database
Using JWT authorization account user


Author:

    login: https://blogs-anythings.fly.dev/api/v1/auth/login 

    logout: https://blogs-anythings.fly.dev/api/v1/auth/logout


Post: 

    Get all posts: https://blogs-anythings.fly.dev/api/v1/posts/get-posts-by-filter [GET]

    Get detail post: https://blogs-anythings.fly.dev/api/v1/posts/get-detail/ + id [GET]

    Create post: https://blogs-anythings.fly.dev/api/v1/posts/create [POST]

    Update post: https://blogs-anythings.fly.dev/api/v1/posts/update/:id [PUT]

    Trash posts: https://blogs-anythings.fly.dev/api/v1/posts/trash/:id [PUT]

    Restore posts: https://blogs-anythings.fly.dev/api/v1/posts/restore/:id [PUT]

    Delete posts: https://blogs-anythings.fly.dev/api/v1/posts/delete/:id [DELETE]


Category: 

    Get all categories: https://blogs-anythings.fly.dev/api/v1/category/get-all [GET]

    Get detail category: https://blogs-anythings.fly.dev/api/v1/category/get-detail/ + id [GET]

    Create post: https://blogs-anythings.fly.dev/api/v1/category/create [POST]

    Update post: https://blogs-anythings.fly.dev/api/v1/category/update/:id [PUT]

    Trash categories: https://blogs-anythings.fly.dev/api/v1/category/trash/:id [PUT]

    Restore categories: https://blogs-anythings.fly.dev/api/v1/category/restore/:id [PUT]

    Delete categories: https://blogs-anythings.fly.dev/api/v1/category/delete/:id [DELETE]


Tag: 

    Get all tags: https://blogs-anythings.fly.dev/api/v1/tag/get-all [GET]

    Create post: https://blogs-anythings.fly.dev/api/v1/tag/create [POST]

    Update post: https://blogs-anythings.fly.dev/api/v1/tag/update/:id [PUT]

    Trash tags: https://blogs-anythings.fly.dev/api/v1/tag/trash/:id [PUT]

    Restore tags: https://blogs-anythings.fly.dev/api/v1/tag/restore/:id [PUT]

    Delete tags: https://blogs-anythings.fly.dev/api/v1/tag/delete/:id [Delete]


Media: 

    Get all media: https://blogs-anythings.fly.dev/api/v1/media/get-all [GET]

    Upload media: https://blogs-anythings.fly.dev/api/v1/media/upload [POST]

    Delete media: https://blogs-anythings.fly.dev/api/v1/tag/delete/:id [Delete]




