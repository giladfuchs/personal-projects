/*Gilad Fuchs 203254370
Matan Mabary  305266652*/
#include "Document.h"



    /* constructor */
Document ::	Document() : current_line(0),size(0)  {}    //constructor	
	
	/* print_all_lines */
    void Document :: print_all() 
    { 
        list <string> :: iterator it; 
        for(it = doc.begin(); it != doc.end(); ++it) 
            cout  << *it << endl; 
    } 
    
    /* print_line */
    void Document :: print_line(){
        if(current_line == 0)
            cout << "empty " <<endl;
	    else
	    {
	        list<string>::iterator it = doc.begin(); 
	        advance(it,current_line-1); 
	        cout<<*it << endl;  
	    }
	        
    }
    
    /* append line - after current_line */
    void Document :: append(string s){
        list<string>::iterator it = doc.begin(); 
        
        advance(it,current_line);
        doc.insert(it,s); 
        size++;
        current_line++;
    }
    
    /* insert line - before current_line */
    void Document :: insert(string s){
        list<string>::iterator it = doc.begin(); 
        advance(it,current_line-1);
        doc.insert(it,s); 
        size++;
        current_line++;
    }
	
	/* get_current_line */
	int Document :: get_current_line(){
	     return current_line;
	}
	
	/* set_current_line */
	void Document :: set_current_line(int new_current_line){
	     current_line = new_current_line;
         
	}
	
	/* get_size */
	int Document :: get_size(){
        return size;
    }
	
	/* get_size */
	void Document :: delete_line(){
        list<string>::iterator it = doc.begin(); 
        advance(it,current_line-1);
        doc.erase (it);
        if(current_line != 0 )
            current_line--;
        size--;
    }
    
    /* changes_line */
	void Document :: changes_line(string s){
        list<string>::iterator it = doc.begin(); 
        advance(it,current_line-1);
        *it = s;
        current_line++;
    }
    
    /* search_text */
	void Document :: search_text(string s){
        list <string> :: iterator it;
        list <string> :: iterator it2;
        it = doc.begin();
        it2 = doc.begin();
 
        advance(it,current_line-1);
        advance(it2,current_line-1);
        
        while(it != doc.end()) 
        {
            if (it->find(s) != string::npos) {
                ++current_line; 
                return;
            }
             ++it;
             ++current_line;
        }    
        current_line=0;
        for(it = doc.begin();it != it2; ++it) 
        {      ++current_line;
            if (it->find(s) != string::npos) {
                return;
            }
          
        }
    }
    
    /* replace_string */
	string Document :: replace_string(string s1,string s2){
	    
	    list<string>::iterator it = doc.begin(); 
	    advance(it,current_line-1);

        istringstream buf(*it);
        istream_iterator<string> beg(buf), end;
        vector<string> tokens(beg, end); 
    
        string result="";
        for(auto& s: tokens){
            if(s.compare(s1)==0)
                s = s2;
            if(result=="")
                result += s;
            else
                result = result + " " + s;
        }
        delete_line();
        append(result);
        return result;
	}
    
