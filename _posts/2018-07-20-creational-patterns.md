---
layout: post
title: Creational patterns
categories:
  - Programming
tags:
  - OOP
  - Design Patterns
  - C++
last_modified_at: 2018-07-20T13:50:59-05:00
---

Creational design patterns introduces different mechanisms to create objects in a controlled way in order to increse the flexibility in deciding which objects need to be
created for a given case. Indeed, creating objects directly with the new operator can be harmful as the objects are scattered all over the application, causing a tightly
coupling between classes. Over time this approach has two main drawbacks. First, it makes difficult to change the implementation since different parts of the code needs to be
modified potentially introducing errors. Second, it prevent the reuse of the existing code. Creational design patterns tackle this issue by decoupling the client entirely
from the actual initialization process. The following code snapshot shows an example where a Client instanciates different objects directly using the new operator.


{% highlight cpp %}
//Object interface
class Product {
      public :
      virtual void operation () = 0;
};

//A standard interface implementation
class ProductA : public Product{
      public :
      virtual void operation () {
   	 //perform an operation
      }
};

//A different interface implementation
class ProductB : public Product{
      public :
      virtual void operation () {
   	 //perform an operation
      }
};

class Creator {
    public:
    void doSomething() {
        ProductA* p1 = new ProductA();
        p1->operation();
    }
}
{% endhighlight %}

The decision about which classes are instanciated is taken directly in the doSomething method of the Creator class. So to use a different class (let's say ProductB) it is
necessary to modify the code of the doSomething method. 

## Factory method

The factory method defines an interface for creating an object, but let subclasses decide which class to instantiate. There are multiple ways to implement this interface.
First, the interface can be a virtual method that provides a standard implementation of the object, but that can be redefined in a derived class (subclass) in order to change
the object implementation.

{% highlight cpp %}
//The object Creator
class CreatorA {
    public:
    //factory method with standard product
    virtual Product* makeProduct () const {
    	    return new ProductA();
    }
    
    void doSomething() {
        Product* p1 = makeProduct();
        p1->operation();
    }
}

class CreatorB : public CreatorA {
    public:

    virtual Product* makeProduct () const {
    	    //subclass overrides the factory method
	    //to return a different product
    	    return new ProductB();
    }
}
{% endhighlight %}

Second, the interface can be a pure virtual method and a subclass have to be necessarily defined to create an object.òòòòò

{% highlight cpp %}
//The object Creator
class Creator {
    public:
    //factory method
    virtual Product* makeProduct () const = 0;
    
    void doSomething() {
        Product* p1 = makeProduct();
        p1->operation();
    }
};

class ConcreteCreatorA : public Creator {
    public:

    virtual Product* makeProduct () const {
    	    //subclass implementing the factory method
    	    return new ProductA();
    }
};
{% endhighlight %}

Third, the interface can be a parametric virtual method that provides different implementations of the object according to the input parameter. In this case, a subclass of
Creator could extend the interface creating new objects or modifying the creation of existing objects.

{% highlight cpp %}

//The object Creator
class Creator {
    public:

    enum ProductsId {A, B};
    
    //factory method
    virtual Product* makeProduct (ProductsId id) const {
    	    if (id == A) return new ProductA();
	    if (id == B) return new ProductB();
	    return nullptr;
    }
    
    void doSomething((ProductsId id) {
        Product* p1 = makeProduct(id);
f        p1->operation();
    }
};

//The object Creator
class ExtendedCreator : public Creator{
    public:

    enum ProductsId {A, B, C};
    
    //factory method
    virtual Product* makeProduct (ProductsId id) const {
    	    if (id == A) return new ProductA();
	    if (id == B) return new ProductB();
	    if (id == C) return new ProductC();
	    return nullptr;
    }
{% endhighlight %}

If the only purpose of the subclasses is to override the factory method, the C++ template mechanism can be used to avoid the subclasses definition reducing the design
complexity. The following C++ code shows a template Creator class returning the product specified by the template argument.

{% highlight cpp %}
//The object Creator
class Creator {
    public:
    //factory method
    virtual Product* makeProduct () = 0;
    
    void doSomething() {
        Product* p1 = makeProduct();
        p1->operation();
    }
};

template <class T>
class TemplatizedCreator : public Creator{
    public:
    //factory method
    virtual Product* makeProduct ();
   
};

template <class T>
Product* TemplatizedCreator<T>::makeProduct (){
	 return new T();
}

{% endhighlight %}

## Abstract factory

The Abstract Factory provides an interface for creating families of related or dependent objects without specifying their concrete classes. Abstract factories are usually
implemented using a set of factory methods.

{% highlight cpp %}
//The object Creator
class AbstractFactory {

      public:

      AbstractFactory ();
																										
      virtual Product* makeProductA () const {
    	    return new ProductA();
      }

      virtual Product* makeProductB () const {
    	    return new ProductB();
      }

      virtual Product* makeProductC () const {
    	    return new ProductC();
      } 
};


{% endhighlight %}

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
