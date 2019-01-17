---
layout: post
title: Python Tricks
categories:
  - Programming
tags:
  - Python
last_modified_at: 2018-03-24T11:07:45-05:00
---

## list declaration

dp = [value]*length

where value is the initialization value for all list elements and length is the length of the list

## 2D list declaration

A short notation to define and initialize a 2D matrix as a list of list is the following: 

{% highlight python %}
matrix = [[0]*cols for i in range(rows)]
{% endhighlight %}

where **0** is the intialization value for all matrix elements, **cols** is the number of columns and **rows** is the number of rows.
Unfortunately shortening the previous notation as 

{% highlight python %}
[[0]*cols]*rows 
{% endhighlight %}

doesn't work because it creates **rows** copies of the same list of size **cols**, so when an element is modified, all the elements 
belonging to the same column are modified. Indeed if cols = 3, [0]*cols creates a list [0 0 0] with 3 times a reference to the 
same (immutable) object representing the number 0. Consequently, [[0]*cols]*rows creates **rows** references to the same list [0 0 0]
and any change to an element of a list is propagated through all references. The change doesn't propagate internally to each list, 
because the list objects are immutable.

## Get indices in for loop

The enumerate() function adds an index to an iterable, producing for each element a tuple with (index, element). 
If the for loop specifies two varibles, the first variable bind to the element index and the second one to the element value. 
So the following example 

{% highlight python %}
values = ["a", "b", "c", "d", "e"]
for idx, val in enumerate(values) :
    print (idx, val)
{% endhighlight %}

produces as output 

```yaml
0 a
1 b
2 c
3 d
4 e
```

By default, enumerate() starts indexing at 0, specifying a second integer argument, it'll start from that index instead.

{% highlight python %}
values = ["a", "b", "c", "d", "e"]
for idx, val in enumerate(values,3) :
    print (idx, val)
{% endhighlight %}

produces as output 

```yaml
3 d
4 e
```

## Max integer value

Python 3 doesn't have limit on int, but it's possible to use sys.maxsize as an integer larger than any practical list or string index.

## Convert tuple of string to int
map(function, iterable, ...)
Apply function to every item of iterable and return a list of the results. If additional iterable arguments are passed, function must take that many arguments and is applied to the items from all iterables in parallel. If one iterable is shorter than another it is assumed to be extended with None items. If function is None, the identity function is assumed; if there are multiple arguments, map() returns a list consisting of tuples containing the corresponding items from all iterables (a kind of transpose operation). The iterable arguments may be a sequence or any iterable object; the result is always a list.
