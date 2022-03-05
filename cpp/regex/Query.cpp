/*Gilad Fuchs 203254370
Matan Mabary  305266652 */

#include "Query.h"
#include "TextQuery.h"
#include <memory>
#include <set>
#include <algorithm>
#include <iostream>
#include <cstddef>
#include <iterator>
#include <stdexcept>
#include <regex>
using namespace std;
////////////////////////////////////////////////////////////////////////////////
std::shared_ptr<QueryBase> QueryBase::factory(const string& s)
{
  //Regex with the 5 options
  regex words_regex("^\\s*([\\w']+)\\s*$");
  regex NOT_words_regex("^\\s*NOT\\s+([\\w']+)\\s*$"); 
  regex AND_words_regex("^\\s*([\\w']+)\\s+AND\\s+([\\w']+)\\s*$");
  regex OR_words_regex("^\\s*([\\w']+)\\s+OR\\s+([\\w']+)\\s*$");
  regex N_words_regex("^\\s*([\\w']+)\\s+(\\d+)\\s+([\\w']+)\\s*$");
  smatch match,match_or,match_not,match_and,match_n;

  //find the correct expression that the user input 
   if (regex_search(s , match, words_regex))   return std::shared_ptr<QueryBase>(new WordQuery(match.str(1)));
   else if(regex_search(s , match_not, NOT_words_regex))   return std::shared_ptr<QueryBase>(new NotQuery(match_not.str(1)));
   else if(regex_search(s , match_and, AND_words_regex)) return std::shared_ptr<QueryBase>(new AndQuery(match_and.str(1),match_and.str(2)));
   else if(regex_search(s , match_or, OR_words_regex)) return std::shared_ptr<QueryBase>(new OrQuery(match_or.str(1),match_or.str(2)));
   else if(regex_search(s , match_n, N_words_regex)) return std::shared_ptr<QueryBase>(new NQuery(match_n.str(1),match_n.str(3),stoi(match_n.str(2))));
   else  throw invalid_argument("Unrecognized search");}
////////////////////////////////////////////////////////////////////////////////
QueryResult NotQuery::eval(const TextQuery &text) const
{
  QueryResult result = text.query(query_word);
  auto ret_lines = std::make_shared<std::set<line_no>>();
  auto beg = result.begin(), end = result.end();
  auto sz = result.get_file()->size();
  
  for (size_t n = 0; n != sz; ++n)
  {
    if (beg==end || *beg != n)
		  ret_lines->insert(n);
    else if (beg != end)
		  ++beg;
  }
  return QueryResult(rep(), ret_lines, result.get_file());
    
}

QueryResult AndQuery::eval (const TextQuery& text) const
{
  QueryResult left_result = text.query(left_query);
  QueryResult right_result = text.query(right_query);
  
  auto ret_lines = std::make_shared<std::set<line_no>>();
  std::set_intersection(left_result.begin(), left_result.end(),
      right_result.begin(), right_result.end(), 
      std::inserter(*ret_lines, ret_lines->begin()));

  return QueryResult(rep(), ret_lines, left_result.get_file());
}

QueryResult OrQuery::eval(const TextQuery &text) const
{
  QueryResult left_result = text.query(left_query);
  QueryResult right_result = text.query(right_query);
  
  auto ret_lines = 
      std::make_shared<std::set<line_no>>(left_result.begin(), left_result.end());

  ret_lines->insert(right_result.begin(), right_result.end());

  return QueryResult(rep(), ret_lines, left_result.get_file());
}
/////////////////////////////////////////////////////////
QueryResult NQuery::eval(const TextQuery &text) const
{
  QueryResult left_result = text.query(left_query);
  QueryResult right_result = text.query(right_query);
  
  auto ret_lines = std::make_shared<std::set<line_no>>();
  
  std::set_intersection(left_result.begin(), left_result.end(),
      right_result.begin(), right_result.end(), 
      std::inserter(*ret_lines, ret_lines->begin()));
      
  regex words_regex("([\\w']+)");
  
  for (auto start = ret_lines->begin(); start != ret_lines->end();){
	
		auto curr = start++;
    // take the full line from the vector
		const string currStr = left_result.get_file()->at(*curr);
		//define varibles
		istringstream tokenStream(currStr);
		string token;
		char del = ' ';
		size_t counter = 0;
		size_t counterOfLeft = 0;
		size_t counterOfRight = 0;
		bool leftOk, rightOk = false;
		bool b = false;

		while (getline(tokenStream, token, del)) {
		  
			auto words_begin = std::sregex_iterator(token.begin(), token.end(), words_regex);
			auto words_end = std::sregex_iterator();

			if (std::distance(words_begin, words_end) > 0)
				token = (*words_begin)[1].str();
      //check if the right and left words are appeared
			if (token.compare(left_query) == 0) {
			  counterOfLeft = counter;
				leftOk = true;
			} else if(token.compare(right_query) == 0) {
			  counterOfRight = counter;
				rightOk = true;
			}
      //check if there is more than n words between the two words .
			if (abs((int) (counterOfLeft - counterOfRight)) <= dist + 1 && rightOk && leftOk) {
				b = true;
				break;
			}
			
			b = false;
			counter++;
		}
		//if the terms do not happened we erase the line.
		if (!b)
			ret_lines->erase(curr);
	}

  return QueryResult(rep(), ret_lines, left_result.get_file());
   
}
/////////////////////////////////////////////////////////