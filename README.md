# @mbs-dev/api-request

A streamlined React hook for making robust API requests based on Axios. It simplifies data fetching, error handling, and authentication management, empowering efficient and maintainable API interactions within your React applications.

## ⚠️ Important Note for useApiRequest

**Deprecated:**  
The `useApiRequest` hook is no longer maintained and is **not compatible** with Axios versions newer than **1.6.0** due to changes in Axios's type definitions and request handling.

It is **strongly recommended** to use the `useApi` hook instead, which is:
- ✅ Actively maintained
- ✅ More flexible
- ✅ Compatible with the latest Axios versions


## Installation

You can install `@mbs-dev/api-request` via npm or yarn:

```bash
npm install @mbs-dev/api-request
# or
yarn add @mbs-dev/api-request
```

## Usage

### useApi

The useApi hook provides a simple way to make API calls using a preconfigured Axios instance. It returns apiCall, a non-memoized function that executes API requests and handles authentication and error scenarios, including redirecting to a login page on 401 errors. Use it with an Axios instance created via createApi to manage authentication tokens and base URLs.

Create api instance:

```js
  import { createApi } from '@mbs-dev/api-request';
  export const api = createApi('https://api.example.com', localStorage.getItem('token')); // Token is optional
  ```

Import Hook and Helpers:

- 1
    Import the useApi hook and the preconfigured api instance:

```js
  import { useApi } from '@mbs-dev/api-request';
  import api from '../config/api';
  ```
  
- 2
Use createApi to create an Axios instance with a base URL and optional authentication token. The instance automatically adds Authorization: Bearer <token> headers for requests with requiresAuth: true and handles 401 errors by clearing the token and rejecting with redirectToLogin: true.

- 3
  ### Make API Requests with apiCall:

  The apiCall function, returned by useApi, executes API requests using an AxiosRequestConfig object. It supports the following properties and other axios properties:
