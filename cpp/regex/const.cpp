#include <iostream>

class MyClass
{
private:
    int counter;
public:
    void Foo()
    { 
        counter=2;
        std::cout << "Foo" << std::endl;    
    }

    void Foo() const
    {
        int x=counter;
           counter=2;
        std::cout << "Foo const" << std::endl;
    }

};

int main()
{
    MyClass cc;
    const MyClass& ccc = cc;
    cc.Foo();
    ccc.Foo();
}