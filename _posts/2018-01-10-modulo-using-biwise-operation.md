---
layout: post
title: Modulo using bitwise operation
categories:
  - Programming
tags:
  - Bit Manipulation
last_modified_at: 2018-01-10T11:19:59-05:00
---

The integer modulo operator is widely used in different contexts. For example, the modulo operator allows creating repeating sequences of numbers that can be used to build circular queues or other objects that reuse array elements upon reaching the end of the data structure. The normal way to create such sequences is to increase a counter variable, divide the result by n and then keep the remainder. In C/C++ this means:                                                                                                                                                                                                                                                                                       
                                                                                                                                                                                                                                                                         
{% highlight cpp %}
  cnt = (cnt + 1) % n;
{% endhighlight %}

The problem with this implementation is that modulo is an expensive operation, requiring far more clock cycles than other operations like addition or subtraction. In general it is more efficient to create modulo-n sequences using a comparison instead of the modulo operator: 

{% highlight cpp %}
  cnt = (cnt + 1);
  if (cnt >= n) 
    cnt = 0;
{% endhighlight %}

Anyway, in the special case when n is a power of two, it is possible to create modulo-n sequences in a more efficient way using the bitwise AND operator. The procedure is to increment the counter and then AND it with the value n = 2<sup>m</sup> - 1. Since the AND operation is usually very fast, this approach is far more efficient than use the modulo operator. Furthermore, in most of cases, using the AND operator is also a bit faster than an if statement. The following examples show how to generate modulo-n sequences using the AND operator:

{% highlight cpp %}
  cnt = (cnt + 1) & 0x3F;  // n = 32, m = 5
{% endhighlight %}
