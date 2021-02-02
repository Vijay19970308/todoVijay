function * fun(){
    name:"vijayKumar";
    func:function x(){
        console.log(this.name);
    }
}

const callfun = fun();
callfun();