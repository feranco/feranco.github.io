---
layout: post
title: "Overloading Stream Operators in C++"
categories:
  - Programming
tags:
  - C++
last_modified_at: 2018-02-14T09:55:59-05:00
---

Operator overloading is just another way to make a function call. The main difference is that the arguments of the function are not inside
parenthesis, but they surround the function or are next to the function. The definition of these function is done using the keyword **operator** followed by the operator itself. Usually, the operators may be members or non-members of a class without any difference. An exception is when the operator \<\< and \>\> are overloaded for iostreams. Since the first argument of these operators is a stream and not an object of the class for which the operators are defined, the stream operators can not be member operators but have to be external to the class. As any non member operator, the overloaded operators \<\< and \>\> should be declared as a **friend** of the class *if* they need to access the private data. However if the class has a way to access the required private members (i.e. through get/set functions), it is not necessary to make the streaming operator a friend. It is important that the overloaded stream operators pass the stream objects by reference, so that the operations affect them, and also return the stream objects by reference so that it is possible to concatenate stream operations together. Finally, it worth to take into account the following remarks:
1. for the input streaming operator \>\>, the second parameter must not be const because an input operation changes the object being read into;
2. for the output streaming operator \<\<, the second parameter should be const because an output operation should not change the object being written out.

The following code shows an example where the stream operators are overloaded for a generic Date class.

{% highlight cpp %}  
  
class Date  
{  
    int day, month, year;  
public:  
    Date(int d, int m, int y)  
    {  
        month = m; day = d; year = y;  
    }  
    
    friend std::ostream& operator<<(std::ostream& os, const Date& dt);  
    friend std::istream& operator>>(std::istream& os, Date& dt);
};  
  
std::ostream& operator<<(std::ostream& os, const Date& date)  
{  
    os << date.day << '/' << date.month << '/' << date.year;  
    return os;  
}  

std::istream& operator>> (std::istream& is, Date& date)  
{  
    is >> date.day >> date.month >> date.year;  
    return is;  
}  
  
int main()  
{  
    Date date(17, 06, 2001);  
    cout << dt;  
}  

{% endhighlight %}


