---
layout: post
title:Creational patterns Regular expressions in C++
categories:
  - Programming
tags:
  - OOP
  - C++
last_modified_at: 2018-07-20T13:50:59-05:00

Creational design patterns introduces different mechanisms to create objects in a controlled way in order to increse the flexibility in deciding which objects need to be
created for a given case. Indeed, creating objects directly with the new operator can be harmful as the objects are scattered all over the application, causing a tightly
coupling between classes. Over time this approach has two main drawbacks. First, it makes difficult to change the implementation since different parts of the code needs to be modified potentially introducing errors. Second, it prevent the reuse of the existing code. Creational design patterns tackle this issue by decoupling the client entirely from the actual initialization process. The following code snapshot shows an example where a Client instanciates different objects directly using the new operator.


{% highlight cpp %}
class ProductA {
      public :
      void operation () {
   	 //perform an operation
      }
};

class Client {
    public:
    void doSomething() {
        ProductA* p1 = new ProductA();
        p1->operation();
    }
}
{% endhighlight %}

The decision about which classes are instanciated is taken directly in the doSomething method of the Client class. So to use a different class (let's say ProductB) it is
necessary to modify the code of the doSomething method. 

##Factory method

The factory method defines an interface for creating an object, but let subclasses decide which class to instantiate. There are multiple ways to implement this interface. First, the interface can be a virtual method that provides a standard implementation of the object, but that can be redefined in a derived class (subclass) in order to change the object implementation. Second, the interface can be a pure virtual method and a subclass have to be necessarily defined to create an object. Third the interface can be a parametric virtual method that provides different implementations of the object according to the input parameter.

{% highlight cpp %}
class BaseProduct {
      public :
      virtual void operation () = 0;
};

class ProductA : public BaseProduct{
      public :
      virtual void operation () {
   	 //perform an operation
      }
};

class ProductB : public BaseProduct{
      public :
      virtual void operation () {
   	 //perform an operation
      }
};

//The object Creator
class ClientA {
    public:
    //factory method
    virtual Product* makeProduct () const {
    	    return new ProductA();
    }
    
    void doSomething() {
        Product* p1 = makeProduct();
        p1->operation();
    }
}
{% endhighlight %}

{% highlight cpp %}
class ClientB : public ClientA {
    public:

    virtual Product* makeProduct () const {
    	    //subclass overrides the factory method
	    //to return something different
    	    return new ProductB();
    }
    
    void doSomething() {
        Product* p1 = makeProduct();
        p1->operation();
}
{% endhighlight %}

##Abstract factory

Factory Method is used to create one product only but Abstract Factory is about creating families of related or dependent products.

Factory Method pattern exposes a method to the client for creating the object whereas in case of Abstract Factory they expose a family of related objects
which may consist of these Factory methods.
Factory Method pattern hides the construction of single object where as Abstract factory method hides the construction of a family of related objects.
Abstract factories are usually implemented using (a set of) factory methods.

AbstractFactory pattern uses composition to delegate responsibility of creating object to another class while Factory design pattern uses inheritance and
relies on derived class or sub class to create object.

The idea behind the Factory Method pattern is that it allows for the case where a client doesn't know what concrete classes it will be required to create at runtime,
but just wants to get a class that will do the job while AbstractFactory pattern is best utilised when your system has to create multiple families of products or you
want to provide a library of products without exposing the implementation details.!
