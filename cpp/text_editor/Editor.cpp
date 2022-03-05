/*Gilad Fuchs 203254370
Matan Mabary  305266652*/

#include "Editor.h"

enum string_code {
    append,
    printLine,
    printAll,
    lineNum,
    erase,
    change,
    insert,
    searchf,
    replacef,
    quit
};
string_code hashit (string const& inString) {
    if (inString == "%p") return printAll;
    if (inString == "p") return printLine;
    if (inString == "a") return append;
    if (inString == "n") return lineNum;
    if (inString == "d" ) return erase;
    if (inString == "i") return insert;
    if (inString == "c") return change;
    if(inString.at(0) == '/') return searchf;
    if(inString.at(0) == 's') return  replacef;
     if (inString == "Q") return quit;
}
   Editor :: Editor() {
        file=new Document();
    }
   Editor :: ~Editor() {
        delete file;
    }
	void  Editor:: loop(){
	    string input; 
	    while(getline(cin,input)) // To get you all the lines.
            check(input);
	}
	
	void  Editor :: check(string& s){
    
  switch (hashit(s)) {
	    case string_code::append:
		append();
		break;

        case string_code::printAll:
		  file->print_all();
		break;

        case string_code::printLine:
		file->print_line();
		break;

        case string_code::erase:
        file->delete_line();
		break;

        case string_code::change:
		change();
		break;

        case string_code::insert:
		insert();
        break; 

        case string_code::lineNum:
         cout<<file->get_current_line() << '\t' ; 
             file->print_line();
        break;

        case string_code::quit:
		return;
        break; 

        case string_code::searchf:
		search(s); 
        break; 

        case string_code::replacef:
		replace(s);
        break; 
   }
	    if(is_number(s))
	        set_line(s);
	}
	
	/* check if its a number */
	bool  Editor:: is_number(const string& s)
    {
        return !s.empty() && std::find_if(s.begin(), 
            s.end(), [](char c) { return !std::isdigit(c); }) == s.end();
    }
    
    /* set  current line to a another line  */
	void  Editor:: set_line(string s){
	 
        int number = stoi(s);
        if(number >=0 && number <= file->get_size()){
            file->set_current_line(number);
            file->print_line();
        }
        else
         cout << "the number "<< s << " is out of range" << endl;
	}
	
	/* change line */
	void  Editor:: change(){
        while(getline(cin,Line) && Line.compare(".") != 0) // To get you all the lines.
            file->changes_line(Line);
        
	}
	
    /* append all lines - after current_line */
	void  Editor:: append(){
	    
        while(getline(cin,Line) && Line.compare(".") != 0) // To get you all the lines.
            file->append(Line);
	}
	
	/* insert all lines - before current_line */
	void  Editor:: insert(){
        while(getline(cin,Line) && Line.compare(".") != 0) // To get you all the lines.
            file->insert(Line);
        
	}
	
	/* find a string in all the lines
	    prints all the lines that contains the string */
	void  Editor:: search(string s){
	    string str = s.substr(1); 
        file->search_text(str);
        file->print_line();
	}
	
	/* find the string in the current line
	    return the line that contains the string */
	void  Editor:: replace(string s){
	    size_t n = count(s.begin(), s.end(), '/');
        if (n != 3)
            return;
        
	    string delimiter = "/";
	    s = s.substr(2, s.size());

        string s1 = s.substr(0, s.find(delimiter)); 
        s = s.substr(s.find(delimiter)+1, s.size());
      
        string s2 = s.substr(0, s.find(delimiter));
        s = s.substr(s.find(delimiter)+1, s.size());

        s2= file->replace_string(s1,s2);
	}
	
	

	

