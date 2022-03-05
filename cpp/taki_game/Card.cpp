#include "Card.h"
//#define RANDOM
#define WINDOWS
#ifdef WINDOWS
#include <windows.h>
#endif
int Card::counter = 0;
using namespace std;
Card Card::generate_card() {
#ifdef RANDOM
	return Card(color(rand() % 4 + 1), sign(rand() % 13 + 1));
#else
	return Card(color(counter % 2 + 1), sign(counter % 5 + 8));
#endif

}
bool Card::is_legal(const Card& other) const {
	bool ret = false;
	ret |= (get_color() == other.get_color());
	ret |= (get_sign() == other.get_sign());
	return ret;
}
ostream& operator << (ostream &os, const Card &c) {
#ifdef WINDOWS
	HANDLE hstdout = GetStdHandle(STD_OUTPUT_HANDLE);

	// Remember how things were when we started
	CONSOLE_SCREEN_BUFFER_INFO csbi;
	GetConsoleScreenBufferInfo(hstdout, &csbi);

	switch (c.clr) {
	case color::R:
		SetConsoleTextAttribute(hstdout, 0x7C);
		break;
	case color::G:
		SetConsoleTextAttribute(hstdout, 0x7A);
		break;
	case color::B:
		SetConsoleTextAttribute(hstdout, 0x79);
		break;
	case color::Y:
		SetConsoleTextAttribute(hstdout, 0x7E);
		break;
	default:
		os << static_cast<int>(c.clr) << " error";
	}

	switch (c.s) {
	case sign::PLUS:
		os << "+";
		break;
	case sign::STOP:
		os << "STP";
		break;
	case sign::CD:
		os << "-><-";
		break;
	case sign::TAKI:
		os << "TAKI";
		break;
	default:
		os << static_cast<int>(c.s);
	}

	SetConsoleTextAttribute(hstdout, csbi.wAttributes);
#else
	switch (c.clr) {
	case color::R:
		os << "R-";
		break;
	case color::G:
		os << "G-";
		break;
	case color::B:
		os << "B-";
		break;
	case color::Y:
		os << "Y-";
		break;
	default:
		os << static_cast<int>(c.clr) << " error";
	}

	switch (c.s) {
	case sign::PLUS:
		os << "+";
		break;
	case sign::STOP:
		os << "STP";
		break;
	case sign::CD:
		os << "-><-";
		break;
	case sign::TAKI:
		os << "TAKI";
		break;
	default:
		os << static_cast<int>(c.s);
	}
#endif
	return os;
}
