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
			tag_directory[ques] = {"company":[], "topic":[]}
		tag_directory[ques]["company"].append(company)

topics = pd.read_csv("topic_i.csv")

topics = topics["TOPICS"].values.tolist()

print(topics)

for topic in topics:
	questions = pd.read_csv(f"./topic_i/{topic}.csv")
	questions = questions['Question'].values.tolist()
	for ques in questions:
		if ques not in tag_directory:
			tag_directory[ques] = {"company":[], "topic":[]}
		tag_directory[ques]["topic"].append(topic)

f = open("../InterviewSimplified/InterviewBit.json","w")
f.write(json.dumps(tag_directory))
f.close()
print("Completed!")
