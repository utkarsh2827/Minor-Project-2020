import matplotlib.pyplot as plt
import numpy as np 
import operator as op
from nltk.corpus import stopwords
import plotly.graph_objs as go
import plotly
import wave
import contextlib


def audio_analysis(audio_path):
	text_dict={}
	ans=[]
	count=0
	
	fname = audio_path
	with contextlib.closing(wave.open(fname,'r')) as f:
	    frames = f.getnframes()
	    rate = f.getframerate()
	    time = frames / float(rate)
	    

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
		count=count+1

	speaking_rate=count/time
	ans.append(speaking_rate)

	sort_list=sorted(text_dict.items(),key=op.itemgetter(1),reverse=True)
	max_words=sort_list[:10]

	ans.append(sort_list)

	words=list(list(zip(*max_words))[0])
	frequency=list(list(zip(*max_words))[1])

	h={}
	h['data']=frequency
	result={}
	result['labels']=words
	result['datasets']=h
    
	ans.append(result)
	# y_position=np.arange(len(words))


	# data = [go.Bar(x = words,y = frequency)]
	# fig = go.Figure(data=data, layout={'title':{'text': "FREQUENCIES OF THE MOST USED WORDS"}})
	# # fig.show()

	# html_string=plotly.io.to_html(fig)

	# ans.append(html_string)
	# # print(ans[0])
	# # print(ans[1])
	return ans

#audio_analysis()