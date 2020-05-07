---
title: Spreadsheets
---
<div style="max-width: 86vw">

### Table of Contents

- [Table of Contents](#table-of-contents)
- [Abbreviations](#abbreviations)
- [Formulas](#formulas)
  - [Date & Time Formulas](#date--time-formulas)
  - [Filter & Sort Formulas](#filter--sort-formulas)
  - [Google Formulas](#google-formulas)
  - [Logical Formulas](#logical-formulas)
  - [Lookup Formulas](#lookup-formulas)
  - [Math & Operator Formulas](#math--operator-formulas)

---

[Google Sheets Function List](https://support.google.com/docs/table/25273?hl=en)

### Abbreviations

-   **Y** - whole years

-   **M** - whole months

-   **D** - whole days

-   **MD** - left over days after subtracting whole months.

-   **YM** - left over months about subtracting whole years

-   **YD** - number of days between 2 dates no more than one year apart.

-   **HH** - whole hours.

-   **MM** - whole minutes.

-   **SS** - whole seconds.

-   **mode** - 1 resizes the image to fit in the cell, 2 stretches or compresses to fit inside cell, 3 leave image at size, 4 allows the specification of a custom size.

---

### Formulas

#### Date & Time Formulas

-   **DATE** - converts a provided year, month, and day into a date.

        DATE(year, month, day)

-   **DATEDIF** - calculates the number of days, months, or years between 2 dates. Units are (Y, M, D, MD, YM, and YD).

        DATEDIF(start_date, end_date, unit)

-   **DATEVALUE** - converts a given date string to a date value.

        DATEVALUE(date_string)

-   **DAY** - returns the day that a given date falls on, in numeric format.

        DAY(date)

-   **DAYS** - returns the number of days between two dates.

        DAYS(end_date, start_date)

-   **EDATE** - returns a date a given number of months before or after another date.

        EDATE(start_date, months)

-   **HOUR** - returns the hour of a given time, in numeric format.

        HOUR(time)

-   **MINUTE** - returns the minute of a given time, in numeric format.

        MINUTE(time)

-   **MONTH** - returns the month of the year a given date falls in, in numeric format.

        MONTH(date)

-   **NOW** - returns the current date and time as a date value.

        NOW()

-   **TIME** - converts a given hour, minute, and second into a time.

        TIME(hour, minute, second)

-   **TIMEVALUE** - returns the fraction of a 24-hour day the time represents.

        TIMEVALUE(time_string)

-   **TODAY** - returns the current date as a date value.

        TODAY()

---

#### Filter & Sort Formulas

-   **FILTER** - returns only rows or columns that meet the given conditions. Range is data to be filtered, condition1 is a column or row containing boolean values to the range, condition2 and on are optional. FILTER can only be used to filter rows or columns at one time. In order to filter both rows and columns, use the return value of one FILTER function as range in another.

        FILTER(range, condition1, [condition2, ...])FILTER(A2, A2="Guest Visitor")

-   **SORT** - sorts the rows of a given range by values in one or more columns.

        SORT(range, sort_column, is_ascending, [sort_column2], [is_ascending2])SORT(A:B, 1, TRUE)

---

#### Google Formulas

-   **ARRAYFORMULA** - displays values returned from an array formula into multiple rows and/or columns and allows non-array functions to be used with arrays.

        ARRAYFORMULA(array_formula)ARRAYFORMULA(B * C)ARRAYFORMULA(SUMPRODUCT(B, C))

-   **IMAGE** - inserts an image into a cell, mode is optional but must be set to 4 to use height and width.

        IMAGE(url, [mode], [height], [width])

-   **QUERY** - run an API Query across data. Data is the range of cells to perform the query on, query is the query to perform and must be enclosed in "" (quotation marks) or be a cell containing the text, and headers is the number of header rows and is optional.  
    [How to Query Data](https://www.seerinteractive.com/blog/how-to-query-data-in-google-sheets/)

        QUERY(data, query, [headers])QUERY(MonthlyData!A2:B, "select B, A where todate(A) >= date '"&text(A1, "yyyy-mm-dd")&"'")

-   **SPARKLINE** - creates a mini chart contained within a single cell, options are optional and are a range of setting used to customize the chart, see link for more info.  
    [SPARKLINE Google Docs](https://support.google.com/docs/answer/3093289)

        SPARKLINE(data, [options])

---

#### Logical Formulas

-   **AND** - returns boolean value after evaluating expression given.

        AND(logical_expression1, [logical_expression2, ...])AND(A2 = "foo", B2  = "bar")

-   **OR** - returns boolean value after evaluating expression give.

        OR(logical_expression1, [logical_expression2, ...])

-   **IF** - retuns a single value if the expression evaluates to true.

        IF(logical_expression, value_if_true, value_if_false)IF(A2,"A2 was true","A2 was false")

-   **IFS** - evaluates multiple conditions and returns a value that corresponds to the first true condition.

        IFS(condition1, value1, [condition2, value2], …)

-   **NOT** - returns opposite of a boolean expression. Zero is the only numberic value that is false.

        NOT(logical_expression)NOT(ISERR(A2))NOT(true) //falseNOT(false) //true

-   **SWITCH** - tests an expressiong against a list of cases and returns the value of the first matching case with optional default case.

        SWITCH(expression, case1, value1, [default or case2, value2], ...)SWITCH(B2:B, "Guest Visitor", "", INDEX(E2:E))

---

#### Lookup Formulas

-   **INDEX** - returns contents of a cell, specified by row and column offset. Row and column are optional.

        INDEX(reference, [row], [column])INDEX(E2:E)

-   **OFFSET** - returns a range reference shifted a specified number of rows and columns from a starting cell reference.

        OFFSET(cell_reference, offset_rows, offset_columns, [height], [width])

-   **VLOOKUP** - vertical lookup. Searches down the first column of a range for a key and returns the value of a specified cell in the row found.

        VLOOKUP(search_key, range, index, [is_sorted])

---

#### Math & Operator Formulas

-   **FLOOR** - rounds a number down to the nearest integer.

        FLOOR(value, [factor])

-   **INT** - rounds a number down to the nearest integer that is less than or equal to it.

        INT(value)

-   **PRODUCT** - returns the result of multiplying a series of numbers together.

        PRODUCT(factor1, [factor2, ...])

-   **QUOTIENT** - returns one number divided by another.

        QUOTIENT(dividend, divisor)

-   **ROUND** - rounds a number to a certain number of decimal places.

        ROUND(value, [places])

-   **SUM** - returns the sum of a series of numbers.

        SUM(value1, [value2, ...])

-   **SUMIF** - returns a conditional sum across a range.

        SUMIF(range, criterion, [sum_range])

-   **SUMIFS** - returns the sum of a range depending on specified criteria.

        SUMIFS(sum_range, criteria_range1, criterion1, [criteria_range2, criterion2, ...])

-   **ADD** - returns the sum of two numbers. Equivalent to the '+' operator.

        ADD(value1, value2)

-   **CONCAT** - returns the concatenation of 2 values. Equivalent to the '&' operator.

        CONCAT(value1, value2)

-   **DIVIDE** - returns one number divided by another. Equivalent to the '/' operator.

        DIVIDE(dividend, divisor)

-   **MINUS** - returns the difference of 2 numbers. Equivalent to the '-' operator.

        MINUS(value1, value2)

-   **MULTIPLY** - returns the product of 2 numbers. Equivalent to the '\*' operator.

        MULTIPLY(value1, value2)

</div>