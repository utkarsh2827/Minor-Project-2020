import os

def jrun(code, input_txt):
    f = open("Solution.java","w")
    f.write(code)
    f.close()
    status = os.system("javac Solution.java &>output.txt")

    if status!=0:
        return
    f = open("input.txt","w")
    f.write(input_txt)
    f.close()
    status = os.system("java Solution <input.txt &>output.txt")
