import os

def prun(code, input_txt):
    f = open("solution.py","w")
    f.write(code)
    f.close()
    f = open("input.txt","w")
    f.write(input_txt)
    f.close()
    os.system("python solution.py  &>output.txt")