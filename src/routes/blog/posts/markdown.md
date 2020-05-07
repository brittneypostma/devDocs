---
title: Markdown
---

### Table of Contents

- [Heading 1](#heading-1)
      - [Heading 2](#heading-2)
    - [Heading 3](#heading-3)
      - [Heading 4](#heading-4)
        - [Heading 5](#heading-5)
          - [Heading 6](#heading-6)
      - [Lists](#lists)
      - [Code](#code)
      - [Emphasis](#emphasis)
      - [Horizontal Rule](#horizontal-rule)
      - [URLs and Email Addresses](#urls-and-email-addresses)
      - [Blockquotes](#blockquotes)

---

[Markdown Guide](https://www.markdownguide.org/basic-syntax/)   
[Markdown Cheetsheet](https://www.code2bits.com/assets/cheat-sheets/cheatsheet-markdown.pdf)

---

#### Links

[Link Text](#)

    [Link Text]{link URL}

---

#### Images

<img src="https://image.flaticon.com/icons/png/512/23/23765.png" alt="image alt text" style="width: 50px;"/><br/>

    ![Image Alt Text]{link to image}
    
---

#### Headers


# Heading 1

    # Heading 1 - <h1>

#### Heading 2

    ## Heading 2 - <h2>

### Heading 3

    ### Heading 3 - <h3>

#### Heading 4

    #### Heading 4 - <h4>

##### Heading 5

    ##### Heading 5 - <h5>

###### Heading 6

    ###### Heading 6 - <h6>

---

#### Lists

<h3><u>Ordered Lists</u></h3>

-   1\. First item
-   2\. Second item
-   3\. Third item

~~~markdown
   1. First item
   2. Second item
   3. Third item
~~~


<h3><u>Unordered Lists</u></h3>


+   First item
*   Second item
-   Third item

~~~markdown
    + First item
    - Second item
    * Third item
~~~
+, -, or * adds an unordered list item<br/>
Can be styled with css list-style-type.

---

#### Code

    code
    
<br/> 
    
~~~markdown
    Indent by one tab.
~~~

---

#### Emphasis

**bold text**<br/>
*italic text*<br/>
***bold and italic text***

    **bold text** 
    *ital text*
    ***bold and ital text***
    _underscores also work_

---

#### Horizontal Rule

    ---

---

#### URLs and Email Addresses


<fake@example.com>

    <fake@example.com>


---

#### Blockquotes

> This is a blockquote
>
> span multiple paragraphs
>> blockquote in a blockquote

    > blockquote
    >
    > span multiple paragraphs
    >> blockquote in a blockquote