- `url`: The API endpoint URL relative to the base URL (e.g., /users).
- `method`: The HTTP method (e.g., 'GET', 'POST', 'PUT', 'DELETE').
- `data` (optional): The data to be sent in the request body (e.g., FormData or a plain object).
- `headers` (optional): Additional headers to include (e.g., Content-Type).
- `params` (optional): Query parameters to append to the URL.
- `requiresAuth`  (optional): A boolean indicating if the request requires an authentication token.

  The apiCall function returns a Promise that resolves to an AxiosResponse object or rejects with an error. On 401 errors with requiresAuth: true, it triggers a redirect to /login (if not already on the login page).


  ### Example Usage in a React TypeScript Component

    ```js
    import React from 'react';
    import api from '../config/api';

    const App: React.FC = () => {
    const { apiCall } = useApi(api);
    const userId = 1;

    const formData = new FormData();
    formData.append('firstName', 'John');
    formData.append('lastName', 'Doe');
    formData.append('photo', photo);

    const userInfo = {
        firstName: 'Mohammed',
        lastName: 'Mohammed',
    };

    // GET: Fetch data from the server
    const getUsers = async () => {
        try {
        const response = await apiCall({
            url: '/users',
            method: 'GET',
            headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            },
        });
        console.log('Users fetched:', response.data);
        } catch (error) {
        console.error('Error fetching users:', error.message);
        }
    };

    // POST: Add new resources to the server
    const postUser = async () => {
        try {
        const response = await apiCall({
            url: '/users',
            method: 'POST',
            data: formData,
            requiresAuth: true,
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        });
        console.log('User posted successfully:', response.data);
        } catch (error) {
        console.error('Error:', error.message);
        }
    };

    // PUT: Update existing resources on the server
    const updateUser = async () => {
        try {
        const response = await apiCall({
            url: `/users/${userId}`,
            method: 'PUT',
            data: userInfo,
            requiresAuth: true,
        });
        console.log('User updated successfully:', response.data);
        } catch (error) {
        console.error('Error:', error.message);
        }
    };

    // DELETE: Delete resources from the server
    const deleteUser = async () => {
        try {
        const response = await apiCall({
            url: `/users/${userId}`,
            method: 'DELETE',
            requiresAuth: true,
        });
        console.log('User deleted successfully:', response.data);
        } catch (error) {
        console.error('Error:', error.message);
        }
    };

    return (
        <section>
        <button onClick={getUsers}>Get Users</button>
        <button onClick={postUser}>Post User</button>
        <button onClick={updateUser}>Update User</button>
        <button onClick={deleteUser}>Delete User</button>
        </section>
    );
    };

    export default App;


### useApiRequest

Import Hook and Helpers:

- 1
    Import the useApiRequest hook from the package:

```js
  import useApiRequest from '@mbs-dev/api-request';
  ```
  
- 2
  ### Make API Requests:

  Use the apiRequest function within your components to execute API calls. Specify the following properties:
- `route`: The API endpoint URL relative to your base URL (e.g., /users).
- `method`: The HTTP method (e.g., 'GET', 'POST', 'PUT', 'DELETE').
- `data` (optional): The data to be sent in the request body (e.g., using FormData or a plain object).
- `headers` (optional): Additional headers to include (e.g., Content-Type).
- `params` (optional): Query parameters to append to the URL.
- `requiresAuth` (optional): A boolean indicating if the request requires an authentication token.
- `token` (optional, if requiresAuth is true): The authentication token to include in the Authorization header.


  ### Example Usage in a React TypeScript Component

    ```js
    import useApiRequest from '@mbs-dev/api-request';

    const App: React.FC = () => {
    const { apiRequest } = useApiRequest();
    const apiUrl = 'api.example.com'
    const userId = 1

    const formData = new FormData();
    formData.append('firstName', 'John');
    formData.append('lastName', 'Doe');
    formData.append('photo', photo);

    const userInfo = {
        firstName : 'mohammed',
        lasttName : 'mohammed',
    }


    // ----------------------------------------
    // GET: Use method: 'GET' to fetch data from the server.
    // ----------------------------------------
    const getUsers = async () => {
    try {
        const response = await apiRequest({
       route: `${apiUrl}/users`,
        method: 'GET',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
        }
        });

        console.log('Users fetched:', response.data);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
    };


    // ----------------------------------------
    // POST: Use method: 'POST' to add new resources on the server.
    // ----------------------------------------
    const postUser = async () => {
        try {
        const response = await apiRequest({
            route: `${apiUrl}/users`,
            method: 'POST',
            data: formData,
            requiresAuth: true,
            token: `${localStorage.getItem('token')}`,
            headers: {
            'Content-Type': 'multipart/form-data',
            }
        });

        console.log('User posted successfully:', response.data);
        } catch (error) {
        console.error('Error :', error);
        }
    };


    // ----------------------------------------
    // PUT: Use method: 'PUT' to update existing resources on the server.
    // ----------------------------------------
    const updateUser = async () => {
        try {
        const response = await apiRequest({
            route: `${apiUrl}/users/${userId}`,
            method: 'PUT',
            data: userInfo,
            requiresAuth: true,
            token: `${localStorage.getItem('token')}`,
        });

        console.log('User updated successfully:', response.data);
        } catch (error) {
        console.error('Error :', error);
        }
    };


    // ----------------------------------------
    // DELETE: Use method: 'DELETE' to delete resources from the server.
    // ----------------------------------------
    const deleteUser = async () => {
        try {
        const response = await apiRequest({
            route: `${apiUrl}/users/${userId}`,
            method: 'DELETE',
            requiresAuth: true,
            token: `${localStorage.getItem('token')}`,
        });

        console.log('User deleted successfully:', response.data);
        } catch (error) {
        console.error('Error :', error);
        }
    };

    return (
        <section>
            <button onClick={getUsers}>Get Users</button>
            <button onClick={postUser}>Post User</button>
            <button onClick={updateUser}>Update User</button>
            <button onClick={deleteUser}>Delete User</button>
        </section>
    );
    };

    export default App;


## Note

Ensure that you handle sensitive data such as authentication tokens securely, especially when storing them in local storage as shown in the examples. Always follow best practices for handling authentication and authorization in your applications.
