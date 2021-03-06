---
layout: post
title: Regular expressions in C++
categories:
  - Programming
tags:
  - C++
  - Regex
last_modified_at: 2018-07-14T09:55:59-05:00
---

A regular expression is a string that uses special characters, named metacharacters, in combination with ordinary characters to create a text pattern. That pattern can then be used to match another string, search it, or identify a substring as the target of a search-and-replace function.

## Metacharacters

Each metacharacter can be escaped with **\\**; \'\\.\' match the point character; \'\\([a-zA-Z]+\\)\' match any word within parenthesis.

* **^** match a *position*, corresponding to the beginning of the target string; 
  - *^dog* match the beginning of a string followed by dog
* **$** match a *position*, corresponding to the end of the target string; 
  - *^dog$* match the beginning of a string followed by dog followed by the end of the string; $^match an empty line
* **\[ \]** match any character listed in the class. It is possible to specify intervals of characters using the dash '-'. Since the dash is a metacharacter within a character class, to include the dash as character inside the class it is necessary to specify it immediately after the \[.   
  - *\[0-3a-c\]* has the same behavior of \[0123abc\];
  - *12\[-./\]11\[-./\]1981* match my birthday in the most common formats; 
  - *\[0-9\]* match any digit (\d or \[:digit:\] in ECMA flavor); 
  - *\[\_0-9a-zA-Z\]* match any alphanumeric character plus the underscore (\w or [\_[:alnum:]] in ECMA flavor)
* **\[^ \]** match any character not listed in the class. The caret ^ is a metacharacter within a character class, so to include the caret  as character inside the class it is necessary to specify it not immediately after the \[; 
  - *q\[^u\]* match any word having a q followed by any character that is not u, but doesn't match a q that is at the end of a line (even     if negated, a character class requires a character to match);  
  - *\[^0-9]* match any character except digits (\D or \[^:digit:] in ECMA flavor); 
  - *<\[^>\]>* match any TAG;
  - \\((\[ˆ()]+)\\) match whatever is included inside a couple of parenthesis (alla characters, except another parenthesis).
* **.** match any character; 
* **\|** match either the subexpression on the left or the subexpression on the right (in this context subexpression means any regular expression), the () parenthesis can be used to limit the alternation to their content; 
  - *^(From\|Subject\|Date):* match the beginning of a line followed by From or Subject or Date, followed by :
* **\< \>** in egrep flavor or **\b** in ECMA flavor match word boundaries; 
  - *\bcat\b* match cat but not category
* **\( \)** create a backreference to the match with the subexpression included within the parenthesis. Each backreference is numbered according to the order of appearance of their opening parenthesis, starting from 1. Most of advanced programming languages provide a way to refer to the text matched by parenthesized subexpressions from code outside of the regular expression, once a match has been successfully completed.
  - *\<(\[A-Za-z\]+) +\1\>* match any repeated word in egrep (\1 is the backreference subexpression matching a generic word included within the parenthesis) with false positives like the theater
* **\(?: \)** group a subexpression without creating a backreference; this increase the efficiency if the parenthesis are used only to limit an alternation or to apply a quantifier.
  - *(\[-+]?\[0-9]+(?:\.[0-9]+)?)* match a number with optional fractional part, without creating a backreference to the optional fractional part.

## Quantifiers

* **?** make the preceeding item optional, matching it 0 or 1 times; 
  - *\$[0-9]+(?:\\.\[0-9]\[0-9])?* match any dollar amount with two optional decimal
* **\*** match the preceeding item 0 or more times;
* **\+** match the preceeding item 1 or more times;
* **\{min,max\}** match the preceeding item at least min times, but not more than max times

## Observation

* it is important not to confuse alternation with a character class. When the alternation is used between single characters it is identical to the character class ([abc] and (a\|b\|c) mean the same thing). Anyway a character class can match exactly one character, while an alternation can match arbitrarily long subexpressions unrelated each other.
* Aa character class has a sub language different from the main regex language, so metacharacters can have a different meaning inside a character class.
  - *\\b* match a backspace inside a character class and a word boundary outside
* some metacharacters do not match a character in the target string, but a *position* in the target string. Examples:
  - \b 

## Options

* ignoring capitalization: -i in egrep, /i in perl, regex_constants::icase in c++11. When used in a search and replace regex, this option applies only for matching and not for replacing.
  -


[comment]: # (http://www.informit.com/articles/article.aspx?p=2079020)

[comment]: # (https://solarianprogrammer.com/2011/10/12/cpp-11-regex-tutorial/)

[comment]: # (https://www.geeksforgeeks.org/regex-regular-expression-in-c/)

[comment]: # (https://stackoverflow.com/questions/30921932/understanding-c-regex-by-a-simple-example/30922295)

[comment]: # (https://objectcomputing.com/resources/publications/sett/july-2013-c11-regex-library/)

[comment]: # (https://www.regular-expressions.info/stdregex.html)

[comment]: # (http://www.rexegg.com/regex-uses.html uses, applications)

** C++

Every regular-expression operation begins by initializing a regex object with a pattern; this object can then be given as input to regex_match or regex_search. Creating a regex object builds a regular-expression engine, which is compiled at runtime (!), so for best performance, create as few new regular expression objects as you need to.

Call std::regex_search() with your subject string as the first parameter and the regex object as the second parameter 
to check whether your regex can match any part of the string. The regex [0-9]+ match strings containing at least one digit (both 624 and 62b). The regex
^[0-9]+$ is needed to match strings containing only digits.  

Call std::regex_match() with the same parameters if you want to check whether your regex can match the entire subject string. The regex_match algorithm in C++11
will return true only if the target string match exactly the regular expression. The regex [0-9]+ match strings containing only digits (624 and not 62b).
