import os

def cpprun(code, input_txt):
    f = open("solution.cpp","w")
    f.write(code)
    f.close()
    status = os.system("g++ solution.cpp &>output.txt")

    if status!=0:
        return
    f = open("input.txt","w")
    f.write(input_txt)
    f.close()
    status = os.system("./a.out <input.txt &>output.txt")
    os.system("rm solution.* a.out input.txt")