from .java import *
from .c import *
from .pyrun import *
from .cpp import *

def execute(code, lang="c", input_txt = ""):
    if lang == "c":
        crun(code, input_txt)

    elif lang=="cpp":
        cpprun(code,input_txt)

    elif lang == "java":
        jrun(code, input_txt)

    else:
        prun(code,input_txt)
    
    f = open("output.txt","r")
    output = f.read()
    f.close()
    return output