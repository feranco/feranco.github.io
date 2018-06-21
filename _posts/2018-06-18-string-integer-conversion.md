---
layout: post
title: String to number conversion in C++
categories:
  - Programming
tags:
  - C++
last_modified_at: 2018-06-20T11:19:59-05:00
---

Convert a string to an number is a quite common task in C++. This post summarizes the most common techniques to accomplish this task.

##String to number conversion

The first method is to construct an input stringstream initialized with the string to be converted and then reading the value into a variable using the >> operator. 

{% highlight cpp %}
template <class T> T stringToNum (const string& s) {
   T value;
   istringstream is(s);
   //set number to 0 if an error occur
   return (is >> value) ? value : 0;
}
{% endhighlight %}  
  
A second method is to use one of the following functions introduced in <string> with C++11:
* stoi, stol, stoll that converts from a string to an integer; 
* stof, stod, stold that converts from a string to a floating-point value. 

{% highlight cpp %}
string s = "1927";
int number = stoi(s);
{% endhighlight %}

A third method is to use the C library function sscanf as in the following example:

{% highlight cpp %}
#include <string>
#include <cstdio>
 
bool string2Int(const std::string& s, int& number)
{
    int result = sscanf (s.c_str(), "%d", &number);
    // check if something went wrong during the conversion
    if ( !Succeeded || Succeeded == EOF )
      result = 0;

    return result;
}
{% endhighlight %}

Using %f in place of "%d"
