from django.shortcuts import render
import os
# Create your views here.
def index(request):
    if request.method == "GET":
        return render(request,"CodeEditor/index.html",{})
    else:
        code = request.POST.get("code","")
        input_bla = request.POST.get("input_value","")
        f = open("main.cpp","w")
        f.write(code)
        f.close()
        f = open("input.txt","w")
        f.write(input_bla)
        f.close()
        os.system("g++ main.cpp")
        os.system("./a.out <input.txt >output.txt")
        f = open("output.txt","r")
        output = f.read()
        f.close()
        os.system("rm main.cpp input.txt output.txt")
        return render(request,"CodeEditor/index.html",{"output":output})