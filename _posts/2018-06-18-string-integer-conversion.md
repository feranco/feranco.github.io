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

## String to integer conversion

The first method is to construct an input stringstream initialized with the string to be converted and then reading the value into a variable using the >> operator. 

{% highlight cpp %}
template <class T> T stringToNum (const std::string& s) {
   T value;
   std::istringstream is(s);
   //set number to 0 if an error occur
   return (is >> value) ? value : 0;
}
{% endhighlight %}  
  
A second method is to use one of the following functions introduced in <string> with C++11:
* stoi, stol, stoll that converts from a string to an integer; 
* stof, stod, stold that converts from a string to a floating-point value. 

{% highlight cpp %}
std::string s = "1927";
int number = std::stoi(s);
{% endhighlight %}

A third method is to use the C library function sscanf as in the following example converting a string to an integer:

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

Using "%f" in place of "%d" allows to convert a string to a floating-point value.

## Integer to string conversion

The first method is to write the number to be converted into an output stringstream using the << operator and then getting the string using the str() member function. 

{% highlight cpp %}
template <class T> string numToString(T value)
{
   ostringstream os;
   os << value;
   return os.str();
}
{% endhighlight %}  
  
It worth to observe that stringstreams manipulators can be used to customize the format of the resulting string. For example 

{% highlight cpp %}
os << fixed << setprecision(3) << value; 
{% endhighlight %}  

set bla bla.

A second method is to use the function std::to_string() introduced in <string> with C++11:

{% highlight cpp %}
template <class T> std::string numToString(T value)
{
  return std::to_string(value);
}
{% endhighlight %} 

This function is overloaded with different integer and floating-point types so that it can safely convert to string every number.

A third method is to use the C library function sprintf as in the following example converting an integer to a string:
{% highlight cpp %}
std::string int2String(int number)
{
  int number = 1927; 
  char cstring[MAX_NUMBER_LENGTH];
  sprintf ( cstring, "%d", number ); 
  return std::string(cstring);
{% endhighlight %}

Using "%f" in place of "%d" allows to convert a floating-point value into a string.

[comment]: # (http://www.cplusplus.com/articles/D9j2Nwbp/)
[comment]: # (http://www.cplusplus.com/forum/general/208135/)
