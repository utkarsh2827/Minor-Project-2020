import matplotlib.pyplot as plt
import numpy as np 
import operator as op
from nltk.corpus import stopwords
import plotly.graph_objs as go
import plotly


def create_bar_graph():
	text_dict={}

	stop_list=list(stopwords.words("english"))

	with open('textfile.txt','r',encoding='utf-8') as f:
		list1=f.read().lower().split()

	for i in range(0,len(list1)):
		list1[i]=list1[i].strip('.,;:?!\\|/$#+*()')

	for word in list1:
		if word not in stop_list:
			if word in text_dict:
				text_dict[word]=text_dict[word]+1
			else:
				text_dict[word]=1

	sort_list=sorted(text_dict.items(),key=op.itemgetter(1),reverse=True)
	max_words=sort_list[:10]

	words=list(zip(*max_words))[0]
	frequency=list(zip(*max_words))[1]

	y_position=np.arange(len(words))


	data = [go.Bar(x = words,y = frequency)]
	fig = go.Figure(data=data, layout={'title':{'text': "FREQUENCIES OF THE MOST USED WORDS"}})
	fig.show()
	# plotly.io.write_html(fig,"h.html")
	# return
	html_string=plotly.io.to_html(fig)
	return html_string



# create_bar_graph()
# print(x)
