const checkNull=(input)=>{
    if(input===""){
        return false;
    }
    return true;
}
const checkLoading=(id)=>{
    var tagLoad=document.createElement("span");
    tagLoad.className="loader";
    id=String(id);
    var icon1=document.getElementsByClassName("item"+id)[0].innerHTML="";
    document.getElementById(id).appendChild(tagLoad);
}
export { checkNull , checkLoading}