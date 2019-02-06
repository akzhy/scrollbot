Scrollbot = function(e, w) {
  // e - Element
  // w - scrollbar width
    this.orgPar = document.querySelector(e);

    // init function, Run on IE 9 and above

    if (!this.isIE() || (this.isIE() && this.isIE() > 9)){
        this.init(e,w);
    }
}

Scrollbot.prototype.init = function(e,w){
    var _this = this;
    if (w == undefined) {
        this.sbw = 5;
    } else {
        this.sbw = w;
    }
    // scrollspeed for scroll trackpad click event
    this.scrollSpeed = 200;
    // parent content
    this.parContent = this.orgPar.innerHTML;
    this.orgPar.innerHTML = "";
    this.newPar = document.createElement("div");
    this.sbContainer = document.createElement("div");
    this.scrollBarHolder = document.createElement("div");
    this.scrollBar = document.createElement("div");
    this.inP = document.createElement("div");
    this.newPar.className = "scrollbot-outer-parent";
    this.scrollBarHolder.className = "scrollbot-scrollbar-holder";
    this.scrollBar.className = "scrollbot-scrollbar";
    this.inP.className = "scrollbot-inner-parent";
    this.newPar.style.position = "relative";
    this.newPar.style.paddingRight = this.sbw + "px";
    this.newPar.style.zIndex = "9999999";
    this.newPar.style.height = "100%";
    this.newPar.style.overflow = "hidden";
    this.inPWidth = (this.orgPar.clientWidth - this.sbw) + "px";
    this.inP.style.cssText = "height:100%;overflow-y:auto;overflow-x:hidden;padding-right:" + (this.sbw + 20) + "px;width:100%;box-sizing:content-box;";
    this.inP.innerHTML = this.parContent;
    this.inP.style.height = "100%";
    this.newPar.appendChild(this.inP);
    this.scrollBarHolder.appendChild(this.scrollBar);
    this.newPar.appendChild(this.scrollBarHolder);
    this.orgPar.appendChild(this.newPar);
    this.sbHeight = this.inP.clientHeight * 100 / this.inP.scrollHeight;
    this.mdown = false;
    this.customHeight = false;
    this.scrollElement = this.inP;
    this.prevHeight = this.inP.scrollHeight;
    this.onScroll = function(f) {
        _this.onScrollF = f
    };
    this.sB = {
        width: _this.sbw + "px",
        height: _this.sbHeight + "%",
        position: "absolute",
        right: 0,
        top: 0,
        backgroundColor: "#444444",
        borderRadius: "15px"
    };

    this.sBH = {
        width: _this.sbw + "px",
        height: "100%",
        position: "absolute",
        right: 0,
        top: 0,
        backgroundColor: "#ADADAD",
        borderRadius: "15px"
    };


    for (var p in this.sB) {
        this.scrollBar.style[p] = this.sB[p]
    };
    for (var p in this.sBH) {
        this.scrollBarHolder.style[p] = this.sBH[p];
    }

    this.inP.addEventListener("scroll", function() {
        _this.scrollBar.style.top = _this.inP.scrollTop * 100 / _this.inP.scrollHeight + (_this.sbHeight - parseFloat(_this.sB.height)) * _this.inP.scrollTop / (_this.inP.scrollHeight - _this.inP.clientHeight) + "%";
        if ("onScrollF" in _this) {
            _this.onScrollF();
        }
    })

    this.scrollBarHolder.onmousedown = function(e) {
        if (e.target != this) return;
        var relPos = (e.pageY - _this.scrollBarHolder.getBoundingClientRect().top) * 100 / _this.scrollBarHolder.clientHeight;
        console.log(relPos);
        _this.setScroll(_this.inP.scrollHeight * relPos / 100, _this.scrollSpeed);
    }

    this.scrollBar.onmousedown = function(e) {
        _this.mdown = true;
        _this.posCorrection = e.pageY - _this.scrollBar.getBoundingClientRect().top;
        _this.btmCorrection = _this.scrollBar.clientHeight * 100 / _this.newPar.clientHeight;
        return false;
    }
    this.orgPar.onmouseup = function() {
        _this.mdown = false;
    }
    this.orgPar.onmousemove = function(e) {
        if (_this.mdown) {
            if (document.selection) {
                document.selection.empty();
            } else {
                window.getSelection().removeAllRanges();
            }
            _this.relY = e.pageY - _this.newPar.getBoundingClientRect().top;
            _this.pC = (_this.relY - _this.posCorrection) * 100 / _this.newPar.clientHeight;
            if (_this.pC >= 0 && (_this.pC + _this.btmCorrection) <= 100) {
                _this.scrollBar.style.top = _this.pC + "%";
                _this.inP.scrollTop = (parseFloat(_this.scrollBar.style.top) - (_this.sbHeight - parseFloat(_this.sB.height)) * _this.inP.scrollTop / (_this.inP.scrollHeight - _this.inP.clientHeight)) * _this.inP.scrollHeight / 100;
            } else {
                if (_this.pC < 0 && parseFloat(_this.scrollBar.style.top) > 0) {
                    _this.scrollBar.style.top = "0%";
                    _this.inP.scrollTop = 0;
                }
            }
            if ("onScrollF" in _this) {
                _this.onScrollF();
            }
        } else {
            return false;
        }
    }
    setInterval(function(){
        if(_this.inP.scrollHeight != _this.prevHeight)
            _this.refresh();
    },400);
}

Scrollbot.prototype.destroy = function(){
    this.orgPar.innerHTML = this.parContent;
    this.orgPar.style.overflow = "auto";
    this.init = null;
}

Scrollbot.prototype.isIE = function(){
    var nav = navigator.userAgent.toLowerCase();
    return (nav.indexOf('msie') != -1) ? parseInt(nav.split('msie')[1]) : false;
}

Scrollbot.prototype.setStyle = function(sb, sbh) {
    if (sb != undefined) {
        sb["width"] = this.sbw;
        if("height" in sb) {
            this.customHeight = true;
            sb["height"] = (parseFloat(sb["height"]) * 100 / this.newPar.clientHeight) + "%";
        }
        for (var x in sb) {
            this.sB[x] = sb[x];
            this.scrollBar.style[x] = sb[x];
        }
    }
    if (sbh != undefined) {
        sbh["width"] = this.sbw;
        for (var x in sbh) {
            this.sBH[x] = sbh[x];
            this.scrollBarHolder.style[x] = sbh[x];
        }
    }
    return this;
}

Scrollbot.prototype.refresh = function() {
    this.sbHeight = this.inP.clientHeight * 100 / this.inP.scrollHeight;
    if (this.sbHeight >= 100) {
        this.scrollBarHolder.style.display = "none";
    }else {
        this.scrollBarHolder.style.display = "block"
    }
    this.sbHeight = this.inP.clientHeight * 100 / this.inP.scrollHeight;
    this.sB["height"] = this.customHeight ? this.sB["height"] : this.sbHeight + "%";
    if (this.inP.scrollHeight > this.inP.clientHeight) {
        this.scrollBar.style.height = this.sB.height;
    }
}

Scrollbot.prototype.setScroll = function(p, d) {
    var _this = this;
    if (d == undefined || d <= 0) d = 500;
    if (p >= this.inP.scrollHeight - this.inP.clientHeight){p = this.inP.scrollHeight - this.inP.clientHeight;};

    var difference = p - this.inP.scrollTop;
    var perTick = difference / d * 10;

    setTimeout(function() {
        _this.inP.scrollTop += perTick;
        if (Math.abs(p - _this.inP.scrollTop) < 5) return;
        _this.setScroll(p, d - 10);
    }, 10);
}
