import requests
from bs4 import BeautifulSoup
import pandas as pd
headers = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0", "Accept-Encoding":"gzip, deflate", "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "DNT":"1","Connection":"close", "Upgrade-Insecure-Requests":"1"}


company={}
topic={}

bad_chars = ['/', '\\', ':', '*' ,'?', "\"", "<", ">", "|", "/n","’"]




# company??????????????????????????????????????????????????????????????????????????????????????0


r = requests.get("https://www.geeksforgeeks.org/must-coding-questions-company-wise/", headers=headers)
content = r.content
soup = BeautifulSoup(content,'lxml')

l=[]
count=25
for d in soup.findAll('div',attrs={'class':'entry-content'}):
	for t in d.findAll('li'):
		if count==0:
			break
		l.append(t.text)
		count=count-1
# print(l)



count=len(soup.findAll('ol'))-1

x=0
for d in soup.findAll('ol'):
	if count!=1:
		company[str(l[x])]=[]
		for t in d.findAll('li'):
			link=t.find('a')
			ln=link.get('href')
			if(ln==""):
				continue
			else:
				store=t.text
				for m in bad_chars :
					store=store.replace(m, '')
				company[str(l[x])].append(store)


				file1=open(store+".txt","w",encoding="utf-8")
				rh = requests.get(link.get('href'), headers=headers)
				contenth = rh.content
				souph = BeautifulSoup(contenth,'lxml')
				for dh in souph.findAll('div', attrs={'class':'problem-statement'}):
					for g in dh.findAll('span', attrs={'style':'font-size:18px'}):
						file1.write(g.text)
						file1.write("\n")
					for g1 in dh.findAll('span', attrs={'style':'font-size:20px'}):
						file1.write(g1.text)
						file1.write("\n")

		count=count-1
		x=x+1
	else:
		break

# print(company)




# topic ??????????????????????????????????????????????????????????????????????????????????0

r2 = requests.get("https://www.geeksforgeeks.org/must-do-coding-questions-for-companies-like-amazon-microsoft-adobe/", headers=headers)
content2 = r2.content
soup2 = BeautifulSoup(content2,'lxml')

l2=[]
count2=14
for d2 in soup2.findAll('div',attrs={'class':'entry-content'}):
	for t2 in d2.findAll('li'):
		if count2==0:
			break
		l2.append(t2.text)
		count2=count2-1
# print(l2)

counto=len(soup2.findAll('ol'))-4
x=0
for do in soup2.findAll('ol'):
	if counto!=1:
		topic[str(l2[x])]=[]
		for to in do.findAll('li'):
			linko=to.find('a')
			lno=linko.get('href')
			if(lno==""):
				continue
			else:
				storeo=to.text
				for mo in bad_chars:
					storeo=storeo.replace(mo, '')
				topic[str(l2[x])].append(storeo)
			


				file2=open(storeo+".txt","w",encoding="utf-8")
				rh1 = requests.get(linko.get('href'), headers=headers)
				contenth1 = rh1.content
				souph1 = BeautifulSoup(contenth1,'lxml')
				for dh1 in souph1.findAll('div', attrs={'class':'problem-statement'}):
					for g1 in dh1.findAll('span', attrs={'style':'font-size:18px'}):
						file2.write(g1.text)
						file2.write("\n")
					for go1 in dh1.findAll('span', attrs={'style':'font-size:20px'}):
						file2.write(go1.text)
						file2.write("\n")


		counto=counto-1
		x=x+1
	else:
		break

# print(topic)


company_names=list(company.keys())
topic_names=list(topic.keys())
for i in range(0,len(company_names)):
	df2 = pd.DataFrame({'COMPANIES':company_names})
	df2.to_csv("companies_g.csv", index=False, encoding='utf-8')

for i in range(0,len(topic_names)):
	df2 = pd.DataFrame({'TOPICS':topic_names})
	df2.to_csv("topic_g.csv", index=False, encoding='utf-8')

topic1=list(map(list, topic.items()))
company1=list(map(list, company.items()))
for i in range(0,len(topic1)):
	df2 = pd.DataFrame({'Question':topic1[i][1]})
	df2.to_csv(topic1[i][0]+".csv", index=False, encoding='utf-8')

for i in range(0,len(company1)):
	df2 = pd.DataFrame({'Question':company1[i][1]})
	df2.to_csv(company1[i][0]+".csv", index=False, encoding='utf-8')