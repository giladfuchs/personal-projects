

#include <memory>
#include <set>
#include <algorithm>
#include <iostream>
#include <cstddef>
#include <iterator>
#include <stdexcept>
#include <regex>
#include <sstream>
using namespace std;
void a(string s){
    char a = 'a';
    string aa = "aa";
    string str;
for(int i=0;i<s.length()-1;++i){
    if(s.at(i) !=a && s.at(i+1) != a)
    str.append(s.at(i)+aa);

}
cout<<str<<endl;

}


int main(){
    a("fdsfsdfds");
vector<int> v = {10,20,30,10};
vector<int> v2{2,3};
unique_copy(v.begin(),v.end(),v2.end());
for (auto &i : v2) // i is a reference
i *= i;
vector<int> v3( 3); 
for (decltype (v2.size()) i=0; i != v2.size(); ++i)
cout << v2[i] << " ";
int coun=0;
auto beg=v2.begin(),en=v2.end();

//for (auto i = v2.begin(); i != v2.end(); ++i)
//cout << *i << " ";
/*    
int x=1;
int y=2;
int &z=y;
vector<int> v1{1,1,3,1,3,1}; 
for_each(v1.begin(), v1.end(),
[](int a){x+=a; });

cout<<x<<endl;
vector<int> v2{2,2,2};
unique_copy(v1.cbegin(),v1.cend(),back_inserter(v2));
*/
// for (auto i  =v2.begin() ; i !=v2.end()+4; ++i)
// cout << *i << " ";
 string input;

//regex pat("abc");
cout<<"Enter text:"<<endl;
//regex pat(R"(((^|, )(part1|part2|part3))+$)"); // String literals: "a\\n"
//regex pat(R"(((\s|:|,)*(\d*))*)"); // Raw string literals: R"(a\n)"
//regex pat(R"([a-z]*s[^0-9]+)"); // would match 1111=2

regex pat {R"(\w{2}\s*\d{5}(-\d{4})?(-\d{2})?)"}; //postal code

smatch matches;

while (true){
cout<<"Enter text:"<<endl;
if(!(cin >> input)) break;
if (regex_search(input , matches, pat)) {
cout << ": " << matches[0] << '\n';
if (1 < matches.size() && matches[1].matched)
cout << "\t: " << matches[1] << '\n'; // sub-match
if (1 < matches.size() && matches[2].matched)
cout << "\t: " << matches[2] << '\n'; // sub-match
}else cout<<"No Match"<<endl;
cout<<matches.size()<<endl;
}
}
