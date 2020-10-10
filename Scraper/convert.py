import pandas as pd
import json

companies = pd.read_csv("companies_i.csv")

companies = companies['COMPANIES'].values.tolist()

print(companies)

tag_directory ={}

for company in companies:
	questions = pd.read_csv(f"./companies_i/{company}.csv")
	questions = questions['Question'].values.tolist()
	for ques in questions:
		if ques not in tag_directory:
			tag_directory[ques] = []
		tag_directory[ques].append(company)

f = open("InterviewBit.json","w")
f.write(json.dumps(tag_directory))
f.close()
print("Completed!")
