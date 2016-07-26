scrollbot = function(e,w){
  var _this = this;
  this.orgPar = document.querySelector(e);
  if(w == undefined){
    this.sbw = 10;
  }else{
    this.sbw = w;
  }
  this.parContent = this.orgPar.innerHTML;
  this.orgPar.innerHTML = "";
  this.newPar = document.createElement("div");
  this.sbContainer = document.createElement("div");
  this.sbHolder = document.createElement("div");
  this.sb = document.createElement("div");
  this.inP = document.createElement("div");
  this.newPar.className = "scrollbot-outer-parent";
  this.sbHolder.className = "scrollbot-scrollbar-holder"; 
  this.sb.className = "scrollbot-scrollbar";
  this.inP.className = "scrollbot-inner-parent";
  this.newPar.style.position = "relative";
  this.newPar.style.height = "100%";
  this.newPar.style.overflow = "hidden";
  this.inPWidth = (this.orgPar.clientWidth - this.sbw) +"px";
  this.inP.style.cssText = "height:"+this.orgPar.style.height+";overflow-y:auto;overflow-x:hidden;padding-right:25px;width:"+this.inPWidth+";";
  this.inP.innerHTML = this.parContent;
  this.inP.style.height = this.orgPar.clientHeight + "px";
  this.newPar.appendChild(this.inP);
  this.sbHolder.appendChild(this.sb);
  this.newPar.appendChild(this.sbHolder);
  this.orgPar.appendChild(this.newPar);
  this.sbHeight = this.orgPar.clientHeight * 100 / this.inP.scrollHeight;
  this.mdown = false;
  this.onScroll = function(f){_this.onScrollF = f};
  this.scrollBar = {
    scrollBar : _this.sb,
    width:_this.sbw + "px",
    height:_this.sbHeight + "%",
    position:"absolute",
    right:0,
    top:0,
    backgroundColor:"grey",
    borderRadius:"15px"
  };

  this.scrollBarHolder = {
    scrollBarHolder : _this.sbHolder,
    width : _this.sbw + "px",
    height :"100%",
    position:"absolute",
    right:0,
    top:0,
    backgroundColor : "darkgrey",
    borderRadius : "15px"
  };


  for(_this.p in this.scrollBar){this.sb.style[_this.p] = this.scrollBar[_this.p]};
  for(_this.p in this.scrollBarHolder){this.sbHolder.style[_this.p] = this.scrollBarHolder[_this.p];}


  this.inP.onscroll = function(){
    _this.sb.style.top = _this.inP.scrollTop * 100 / _this.inP.scrollHeight + (_this.sbHeight-parseFloat(_this.scrollBar.height)) * _this.inP.scrollTop/(_this.inP.scrollHeight - _this.inP.clientHeight) + "%";
    _this.scrollBar.top = _this.sb.style.top;
    if("onScrollF" in _this){
      _this.onScrollF();
    }
  }

  this.sb.onmousedown = function(e){
    _this.mdown = true;
    _this.posCorrection = e.pageY - _this.sb.getBoundingClientRect().top;
    _this.btmCorrection = _this.sb.clientHeight*100/_this.newPar.clientHeight;
    return false;
  }
  this.orgPar.onmouseup = function(){_this.mdown = false;} 
  this.orgPar.onmousemove = function(e){ 
    if(_this.mdown){
      if (document.selection){document.selection.empty();}
      else{window.getSelection().removeAllRanges();}
      _this.relY = e.pageY - _this.newPar.getBoundingClientRect().top;
      _this.pC = (_this.relY-_this.posCorrection) * 100/ _this.newPar.clientHeight;
      if(_this.pC >= 0 && (_this.pC+_this.btmCorrection) <= 100){
        _this.sb.style.top = _this.pC + "%";
        _this.inP.scrollTop = (parseFloat(_this.sb.style.top) - (_this.sbHeight-parseFloat(_this.scrollBar.height)) * _this.inP.scrollTop/(_this.inP.scrollHeight - _this.inP.clientHeight)) * _this.inP.scrollHeight / 100;
      }else{
        if(_this.pC < 0 && parseFloat(_this.sb.style.top) > 0){
          _this.sb.style.top = "0%";
          _this.inP.scrollTop = 0;
        }
      }
      if("onScrollF" in _this){
        _this.onScrollF();
      }
      _this.scrollBar.top = _this.sb.style.top;
    }else{
      return false;
    } 
  }

  this.refresh = function(){
    _this.inP.style.width = (_this.orgPar.clientWidth - _this.sbw) +"px";
    _this.inP.style.height = _this.orgPar.clientHeight + "px";
    _this.sbHeight = this.orgPar.clientHeight * 100 / this.inP.scrollHeight;
    _this.scrollBar["height"] = parseFloat(_this.scrollBar["height"]) == _this.sbHeight ? _this.scrollBar["height"] : _this.sbHeight+"%";
    if(_this.inP.scrollHeight > _this.inP.clientHeight){
      _this.sb.style.height = _this.scrollBar.height;
    }
  }
  this.setStyle = function(sb,sbh){
    if(sb != undefined){
      if("height" in sb){
        sb["height"] = (parseFloat(sb["height"]) * 100 / _this.newPar.clientHeight)+"%";
      }
      for(_this.x in sb){_this.scrollBar[_this.x] = sb[_this.x];_this.sb.style[_this.x] = sb[_this.x];}
    }
    if(sbh != undefined){
      for(_this.x in sbh){_this.scrollBarHolder[_this.x] = sbh[_this.x];_this.sbHolder.style[_this.x] = sbh[_this.x];}
    }
    return _this;
  }
}