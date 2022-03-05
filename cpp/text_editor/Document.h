/*Gilad Fuchs 203254370
Matan Mabary  305266652*/
#include <string>
#include <iostream>
#include <vector>
#include <list>
#include <sstream>
#include <iterator>

using namespace std;

class Document {	
private:
	int current_line;
	list<string> doc;
	int size;
    public:
    void append(string);
    Document();
    void print_all();
    void print_line();
    void  current_line_toString();
    void  set_current_line(int);
    int get_current_line();
    int  get_size();
    void delete_line();
    void changes_line(string);
    void search_text(string );
    string replace_string(string ,string );
    void insert(string);
   
    
};