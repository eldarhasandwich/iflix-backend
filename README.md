# Content Rating API Documentation

- Install dependencies: `npm install`
- Generate DB: `psql -f ratings.sql`
- Run: `npm start`

## Logging in
- URL: `/login/:userId`
- Method: `GET`
- URL Params: 
    - `userId [integer]`
- Success Response: 
    - **Code**: 200 
    - **Content**: `{response: "success", userId: 42}`
- Failure Response:
    - **Code**: 404
    - **Content**: `{response: "failure", userId: null}`
- Sample Call:
    ``` javascript
    superagent
        .get(config.api + "/login/" + userId)
        .then(res => { 
            console.log(res)  
        }
    ```

## Post Rating
- URL: `/rating`
- Method: `POST`
- Data Params:
    - `userId: [integer]`
    - `contentId: [integer]`
    - `rating: [integer]`
- Success Response:
    - **Code**: 200
    - **Content**: `{response: "success"}`
- Failure Response:
    - **Code**: 400
    - **Content**: `{response: "failure"}`
- Sample Call:
    ``` javascript
    superagent
        .post(config.api + "/rating")
        .query({
            userId: _userId,
            contentId: _contentId,
            rating: _rating
        })
        .then(res => { 
            console.log(res) 
        }
    ```

## Access Content Average Rating
- URL: `/rating/:contentId`
- Method: `GET`
- URL params: 
    - `contentId [integer]`
- Success Response:
    - **Code**: 200
    - **Content**: `{response: "success", contentId: 101, average: 3.2}`
- Failure Response:
    - **Code**: 404
    - **Content**: `{response: "failure"}`
- Sample Call:
    ``` javascript
    superagent
        .get(config.api + "/rating/" + contentId)
        .then(res => { 
            console.log(res) 
        }
    ```

## Access Content
- URL: `/content`
- Method: `GET`
- Success Response:
    - **Code**: 200
    - **Content**: 
        ```
        {
            response: "success",
            content: [
                {contentId: 10, title: "Movie", average: 3}, 
                {contentId: 7, title: "Movie 2", average: 4},
                ...
            ]
        }
        ```
- Sample Call:
    ``` javascript
    superagent
        .get(config.api + "/content")
        .then(res => {
            console.log(res) 
        }
    ```



