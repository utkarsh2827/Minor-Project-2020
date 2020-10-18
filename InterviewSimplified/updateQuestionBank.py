import json
from QuestionBank.models import *

topics = set(['', 'Tree Data Structure', 'Bit Manipulation', 'SQL Programming', 'Dynamic Programming', 'Hashing', 'Regex and Functions', 'Linked Lists', 'Puzzles', 'Backtracking', 'Graph Data Structure & Algorithms', 'Time Complexity', 'Arrays', 'Heaps And Maps', 'Two Pointers', 'Basic Shell Commands', 'Strings', 'System Design Interview Questions', 'Math', 'Greedy Algorithm', 'Stacks And Queues', 'Storage Scalability', 'Binary Search'])
companies = set(['', 'Amazon', 'Microsoft', 'Facebook', 'Adobe', 'Google', 'Goldman Sachs', 'Bloomberg', 'VMWare', 'Apple', 'Yahoo', 'Grab', 'infoworks', 'Booking.com', 'DE Shaw', 'ThoughtWorks', 'Unbxd Inc.', 'Nvidia', 'HCL', 'Epic systems', 'LinkedIn', 'Directi', 'Ebay', 'Twitter', 'Samsung', 'IBM', 'Morgan Stanley', 'Intel', 'Codenation', 'Snapdeal', 'Liv.ai', 'ajio', 'Delhivery', 'deshaw', 'InMobi', 'Qualcomm', 'NetApp', 'Oracle', 'Amtel', 'Infosys', 'Groupon', 'Paypal', 'Riverbed', 'JP Morgan', 'Model N', 'Hunan Asset', 'EzCred', 'Flipkart', 'Citigroup', 'Expedia', 'United Healthgroup', 'Wipro', 'Agilent systems', 'Intuit', 'Cisco', 'Amazon Lab126', 'Zenefits', 'Jabong', 'Zillow', 'Housing', 'Walmart labs', 'Coursera', 'Fab', 'Chronus', 'Ola Cabs', 'Dropbox'])

for topic in topics:
	q = TopicTag(name = topic)
	q.save()

for company in companies:
	q = CompanyTag(name = company)
	q.save()



f = open("InterviewBit.json","r")
tag_directory = json.loads(f.read())
f.close()

for ques in tag_directory:
	q = Questions(name = ques, path = "/files/questions_i/"+ques+".txt")
	q.save()
	for tag in tag_directory[ques]["company"]:
		q.company_tags.add(CompanyTag.objects.get(name = tag))
	if len(tag_directory[ques]["company"])<1:
		q.company_tags.add(CompanyTag.objects.get(name = ''))
	for tag in tag_directory[ques]["topic"]:
		q.topic_tags.add(TopicTag.objects.get(name = tag))
	if len(tag_directory[ques]["topic"])<1:
		q.topic_tags.add(TopicTag.objects.get(name = ''))

print(Questions.objects.first().company_tags)
print(Questions.objects.first().topic_tags)