# @mbs-dev/api-request

A streamlined React hook for making robust API requests based on Axios. It simplifies data fetching, error handling, and authentication management, empowering efficient and maintainable API interactions within your React applications.

## Installation

You can install `@mbs-dev/api-request` via npm or yarn:

```bash
npm install @mbs-dev/api-request
# or
yarn add @mbs-dev/api-request
```
## Usage

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
