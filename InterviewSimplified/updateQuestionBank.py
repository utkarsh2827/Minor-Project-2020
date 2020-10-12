import json
from QuestionBank.models import Questions

f = open("InterviewBit.json","r")
tag_directory = json.loads(f.read())
f.close()

for ques in tag_directory:
	q = Questions(name = ques, path = "/files/questions_i/"+ques+".txt")
	q.save()
	for tag in tag_directory[ques]:
		q.tags.add(tag)
	q.save()

print(Questions.objects.first().tags)