---
layout: post
title: Modulo using bitwise operation
categories:
  - Programming
tags:
  - Bit Manipulation
last_modified_at: 2018-01-10T11:19:59-05:00
---

The integer modulo operator is widely used in different contexts. For example, the modulo operator allows creating repeating sequences of non-negative numbers \[0, 1, ..., n-1\] that can be used to build circular arrays or other objects that reuse array elements when the end of the data structure is reached. The normal way to create such modulo-n sequences is to increase a counter variable, divide the result by n and then keep the remainder. In C++ this means:                                                                                                                                                                                                                                                                                       
                                                                                                                                                                                                                                                                         
{% highlight cpp %}
  cnt = (cnt + 1) % n;
{% endhighlight %}

The problem with this implementation is that modulo is an expensive operation, requiring far more clock cycles than other operations like addition or subtraction. In general it is more efficient to create modulo-n sequences using a comparison instead of the modulo operator: 

{% highlight cpp %}
  cnt = (cnt + 1);
  if (cnt >= n) 
    cnt = 0;
{% endhighlight %}

Anyway, in the special case when n is a power of two (n = 2<sup>m</sup>), it is possible to create modulo-n sequences in a more efficient way using the bitwise AND operator. Since x mod 2<sup>m</sup> is just taking the least significant m digits of x, the procedure is to increment the counter and then AND it with the value 2<sup>m</sup> - 1. This approach is far more efficient than use the modulo operator because the AND operation is usually very fast. Furthermore, in most of cases, using the AND operator is also a bit faster than an if statement. The following example shows how to generate a modulo-64 sequence using the AND operator:

{% highlight cpp %}
  cnt = (cnt + 1) & 0x3F;  // n = 64, m = 6
{% endhighlight %}
