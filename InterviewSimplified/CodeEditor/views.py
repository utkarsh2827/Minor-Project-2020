from django.shortcuts import render
from django.http import JsonResponse
from .compilers import main
from django.views.decorators.csrf import csrf_exempt
import os
# Create your views here.
def index(request):
    if request.method == "GET":
        return render(request,"CodeEditor/index.html",{})
    else:
        code = request.POST.get("code","")
        input_bla = request.POST.get("input_value","")
        f = open("main.py","w")
        f.write(code)
        f.close()
        f = open("input.txt","w")
        f.write(input_bla)
        f.close()
        # os.system("g++ main.cpp")
        os.system("python3 main.py < input.txt > output.txt")
        f = open("output.txt","r")
        output = f.read()
        f.close()
        os.system("rm main.py input.txt output.txt")
        return render(request,"CodeEditor/index.html",{"output":output})



@csrf_exempt
def execute(request):
    code = request.POST.get("code","")
    input_txt = request.POST.get("input_value","")
    lang = request.POST.get("lang","c")
    
    output = main.execute(code,lang, input_txt)
    return JsonResponse({"output":output})


