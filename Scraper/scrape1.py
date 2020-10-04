import requests
from bs4 import BeautifulSoup
import pandas as pd
headers = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0", "Accept-Encoding":"gzip, deflate", "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "DNT":"1","Connection":"close", "Upgrade-Insecure-Requests":"1"}


#?????????????????????????????????????????????????????????????????????????????????????????????????


r = requests.get("https://www.interviewbit.com/coding-interview-questions/", headers=headers)
content = r.content
soup = BeautifulSoup(content,'lxml')

bad_chars = ['/', '\\', ':', '*' ,'?', "\"", "<", ">", "|","\n                      \n","\n"]

topic={}
company={}
for tr in soup.find_all('tr')[1:]:
	
	tds=tr.find_all('td')

	ques=tds[1].text
	for i in bad_chars :
		ques = ques.replace(i, '')

	# for topic wise
	if tds[3].text in topic:
		topic[tds[3].text].append(ques)
	else:
		topic[tds[3].text]=[ques]

	#for company wise
	for i in tds[4].find_all('a'):
		link=i.get('href')
		link=link.replace("/search/?q=",'')
		if link in company:
			company[link].append(ques)
		else:
			company[link]=[ques]


	file1=open(ques+".txt","w",encoding="utf-8")
	qhelp=tds[1].find('a')
	qlink=qhelp.get('href')
	# print(qlink)

	#for questions
	r = requests.get("https://www.interviewbit.com"+qlink, headers=headers)
	content = r.content
	soup = BeautifulSoup(content,'lxml')
	for d in soup.findAll('div', attrs={'id':'problem-content','class':'markdown-content'}):
		store=d.text
		store=store.replace("NOTE: You only need to implement the given function. Do not read input, instead use the arguments to the function. Do not print the output, instead return values as specified.",'')
		store=store.replace("Still have a doubt? Checkout Sample Codes for more details.",'')
		store=store.replace("          ",'')
		file1.write(store)



company_names=list(company.keys())
topic_names=list(topic.keys())
for i in range(0,len(company_names)):
	df2 = pd.DataFrame({'COMPANIES':company_names})
	df2.to_csv("companies_i.csv", index=False, encoding='utf-8')

for i in range(0,len(topic_names)):
	df2 = pd.DataFrame({'TOPICS':topic_names})
	df2.to_csv("topic_i.csv", index=False, encoding='utf-8')


topic1=list(map(list, topic.items()))
company1=list(map(list, company.items()))
for i in range(0,len(topic1)):
	df2 = pd.DataFrame({'Question':topic1[i][1]})
	df2.to_csv(topic1[i][0]+".csv", index=False, encoding='utf-8')

for i in range(0,len(company1)):
	df2 = pd.DataFrame({'Question':company1[i][1]})
	df2.to_csv(company1[i][0]+".csv", index=False, encoding='utf-8')
