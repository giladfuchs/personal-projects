/*Gilad Fuchs 203254370
Matan Mabary  305266652*/
#include "Document.h"
#include <algorithm>

class Editor{
private:
    Document *file;
    string Line;
   
       	void  replace(string );
     	void  search(string );
       void  insert();
       void  append();
       void  change();
       void  set_line(string );
       bool   is_number(const string&);
       	void check(string& );
 public:
   void loop();
   Editor();
   ~Editor();
};