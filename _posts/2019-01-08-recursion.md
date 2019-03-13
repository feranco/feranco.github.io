---
layout: post
title: Recursion
categories:
  - Algorithms
tags:
  - Recursion
last_modified_at: 2019-01-08T19:55:59-05:00
---

Recursion is the process of defining a problem in terms of itself and it is a powerful tool in defining algorithms. Indeed, a recursive solution to a problem can be written as a function calling itself. Every recursive function requires two main components:
* The *base case* computing an output value without making any subsequent recursive calls. This is done for one or more input values for which the function is evaluated without recursion.

* The *reduction step*, relating the output value of the function at one (or more) input values to the value of the function at one (or more) other input values. A fundamental property of each recursive function is that the sequence of input values in the reduction steps must converge to the base case.

A useful tool for visualizing what happens when a recursive function runs is the *recursion tree*. It diagrams the tree of recursive calls and the amount of work done at each call.

There are three different ways a recursive function can return an output value:
* storing the result in a global variable
* storing the result in a passed variable
* building up the result as it return from the base case.

These three options are showed in the following code implementing a recursion function computing the GCD of two positive integers. It's useful to remember that the GCD of two positive integers p and q can be efficiently computed using the following property: if p > q, the GCD of p and q is the same as the GCD of q and p % q. So recursively computing p % q, when p % q is equal to 0 the GCD corresponds to q.

{% highlight cpp %}
//global result variable
static long result;

void gcd (int p, int q) {

     if (q == 0) result = p;
     gcd(q, p%q);
}
{% endhighlight %}

{% highlight cpp %}
//passed result variable

void gcd (int p, int q, int* result) {

     if (q == 0) *result = p;
     gcd(q, p%q);
}
{% endhighlight %}

{% highlight cpp %}
//return result

void gcd (int p, int q, int* result) {

     if (q == 0) return p;
     return gcd(q, p%q);
}
{% endhighlight %}

A recursive algorithm works because the computer holds the computation done in every reduction step on the function stack frame. So, the space complexity is usually proportional to the number of reduction steps plus any non-constant space used during every step. An exception to this rule can be given by *tail recursive* functions, where the recursive call is performed as the final statement of the procedure. For such functions, there isn't any need to store stack frames before executing the next reduction step and the space complexity is reduced to the non-constant space used during every step. Unfortunately, the applicability of tail recursion is quite limited. Indeed, not all programming languages support it (certainly all functional languages) and it is not appliable if there are multiple recursive calls in the function.

Regarding the time complexity, this is not always easy to define for recursive algoritms. As a general rule, the time complexity can be computed using the following criterias:
* it is proportional to the number of reduction steps, in case there is only one recursive call.
* it is proportional to the number of leafs in the recursion tree, in case there are more multiple recursive calls. According to the trees theory this number corresponds to the branching factor ^ max number of reduction steps.

As a final note, it should be taken into account that every recursive problem always be solved iteratively and viceversa. Even if the two solutions are equivalent from a time complexity poit of view, the iterative solution is usually more space efficient because there isn't any need to store stack frames regardless tail recursion optimization is appliable or not. For example the GCD algorithm can be easily implemented iteratively as follows:

{% highlight cpp %}
//iterative

int gcd (int p, int q) {

     while (q != 0) {
     	   int tmp = p;
     	   p = q;
	   q = tmp % q;
     }
     return p;
}
{% endhighlight %}
