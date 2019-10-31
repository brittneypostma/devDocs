---
title: Markdown
---

<style>

.md {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
}

.ind {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    display: grid; 
    padding: 1em;
    margin: 0 1em 1em;
    justify-content: center;
    align-items: center;
    justify-items: center;
}

.cont {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1em;
    align-items: center;
    justify-items: center;
}

.img {
    width: 50px;
}
</style>

<div style="max-width: 86vw">

[Markdown Guide](https://www.markdownguide.org/basic-syntax/)   
[Markdown Cheetsheet](https://www.code2bits.com/assets/cheat-sheets/cheatsheet-markdown.pdf)

<div class="md">

<div>

## Links

<div class="ind">

<div class="cont">

[Link Text](#)

    [Link Text]{link URL}

</div>

</div>

</div>

<div>

## Images

<div class="ind">

<div class="cont" style="margin-left: -7em;">

<img src="https://image.flaticon.com/icons/png/512/23/23765.png" alt="image alt text" style="width: 50px;"/>

    ![Image Alt Text]{link to image}

</div>

</div>

</div>

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


## Code

<div class="ind">

<div class="cont">

    code

<pre>   indent by one tab</pre>

</div>

</div>

</div>

<div>

## Emphasis

<div class="ind">

<div class="cont">

**bold text**<br/>
*italic text*<br/>
***bold and italic text***

    **bold text** 
    *ital text*
    ***bold and ital text***
    _underscores also work_

</div>

</div>

## Horizontal Rule

<div class="ind">
<div class="cont">

<div style="border: 0; border-top: 1px solid black; width: 100%; height: auto;"></div>

    ---

</div>

</div>

## URLs and Email Addresses

<div class="ind">
<div class="cont">

<fake@example.com>

    <fake@example.com>

</div>

</div>

</div>

<div>

## Blockquotes

<div class="ind">

<div class="cont">

> This is a blockquote
>
> span multiple paragraphs
>> blockquote in a blockquote

    > blockquote
    >
    > span multiple paragraphs
    >> blockquote in a blockquote

</div>

</div>

</div>

</div>



</div>