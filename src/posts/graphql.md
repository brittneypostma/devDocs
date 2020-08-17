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






</div>
</div>