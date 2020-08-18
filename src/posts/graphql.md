---
title: GraphQL
image: ./logos/gql.svg
---

<div class="post">
    <div id="toc">
    <p style="font-weight: bold; font-size: 25px;">Table of Contents</p>
    
- [What is GraphQL?](#what-is-graphql)
  - [Key Points](#key-points)
- [When Not to GraphQL](#when-not-to-graphql)
  - [Key Points](#key-points-1)
- [Fetching Data](#fetching-data)
- [The Schema Definition Language (SDL)](#the-schema-definition-language-sdl)
- [Mutations](#mutations)
- [Subscriptions](#subscriptions)
- [Schema](#schema)

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

### Key Points

> &#x25FE; Created and maintained by Facebook.<br/>
> &#x25FE; Open source to the community.<br/>
> &#x25FE; Open to all multiple programming languages.<br/>
> &#x25FE; More efficient than REST.<br/>
> &#x25FE; Get only the data you ask for.<br/>
> &#x25FE; Only fetch once.<br/>
> &#x25FE; Test and validate easier.

---

## When Not to GraphQL

Okay, so why use REST at all if GraphQL is so much better? Well, there are still cases where it is not as efficient to use GraphQL. The main problem with GraphQL is the a lack of built-in cache support. You can setup your own middleware to deal with this, but it adds complexity and size to your API. Another problem, is that queries always return a status code of **`200`**, meaning OK all good, even if the query was unsuccessful. The error may be difficult to find and leads to additional complexity and monitoring. In the end, GraphQL adds a layer of complexity that may not be needed. If your API is simple and relatively consistent over time, REST is probably a better option. But, if your data is rapidly-changing, GraphQL may just be your solution.

### Key Points

> &#x25FE; Lack of cache support.<br/>
> &#x25FE; No status code errors.<br/>
> &#x25FE; Added complexity and refactoring.<br/>

---

## Fetching Data

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

```json
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

## The Schema Definition Language (SDL)

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
  title: String!
  author: Student!
}

type Student {
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

## Mutations

You may have heard the term **CRUD** operations before. This stands for Create, Read, Update, and Delete. These are the 4 basic functions that APIs should be able to perform. In GraphQL, the Read function is from the query and we get all the others through **Mutations**. If you think about it, the name makes sense, because we are mutating data by creating, updating, or deleting. Let's create a new student.

```graphql
mutation {
  createStudent(name: "Tom", age: 35) {
    id
  }
}
```

This createStudent field takes the 2 **arguments** that are required on that type, the name and age. It then returns as a **payload** the id that is automatically generated in a query back to us. It would be the same syntax for deleting or updating. These are created by **resolvers** on the server side, which is a topic we cover later.

---

## Subscriptions

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

## Schema

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

</div>