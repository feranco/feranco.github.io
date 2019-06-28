
https://stackoverflow.com/questions/25020129/cin-ignorenumeric-limitsstreamsizemax-n
https://stackoverflow.com/questions/25475384/when-and-why-do-i-need-to-use-cin-ignore-in-c


 //remove punctuation
 string document, output;
  remove_copy_if(begin(document), end(document), back_inserter(output), [](char c){ 
    return ispunct(c); });
    
    //remove capital letters
  transform(document.begin(), document.end(), document.begin(), ::tolower);
  
    stringstream ssIn(document), ssOut;
  
  //remove multiple whitespaces
  copy(istream_iterator<string>(ssIn),
         istream_iterator<string>(),
         ostream_iterator<string>(ssOut, " "));
