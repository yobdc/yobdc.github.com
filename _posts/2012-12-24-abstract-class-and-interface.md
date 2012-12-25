---
layout: post
title: "Abstract Class And Interface"
description: ""
category: 
tags: [C#]
---
{% include JB/setup %}

Abstract Class and Interface are similar in some ways. However, they are in different uses.
Abstract Class
Abstract Class is a kind of class, a special one. That means it has most of the features that a normal class has, such as field, detailed implemented methods, etc. But there are some differences between abstract class and a normal class.
Abstract class can have abstract methods, while a normal class can not. A abstract method can only be declared in abstract class without detailed implementation. And it is supposed to be override in the derived class.
Abstract class cannot be instantiated. One can never new an object like "var obj = new MyAbstractClass()".
Interface
Interface cannot be instantiated as well. A class can derive from several interfaces, and derived class must implement all declared methods in intefaces. Interface can only have methods properties, indexers, events. That means it cannot have constructors, destructors, static members, fields, const variables.

Summary
Abstract class is like something you call it animal. You don¡¯t know what type of animal it is, so you cannot instantiate it. When a class derives from animal like a horse, a dog, you can instantiate a horse. There is an abstract method in animal named Sleep(), for all animals have the action of sleep. There is an interface of IMove with a method of Move(). God implements it, Horse implememts it. And they have different implementation of Move().

Abstract class is what it is like, and interface is what it is able to do.