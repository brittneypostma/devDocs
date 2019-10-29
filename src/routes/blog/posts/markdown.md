---
title: Markdown
---

<style>

.md {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(375px, 1fr));
}

.ind {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    display: grid; 
    padding: 1em;
    margin-right: 1em;
    justify-content: center;
    align-items: center;
    justify-items: center;
}

.cont {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1em;
    align-items: center;
}
</style>

[Markdown Guide](https://www.markdownguide.org/basic-syntax/)  
[Markdown Cheetsheet](https://www.code2bits.com/assets/cheat-sheets/cheatsheet-markdown.pdf)

<div class="md">

<div>

## Headers

<div class="ind">

# Heading 1

    # Heading 1 - <h1>

## Heading 2

    ## Heading 2 - <h2>

### Heading 3

    ### Heading 3 - <h3>

#### Heading 4

    #### Heading 4 - <h4>

##### Heading 5

    ##### Heading 5 - <h5>

###### Heading 6

    ###### Heading 6 - <h6>

</div>

</div>

<div>

## Lists

<div class="ind">


<h3><u>Ordered Lists</u></h3>

<div class="cont">

1.  1\. First item
2.  2\. Second item
3.  3\. Third item

<pre>1. First item<br/>2. Second item<br/>3. Third item</pre>

</div>

<h3><u>Unordered Lists</u></h3>

<div class="cont">

+   First item
*   Second item
-   Third item

<pre>+ First item<br/>- Second item<br/>* Third item</pre>
</div>
+, -, or * adds an unordered list item<br/>
Can be styled with css list-style-type.


</div>

<div>

## Emphasis

<div class="ind">

    # Heading 1 - <h1>

# h1

    ## Heading 2 - <h2>

## h2

    ### Heading 3 - <h3>

### h3

    #### Heading 4 - <h4>

#### h4

    ##### Heading 5 - <h5>

##### h5

    ###### Heading 6 - <h6>

###### h6

</div>

</div>
