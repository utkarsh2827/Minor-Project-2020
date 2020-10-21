import speech_recognition as sr
# Initialize recognizer class (for recognizing the speech)

def generate_text(audio_path):
    r = sr.Recognizer()
    # Reading Audio file as source
    # listening the audio file and store in audio_text variable
    file1=open("textfile.txt","w",encoding="utf-8")

    with sr.AudioFile(audio_path) as source: 
        audio_text = r.listen(source)
        
    # recoginize_() method will throw a request error if the API is unreachable, hence using exception handling
        try:
            # using google speech recognition
            text = r.recognize_google(audio_text)
            # print('Converting audio transcripts into text ...')
            file1.write(text)  
        except:
            print('Sorry.. run again...')
