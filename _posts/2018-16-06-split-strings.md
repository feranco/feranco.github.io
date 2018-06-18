---
layout: post
title: How to split a string
categories:
  - Programming
tags:
  - C++
  - Python
last_modified_at: 2018-06-16T09:55:59-05:00
---

Split a string in different parts according to a delimiter character is a quite common task. Given an input string, the easiest way to get all characters until the next delimiter and put them in an output string is to use the getline function. The getline function extracts characters from an input stream and stores them into an output string until the next delimitation character is found. Moreover the getline function returns it returns the stream that’s passed to it once the characters has been extracted. Since that stream is convertible to a indicating if no error has occured, including whether or not the stream is at his end, the getline function can be used in a while loop that stops when the end of the stream has been reached. The following function split the input string in several chunks according to the specified delimiter: 

{% highlight cpp %} 
std::vector<std::string> split(const std::string& input, char delimiter)
{
   std::vector<std::string> output;
   std::string s;
   std::istringstream is(s);
   while (std::getline(is, s, delimiter))
   {
      output.push_back(s);
   }
   return output;
}
{% endhighlight %}

Regex solution in case of multiple delimiters.
{% highlight cpp %} 
std::sregex_token_iterator 

std::regex sep ("[ ,.]+");
std::sregex_token_iterator tokens(text.cbegin(), text.cend(), sep, -1);
std::sregex_token_iterator end;
for(; tokens != end; ++tokens){
      std::cout << "token found: " << *tokens << "\n";
}
{% endhighlight %}
