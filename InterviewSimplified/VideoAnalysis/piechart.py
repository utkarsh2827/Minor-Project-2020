from fer import Video
from fer import FER
import plotly
import plotly.graph_objects as go

def piechart(video_path):
    video_filename = video_path
    video = Video(video_filename)

    # Analyze video, displaying the output
    detector = FER(mtcnn=True)
    raw_data = video.analyze(detector, display=False)
    df = video.to_pandas(raw_data)
    # print(df)
    angry=df['angry'].mean()
    disgust=df['disgust'].mean()
    fear=df['fear'].mean()
    happy=df['happy'].mean()
    sad=df['sad'].mean()
    surprise=df['surprise'].mean()
    neutral=df['neutral'].mean()

    confused=(neutral+sad+fear)/3

    labels = ['Angry','Confused','Fear','Happy','Sad','Surprise','Neutral']
    values = [angry, confused, fear, happy, sad, surprise, neutral]
    h={}
    h['data']=values
    h['backgroundColor']=['#FF0000','#CC6600','#669900','#0066FF','#993366','#333300','#9999FF']
    h['hoverBackgroundColor']=['#FF0000','#CC6600','#669900','#0066FF','#993366','#333300','#9999FF']
    ans={}
    ans['labels']=labels
    lis=[]
    lis.append(h)
    ans['datasets']=lis
    return ans

    # fig = go.Figure(data=[go.Pie(labels=labels, values=values)])
    # #fig.show()
    # html_string=plotly.io.to_html(fig)
    # return html_string

# piechart()