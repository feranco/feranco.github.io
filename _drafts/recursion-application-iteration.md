---
layout: post
title: Recursion Application: iteration
categories:
  - Algorithms
tags:
  - Recursion
last_modified_at: 2019-01-25T09:55:59-05:00
---

A straightforward application of recursion is to replace iteration using a recursive function instead of a for loops. Such recursive functions allow to iterate over data structures, taking as parameter the index that would be used in a for loop. As an example, let's consider the following code printing a c++ vector:

{% highlight cpp %}
//forward iteration
void iterate (const std::vector& a, size_t idx) {

     if (idx == a.size()) return;
     std::cout << a[idx] << " ";
     iterate(a, idx+1);
}
{% endhighlight %}

It is worth to notice that the position of the recursive call detemines the direction of the iteration. Indeed, the vector can be printed in reverse order by simply writing the recursive call before printing each element.

{% highlight cpp %}
//reverse iteration
void iterateBackward (const std::vector& a, size_t idx) {

     if (idx == a.size()) return;
     iterate(a, idx+1);
     std::cout << a[idx] << " ";
}
{% endhighlight %}

The use of recursion to iterate over a data structure is rarely useful. An exception are some special cases where the use of recursion replace the use of an explicit stack providing a more elegant solution. Let's consider a couple of examples. In the first one, the goal is to write a function traversing a single linked list in reverse order. The iterative solution would traverse the list starting from the head, pushing each node in a stack. Once all nodes has been pushed, they can be visited in reverse order by simply popping them.