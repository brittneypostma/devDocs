---
title: GraphQL
image: ./logos/gql.svg
---

<div class="post">
    <div id="toc">
    <p style="font-weight: bold; font-size: 25px;">Table of Contents</p>
    
- [What is GraphQL?](#what-is-graphql)
  - [When Not to GraphQL](#when-not-to-graphql)
  - [Fetching Data](#fetching-data)
  - [The Schema Definition Language (SDL)](#the-schema-definition-language-sdl)
  - [Mutations](#mutations)
  - [Subscriptions](#subscriptions)
  - [Schema](#schema)
  - [Resolvers](#resolvers)
- [Frontend Tutorial](#frontend-tutorial)
  - [Into the code](#into-the-code)
    - [index.js](#indexjs)
    - [Server](#server)
    - [Frontend](#frontend)
    - [GraphQL Query](#graphql-query)
    - [Mutations](#mutations-1)
    - [React Router](#react-router)
    - [Header](#header)
    - [Authentication](#authentication)

</div>

<div id="main">
    <p align="center">
    <img src="logos/gql.svg" alt="GraphQL Logo">
    </p>

## What is GraphQL?

GraphQL or GQL stands for Graph Query Language. It is a language built by Facebook to create and query APIs in a strongly typed, what you ask for is what you get way. The most used alternative is REST, Representation State Transfer, which has been a popular way to fetch data for a long time. When we started using REST, applications were a lot smaller and simpler than they are today. REST is still very popular, but comes with some disadvantages. 

- 1\. **Multiple Endpoints** - More than one endpoint causing multiple fetch calls.
- 2\. **Data Confusion** - Hard to visualize the structure of the data.
- 3\. **Incorrect Data** - Over or under fetching of data because of multiple endpoints can lead to getting back the wrong data.

The API landscape has changed so much over the last few years. With increased mobile usage, the massive amount of frontend frameworks, and the expectation to speed up development time, GraphQL was created to combat these issues. It is open-source, so anyone can contribute, but it is maintained by Facebook. Although it has been used by Facebook since 2012, it wasn't announced and made open source until 2015. At first it was assumed that GraphQL could only be used with React, but this was not the case. It can be used anywhere a client communicates with an API, so it isn't restricted to any specific language which makes it really powerful. Because of this GraphQL has been rapidly growing in the development community, being used by companies like Netflix, GitHub, Shopify, and many more. GraphQL is a more efficient alternative to REST APIs for these reasons.

- 1\. **Declarative Data Fetching** - Only get the data you need. No over-fetching.
- 2\. **Single endpoint** - As opposed to multiple endpoints needing to be fetched.
- 3\. **Strongly-typed** - Allows data to be tested and validated easier.

**Key Points**

> &#x25FE; Created and maintained by Facebook.<br/>
> &#x25FE; Open source to the community.<br/>
> &#x25FE; Open to all multiple programming languages.<br/>
> &#x25FE; More efficient than REST.<br/>
> &#x25FE; Get only the data you ask for.<br/>
> &#x25FE; Only fetch once.<br/>
> &#x25FE; Test and validate easier.

---

### When Not to GraphQL

Okay, so why use REST at all if GraphQL is so much better? Well, there are still cases where it is not as efficient to use GraphQL. The main problem with GraphQL is the a lack of built-in cache support. You can setup your own middleware to deal with this, but it adds complexity and size to your API. Another problem, is that queries always return a status code of **`200`**, meaning OK all good, even if the query was unsuccessful. The error may be difficult to find and leads to additional complexity and monitoring. In the end, GraphQL adds a layer of complexity that may not be needed. If your API is simple and relatively consistent over time, REST is probably a better option. But, if your data is rapidly-changing, GraphQL may just be your solution.

**Key Points**

> &#x25FE; Lack of cache support.<br/>
> &#x25FE; No status code errors.<br/>
> &#x25FE; Added complexity and refactoring.<br/>

---

### Fetching Data

Let's say we have a instructor endpoint of all the instructors. From each instructor, we want to grab their courses and students through their id. Using a REST API, we would hit the id endpoint, then grab the courses from that, then add yet another call to the students endpoint. That's 3 requests to different endpoints just to get our data back. Each endpoint would also return extra data that is not needed, so its **overfetching** data. With GraphQL, we can write **one** query request and get our data back in a useable format. It might look like this:

```graphql
query {
  Instructor (id: "ztm9") {
    name
    courses {
      title
    }
    students(last: 3) {
      name
    }
  }
}
```

We structure our query to say, we only want to get Brittney's courses and students. Using the **id** and **last** arguments, we can specify which Instructor and how many students to return. With just a single request, we got the data back, specifically the way we asked for it. Here is the data returned from the GraphQL query.

```js
{
  "data": {
    "Instructor": {
      "name": "Brittney",
      "courses": [
        { title: "Let's Learn GraphQL" }
      ],
      "students": [
        { name: "Sally" },
        { name: "Bob" },
        { name: "Josh" }
      ]
    }
  }
}
```

---

### The Schema Definition Language (SDL)

GraphQL uses a type system to define the schema of an API. The syntax for writing these schemas is called **Schema Definition Language** or **SDL** for short. SDL can be used to define a **type** in the creation of an API.

```graphql
type Student {
  id: ID!
  name: String!
  age: Int!
}
```

Here we are saying give us a type called Student that has three **fields**, name and age which are of types **String** and **Int**, and an id field of type **ID** which will automatically generate an id when an new Student is created. The **!** or bang operator means that the field is required on that type. Multiple types can be created and combined by creating relations between the types.

```graphql
type Course {
  id: ID!
  title: String!
}

type Student {
  id: ID!
  name: String!
  age: Int!
  courses: [Course!]!
}
```

Here there is a one-to-many relationship between the Student type and the Course type because the courses field is an array of multiple courses. A query for this might look like this.

```graphql
query {
  allStudents {
    name
    age
    courses {
      title
    }
  }
}
```

This would return us all Students listed in database, their age, as well as the title of all their courses.

---

### Mutations

You may have heard the term **CRUD** operations before. This stands for Create, Read, Update, and Delete. These are the 4 basic functions that APIs should be able to perform. In GraphQL, the Read function is from the query and we get all the others through **Mutations**. If you think about it, the name makes sense, because we are mutating data by creating, updating, or deleting. Let's create a new student.

```graphql
mutation {
  createStudent(name: "Tom", age: 35) {
    id
  }
}
```

This createStudent field takes the 2 **arguments** that are required on that type, the name and age. It then returns as a **payload** the id that is automatically generated in a query back to us. It would be the same syntax for deleting or updating. These are created by [**resolvers**](#resolvers) on the server side, which is a topic we cover later.

---

### Subscriptions

Having a realtime connection to the database is important in many applications. In GraphQL, we can use **Subscriptions** to subscribe to an event on the client and it initiates a connection the the server. When the event happens, the server pushes that data back to the client. Here is what a Subscription would look like.

```graphql
subscription {
  newStudent {
    name
    age
  }
}
```

In this Subscription, anytime a new Student is created, the name and age will get sent from the server to the client.

---

### Schema

Now that we have covered the basic foundations of GraphQL, we can cover how it all comes together. Each **entry point**, **Query**, **Mutation**, and **Subscription** are defined in a **Schema**. A schema described the capabilities of the API and defines how clients can request data from it. It is sometimes referred to as a *contract* between the server and the client. To create the allStudents query we used before, we would need to specify that inside the schema.

```graphql
type Query {
  allStudents: [Student!]!
}
```

Here the allStudents field is called the **root field** of the API. Any argument we want to use in the base functions, we need to specify in the schema. So before, when we added the argument `(last: 3)` to get the last 3 students, that would need to defined in our schema. Putting all of it together would look something like this.

```graphql
type Query {
  allStudents(last: Int): [Student!]!
}

type Mutation {
  createStudent(name: String!, age: Int!, id: ID!): Student!
}

type Subscription {
  newStudent: Student!
}

type Student {
  name: String!
  age: Int!
  courses: [Course!]!
}

type Course {
  title: String!
  author: Student!
}
```

--- 

### Resolvers

GraphQL is extremely versatile and can be used with different types of data architecture. The way it gains this flexibility is through **resolvers**. Each query or mutation above had a set of **fields** in the payload, these all correspond to one function called a **resolver**. When the server receives a request, it calls all the functions for the specified fields in the request. It then resolves the request and is able to retrieve the correct data for each field. When all the resolvers are returned, the server packages the data and sends it back to the client in json format. A resolver object for our fields might look similar to this, but it would need to be connected to a data source to get the data from. 

```js
const resolvers = {
  Query: {
    allStudents: (root, args, context, info) => {
      return students.get()
    }
  },
  Student: {
    courses: (root, args, context, info) => {
      return courses.getByStudentId(root.id)
    }
  },
  Course: {
    author: (root, args, context, info) => {
      const course = getCourse(root.id)
      return course.getAuthor()
    }  
  }
}
```

---

## Frontend Tutorial

- 1\. Create project

- ```bash
yarn create react-app hackernews-react-apollo
cd hackernews-react-apollo
```

- 2\. Add git origin

- ```git
git add remote origin URL
git add .
git commit -m 'init fresh repo'
git push --set-upstream origin master
```

- 3\. Restructure app

- ```bash
mkdir src/components src/styles
```

- 4\. Move `App.js` into components folder, then move index.css and App.css into styles folder.

<br/>

- 5\. Update imports.

- ```js
// index.js
import './styles/index.css';
import App from './components/App';
```
```js
// App.js
import logo from '../logo.svg';
import '../styles/App.css';
```

- 6\. Add tacheyons to `public/index.html`

- ```html
<!-- public/index.html under other links in head -->
<link rel="stylesheet" href="https://unpkg.com/tachyons@4.2.1/css/tachyons.min.css"/>
```

- 7\. Replace CSS in `index.css`

- 
```css
/* index.css */
body {
  margin: 0;
  padding: 0;
  font-family: Verdana, Geneva, sans-serif;
}
input {
  max-width: 500px;
}
.gray {
  color: #828282;
}
.orange {
  background-color: #ff6600;
}
.background-gray {
  background-color: rgb(246,246,239);
}
.f11 {
  font-size: 11px;
}
.w85 {
  width: 85%;
}
.button {
  font-family: monospace;
  font-size: 10pt;
  color: black;
  background-color: buttonface;
  text-align: center;
  padding: 2px 6px 3px;
  border-width: 2px;
  border-style: outset;
  border-color: buttonface;
  cursor: pointer;
  max-width: 250px;
}
```

- 8\. Add Apollo and GraphQL packages

- 
 ```bash
yarn add @apollo/client graphql
```

That's it for the setup, we are now ready to start writing some code.

---

### Into the code

#### index.js

- 1\. Add packages to `index.js`.

- 
```js
import {
  createHttpLink,
  InMemoryCache,
  ApolloClient,
  ApolloProvider,
} from "@apollo/client";
```

- 2\. Create variables to connect ApolloClient.

- 
```js
const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
})
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})
```

- 3\. Change out wrapper component around `<App />` to the Apollo Provider.

- 
```js
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
```

#### Server

The code to download the backend of the server was not correct on the tutorial. In order to get the correct version, I cloned the [React-Apollo Tutorial Repo](https://github.com/howtographql/react-apollo). Then, I copied the **server** folder and pasted it into the root of my project. This will add a directory called server to your application. Inside there are prisma files to connect to the database and inside the src folder is the GraphQL server files. We now need to deploy the Prisma database so the GraphQL server can access it.

```bash
cd server
yarn install prisma1 global
yarn install
prisma1 deploy
```

After running **`prisma1 deploy`** navigate to Demo server + MySQL database, hit enter and then choose the location closest to you to create your database. Next, we need to run our backend locally. While still in the server directory run **`yarn start`** and leave it running. Now we can run two mutations to check our connection to the database. Navigate to [http://localhost:4000/](http://localhost:4000/) and paste in the following mutations.

```graphql
mutation CreatePrismaLink {
  post(
    description: "Prisma turns your database into a GraphQL API 😎",
    url: "https://www.prismagraphql.com"
  ) {
    id
  }
}

mutation CreateApolloLink {
  post(
    description: "The best GraphQL client for React",
    url: "https://www.apollographql.com/docs/react/"
  ) {
    id
  }
}
```

Press the play button and select each mutation once. It should return an id. If this worked, we can verify the links were added by running the following query.

```graphql
{
  feed {
    links {
      id
      description
      url
    }
  }
}
```

It should return the json data with the id, description, and url of the 2 links.

#### Frontend

Now that the backend is working, we can implement the client side of the application. First, we are going to display a list of **Link** elements. Inside of the components directory, create a file named **`Link.js`** and add the following code to it.

```jsx
import React from 'react'

const Link = (props) => {
  const link = props.link
  return (
    <div>
      {link.description} ({link.url})
    </div>
  )
}

export default Link
```

This is a React component that is being passed **props** and then displaying the links from those props. Now we can create the component that will list the links. Add a new file in the components directory called **`LinkList.js`** and put the following code inside. For now, we will just hard-code some data do display.

```jsx
import React from 'react'
import Link from './Link'

const ListLinks = () => {
  const links = [
    {
      id: '1',
      description: 'Prisma turns your database into a GraphQL API 😎',
      url: 'https://www.prismagraphql.com',
    },
    {
      id: '2',
      description: 'The best GraphQL client',
      url: 'https://www.apollographql.com/docs/react/',
    },
  ]
  return (
    <div>
      {links.map(link => <Link key={link.id} link={link} />)}
    </div>
  )
}

export default ListLinks
```

Now to see the changes, we need to go to **`App.js`** and change the contents to the following.

```jsx
import React from 'react';
import ListLinks from './ListLinks'
import '../styles/App.css';

function App() {
  return (
    <div className="App">
      <ListLinks />
    </div>
  );
}

export default App;
```

Now if we run **`yarn start`** from the root directory, we should see the 2 links displayed on the screen.

#### GraphQL Query

Next, we'll need to actually query the database for the links stored so they are dynamic instead of hard-coded in. Head to **`LinkList.js`** and we are going to change a few things.

- 1\. Import new packages
- 
```jsx
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
```

- 2\. Underneath the imports add in **LINK_QUERY** and remove hard-coded links.
- 
```jsx
// export to be used later and create query for links
export const LINK_QUERY = gql`
{
  feed {
    links {
      id
      url
      description
    }
  }
}
`
```

- 3\. Destructure off the **useQuery** hook and update the return statement.
- 
```jsx
const ListLinks = () => {
  const { loading, error, data } = useQuery(LINK_QUERY)
  return (
    <>
    {/* IF LOADING */}
      {loading && <div>Fetching...</div>}
    {/* IF ERROR */}
      {error && <div>There was an error fetching the data.</div>}
    {/* ELSE RETURN DATA FROM QUERY */}
      {data && (
        <div>{data.feed.links.map(link =>
          <Link key={link.id} link={link} />
        )}
        </div>
      )}
    </>
  )
}
```

If this worked correctly, we should now have a page that has different states able to be seen on the screen. One while loading, one if there is an error, and the list of links being returned.

#### Mutations

To add new links to our list we need to add a new file in our components folder called **`CreateLink.js`** that includes the following code.

```jsx
import React, { useState } from 'react'
import { gql, useMutation } from "@apollo/client";

const LINK_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      url
      description
    }
  }
`

const CreateLink = () => {
  const [description, setDescription] = useState("")
  const [url, setUrl] = useState("")

  const [createLink] = useMutation(LINK_MUTATION)

  return (
    <div>
      <div className="flex flex-column mt3">
        <input
          className="mb2"
          value={description}
          onChange={e => setDescription(e.target.value)}
          type="text"
          placeholder="A description for the link"
        />
        <input
          className="mb2"
          value={url}
          onChange={e => setUrl(e.target.value)}
          type="text"
          placeholder="The URL for the link"
        />
      </div>
      <button
        onClick={() => {
          createLink({
            variables: {
              description,
              url
            }
          })
        }}
      >
        Submit
        </button>
    </div>
  )
}

export default CreateLink
```

This file includes the import to use gql and the useMutation hook, the GraphQL mutation, and some state to handle updating the url and description of the link. This can be tested by adding the component into **`App.js`** below **`<ListLinks />`** component.

```jsx
import React from 'react';
import ListLinks from './ListLinks'
import CreateLink from './CreateLink';
import '../styles/App.css';

function App() {
  return (
    <div className="App">
      <ListLinks />
      <CreateLink />
    </div>
  );
}

export default App;
```

To actually see the update, the page needs to be refreshed or queried in the playground. To avoid this, we can add in React Router to the application to refresh the page.

#### React Router

Make sure you are in the root directory of the application and run the following command.

```bash
yarn add react-router react-router-dom
```

Now we need to add it to the application in **`index.js`**.Import **`react-router-dom`** and wrap the **`ApolloProvider`** in the router. 

```jsx
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>,
  document.getElementById('root')
);
```

#### Header

Now, lets create a Header component to hold the links. In the components folder create a new file called **`Header.js`**. The following code will import React and the Link component from react-router-dom and display a title and two links.

```jsx
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="flex pa3 justify-between nowrap orange">
      <div className="fw7 mr1 black">Hacker News</div>
      <div className='flex'>
        <Link to="/" className="ml1 no-underline black">
          new
          </Link>
        <div className="ml1 white">|</div>
        <Link to="/create" className="ml1 no-underline black">
          submit
          </Link>
      </div>
    </div>
  )
}

export default Header
```

To see the header, we need to add it into **`App.js`**. We need to import the `Header` and the `Switch` and `Route` components from `react-router-dom`.

```jsx
// add these imports
import { Switch, Route } from 'react-router-dom'
import Header from './Header'

// update App component to the following
function App() {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Switch>
          <Route exact path="/" component={ListLinks} />
          <Route exact path="/create" component={CreateLink} />
        </Switch>
      </div>
    </div>
  );
}
```

Last, we need to update the **`CreateLink`** component so the browser will go back to the list after submitting a new link.

```jsx
// add useHistory import and query to imports
import { LINK_QUERY } from './ListLinks'
import { useHistory } from "react-router-dom";

// initiate useHistory inside component
let history = useHistory();

// update cached links
  const updateCache = (cache, { data }) => {
    const currentLinksList = cache.readQuery({
      query: LINK_QUERY
    })
    const updatedLinksList = [...currentLinksList.feed.links, data.post]

    cache.writeQuery({
      query: LINK_QUERY,
      data: {
        feed: {
          __typename: "Feed",
          links: updatedLinksList,
          count: updatedLinksList.length
        }
      }
    })
  }

// update createLink variable
  const [createLink] = useMutation(LINK_MUTATION, {
    onCompleted: () => history.push("/"),
    onError: () => history.push("/"),
    update: updateCache
  });
```

Now, the list of links and the create new link are on separate pages. You should have a page that looks similar to this.

<p align="center">
<img alt="Hackernews Clone Page" src="gql/page1.png" width="100%">
</p>

#### Authentication

For the last piece, we are going to add in authentication to our application. Create a new file inside the components folder named **`Forms.js`** and lets add to it step by step.

- 1\. Add imports, AUTH_TOKEN will be created later.

- 
```jsx
import React, {useState} from 'react'
import { AUTH_TOKEN } from '../constants'
import { gql, useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
```

- 2\. Add mutations for login and signup.

- 
```js
// signup gql mutation
const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`
// login gql mutation
const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`
```

- 3\. Create the component with states for each field.

- 
```jsx
function Forms() {
  // setup useHistory hook from react-router
  let history = useHistory();
  // states for signup/login form
  const [showLoginForm, setShowLoginForm] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  // set localStorage login token
  const _saveUserData = (token) => {
    localStorage.setItem(AUTH_TOKEN, token);
  };
  // confirm token matches 
  const _confirm = async (data) => {
    const { token } = showLoginForm ? data.login : data.signup;
    _saveUserData(token);
    history.push(`/`);
  };
  // destructure signup mutation
  const [signupMutation, { signupData }] = useMutation(SIGNUP_MUTATION, {
    onCompleted: (data) => _confirm(data),
    onError: () => {},
  });
  console.log("signupData", signupData);
  // destructure login mutation
  const [loginMutation, { loginData }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => _confirm(data),
    onError: () => {},
  });
  console.log("loginData", loginData);
  // return jsx
  return (
    <div>
      {/* if showLoginForm is true display Login form, else display Sign Up form*/}
      <h4 className="mv3">{showLoginForm ? "Login" : "Sign Up"}</h4>
      <div className="flex flex-column">
        {!showLoginForm && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Your name"
          />
        )}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Your email address"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
        <button
          className="pointer mr2 button"
          onClick={() => {
            showLoginForm
              ? loginMutation({
                  variables: {
                    email,
                    password,
                    name,
                  },
                })
              : signupMutation({
                  variables: {
                    email,
                    password,
                    name,
                  },
                });
          }}
        >
          {showLoginForm ? "login" : "create account"}
        </button>
        <button className="pointer button" onClick={() => setShowLoginForm(!showLoginForm)}>
          {showLoginForm ? "need to create an account?" : "already have an account?"}
        </button>
      </div>
    </div>
  )
}
export default Forms
```

- 4\. Create **`constants.js`** file in the `src` folder and add this line.

- 
```js
export const AUTH_TOKEN = 'auth-token'
```

- 5\. Add and setup **useContext** in **`index.js`**.

- 
```js
// add AUTH_TOKEN and setContext import
import { AUTH_TOKEN } from './constants'
import { setContext } from "@apollo/client/link/context";
// setup setContext
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})
// update client variable to use authLink
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})
```

- 6\. Add login link to **Header**.

- 
```jsx
// add import for AUTH_TOKEN
import { AUTH_TOKEN } from '../constants'
// update Header
const Header = () => {
  // get token from localStorage
  const authToken = localStorage.getItem(AUTH_TOKEN)
  return (
    <div className="flex pa3 justify-between nowrap orange">
      <div className="fw7 mr1 white">Hacker News</div>
      <div className='flex'>
        <Link to="/" className="ml1 no-underline black link dim black">
          new
          </Link>
        <div className="ml1 white">|</div>
        <Link to="/create" className="ml1 no-underline black link dim black">
          submit
          </Link>
      </div>
      {/* add div containing login/logout link */}
      <div className="flex flex-fixed">
        {authToken ? (
          <div
            className="ml1 pointer white link dim"
            onClick={() => {
              localStorage.removeItem(AUTH_TOKEN);
              this.props.history.push(`/`);
            }}
          >
            logout
          </div>
        ) : (
            <Link to="/forms" className="ml1 no-underline white link dim">
              login
            </Link>
          )}
      </div>
    </div>
  )
}
export default Header
```

- 7\. Update **`App.js`** to include **Forms route**.

```jsx
// add Form import
import Forms from './Forms'
// add in new Route with Forms
function App() {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Switch>
          <Route exact path="/" component={ListLinks} />
          <Route exact path="/create" component={CreateLink} />
          <Route exact path="/forms" component={Forms} />
        </Switch>
      </div>
    </div>
  )
}
```

</div>