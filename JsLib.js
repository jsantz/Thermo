/**
 * Created by Josh on 2016-04-15.
 */

/*=====================================================================================
 * Object Constructors for divs, tables and buttons
 * - 2 -
 *=====================================================================================*/
function Cookie(id){
    this.id = id;
    this.val = "";
}
cookie = new Cookie('thiscookie');

Number.prototype.toFixedDown = function(digits) {
    var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
        m = this.toString().match(re);
    return m ? parseFloat(m[1]) : this.valueOf();
};

allDivs={};
allimgs={};
// An object for the simplified creation of Divs.
function RowMDiv(id, num, color, textcolor, height, width){
    this.id = id;
    this.num = num;
    this.colorbg = color;
    this.colorbg2 = color;
    this.Divs = [];
    this.height = height;
    this.width = width;
    this.textcolor = textcolor;
}

RowMDiv.prototype.update = function(){
    if(this.Divs.length == 0) {
        for (i = 0; i < this.num; i++) {
            newDiv = new MDiv(this.id + "q" + i);
            newDiv.colorbg = this.colorbg;
            newDiv.colorbg2 = this.colorbg;
            newDiv.height = this.height;
            newDiv.width = this.width;
            newDiv.overflow='hidden';
            this.Divs.push(newDiv);
            //$('div#' + this.id + String(i)).numb = i;
            //alert('div#' + this.id + String(i));
        }
    }
};


RowMDiv.prototype.makebuttons = function(color2, textcolorn){
    this.update();
    for(i = 0; i < this.Divs.length; i++){
        //alert(this.Divs[i].hash);
        hashval = this.Divs[i].Div.hash;
      $(this.Divs[i].Div).mouseover(function() {
          //otextcolor = $('#' + this.id).css('color');
          $('#' + this.id).css("background-color", color2);
          $('#' + this.id).css('color', textcolorn);

      });
      obgcolor = this.colorbg;
      otextcolor = this.textcolor;

      $(this.Divs[i].Div).mouseleave(function(){

          $('#' + this.id).css("background-color", obgcolor);
          $('#' + this.id).css('color', otextcolor);
      });
      //this.Divs[i].Div.attr('onMouseDown', functionality);
  }
};

RowMDiv.prototype.Place = function(Div){
    this.update();
    if(this.Divs.length == 0){
        return;
    }
    for(i = 0; i<this.Divs.length; i++){
        this.Divs[i].Place(Div);
    }
};

RowMDiv.prototype.setProp = function(cssprop, value){
    if(this.Divs.length == 0){
        return;
    }
    for(i=0; i<this.Divs.length; i++){
        //alert(this.Divs[i].hash);
        $(this.Divs[i].hash).css(cssprop, value);
    }
};

RowMDiv.prototype.titles = function(titles/*, functions, doonmouseover, doonmouseleave*/){
    if(this.Divs.length == 0){
        console.log('RowMDiv: array of Divs empty.');
        return;
    }
    //if(titles.length != functions.length){
    //    return;
    //}
    for(i=0; i<this.Divs.length; i++){
        this.Divs[i].Div.html(titles[i]);
        /*this.Divs[i].addfunction(function(){
            functions[i]();
        });
        $(this.Divs[i].hash).mouseover(function(){
            doonmouseover[i]();
        });
        $(this.Divs[i].hash).mouseleave(function(){
            doonmouseleave[i]();
        })*/
    }
};

//RowMDiv.prototype.set(index, )

function MDiv(id){
    this.id = id;
    this.hash = "#" + id;
    this.height = '100%';
    this.width = '100%';
    this.colorbg = "#FFFFFF";
    this.colorbg2 = this.colorbg;
    this.textcolor = "#000000";
    this.floats = 'left';
    this.bordersize = '0px';
    this.bordercolor =  '#000000';
    this.margin = '0px';
    this.font = 'Arial';
    this.color = '#000000';
    this.overflow = 'auto';
    this.padding = '0px';
    this.textalign = 'left';
    this.numb = 0;
    var hcolor = this.color2;
    var Div = $('<div></div>')
        .attr('id', id)
        .attr('style', 'height: ' + this.height)
        .attr('style', 'width: ' + this.width)
        .css('background-color', this.colorbg)
        .css('float', this.floats)
        .css('border', this.bordersize + ' solid ' +this.bordercolor)
        .css('margin', this.margin)
        .css('font-family', this.font)
        .css('overflow', this.overflow)
        .css('padding', this.padding)
        .css('text-align', this.textalign)
        .css('color', this.textcolor)
        .css('position', 'relative');
        //.css('top', '50%')
        //.css('-webkit-transform', 'translateY(-50%)')
        //.css('-ms-transform', 'translateY(-50%)')
        //.css('transform', 'translateY(-50%)');

    this.Div = Div;
    allDivs[this.hash] = this;
}

MDiv.prototype.Place = function(Div){
    this.update();
    $(Div).append(this.Div);
};
MDiv.prototype.update = function(){
    hcolor = this.color2;
    this.colorbg2 = this.colorbg;
    var Div = $('<div></div>')
        .attr('id', this.id)
        .css('height', this.height)
        .css('width', this.width)
        .css('background-color', this.colorbg)
        .css('float', this.floats)
        .css('border', this.bordersize + ' solid ' +this.bordercolor)
        .css('margin', this.margin)
        .css('font-family', this.font)
        .css('overflow', this.overflow)
        .css('padding', this.padding)
        .css('text-align', this.textalign);
        Div.colorbgs = this.colorbg;
        Div.colortexts = this.color;
    this.Div = Div;
};

MDiv.prototype.makebutton = function(bgcolor, textcolor, functionality){
    this.Div.mouseover(function() {
        $('#' + this.id).css("background-color", bgcolor);
        $('#' + this.id).css('color', textcolor);
    });
    obgcolors = this.colorbg;
    otextcolors = this.textcolor;

    this.Div.mouseleave(function(){
        $('#' + this.id).css("background-color", obgcolors);
        $('#' + this.id).css('color', otextcolors);
    });
    $('#' + this.id).mousedown(functionality);
};

MDiv.prototype.addfunction = function(functionality){
    $('#' + this.id).mousedown(functionality);
};

MDiv.prototype.onmouseover = function(func){
    $(this.Div).mouseover(func);
};

MDiv.prototype.onmouseleave = function(func){
    $(this.Div).mouseleave(func);
};

MDiv.prototype.onmouseover1 = function(htmlcode){
    var content = $(this.Div).html();
    var hashs = this.hash;
    $(this.Div).mouseover(function(){
        $(hashs).html(htmlcode);
    });
    $(this.Div).mouseleave(function(){
        $(hashs).html(content);
    })
};

MDiv.prototype.onmouseover2 = function(htmlcode, mdiv){
    $(this.Div).mouseover(function(){
        $(mdiv.hash).html(htmlcode);
    });
    $(this.Div).mouseleave(function(){
        $(mdiv.hash).html('');
    })
};


MDiv.prototype.MakeDropDown = function(list, dropheight, dropcolor, droptext ){
    this.droplist = list;
    this.MList = [];
    //var current = this.hash;
    //currentdiv = this;
    this.dropcolor = dropcolor;
    this.droptext = droptext;
    this.colorbg = this.Div.css('background-color');
    this.textcolor = this.Div.css('color');
    height = $('#' + this.id).css('height').split('p');
    this.dropheight = dropheight;
    this.drop = dropheight*list.length;
    //this.height = parseInt(height[0]);
    this.Div.css('overflow','hidden');
    for(i=0; i<list.length; i++){
        temp = new MDiv(this.id + 'drop' + i.toString());
        temp.height = dropheight;
        temp.width = this.Div.css('width');
        this.MList.push(temp);
        temp.colorbg = this.colorbg;
        temp.Div.css('color', this.textcolor);
        temp.overflow = 'hidden';
        temp.Place(this.hash);
        temp.Div.css('overflow','hidden');

        //temp.makebutton(dropcolor, droptext, function() { alert('helloworld!')});
    }

    for(i=0; i<list.length; i++){
        this.MList[i].Div.html('<p id=co'+this.id + i.toString()+'>'+list[i]+'</plist>');
        $('#co'+ this.id + i.toString()).css(VerticalCenter)
            .css('color', this.textcolor)
            .css('text-align', 'center');

        this.MList[i].Div.mouseover( function(){
            outer = this.id.split('drop');
            $('#' + this.id).css('background-color', allDivs['#'+ outer[0]].dropcolor);
                //.css('color', allDivs['#'+ outer[0]].droptext);
            $('#co'+ outer[0] + outer[1]).css('color', allDivs['#'+ outer[0]].droptext);
        });
        this.MList[i].Div.mouseleave( function(){
            $('#' + this.id).css('background-color', allDivs['#'+ outer[0]].colorbg)
                .css('color', allDivs['#'+ outer[0]].textcolor);
            $('#co'+ outer[0] + outer[1]).css('color', allDivs['#'+ outer[0]].textcolor);
        });
    }
    this.Div.mouseover( function(){
        for(i=0; i<allDivs['#'+this.id].MList.length; i++){
            allDivs['#'+this.id].MList[i].Div.css('width', allDivs['#'+this.id].Div.css('width'));
            allDivs['#'+this.id].MList[i].Div.css('overflow', 'hidden');
        }
        $('#' + this.id).css('overflow', 'visible');
        $('#' + this.id).css('height', parseInt(height[0]) + allDivs['#'+this.id].drop + 'px');


    });
    this.Div.mouseleave( function(){
        $('#' + this.id).css('overflow', 'hidden');
        $('#' + this.id).css('height', allDivs['#'+this.id].height);
        //this.Div.css('height',this.dropheight.toString() + 'px');
        //this.css('height', this.height + 'dropheight')
        //alert($('#' + this.id).css('height'));
    });
};



// An object for easy creation of 2D Tables
function Table2D(array){
    this.L = array.length;
    this.W = array[0].length;
    this.border = "1";
    this.width = "100%";
    border = " border=\"" + this.border + "\" ";
    width = " style= \"width:" + this.width +"\"";
    this.val = "<table" + width + border + ">";
    for(j=0; j<this.L; j++){
        this.val +="<tr>";
        for(i=0;i<array[j].length; i++){
            this.val += "<td>" + String(array[j][i]) + "</td>";
        }
        this.val += "</tr>";
    }
    this.val+= "</table>"
}

Table2D.prototype.Place = function(Div){
    $(Div).append(this.val);
};

// An Object for the easy creation of DropDown Menus
function DropDown(id, vals, displaynames){
    this.val = "<select " + "id=\"" + id + "\">";
    this.vals = vals;
    this.names = displaynames;
    for(i=0; i<vals.length;i++){
        this.val += "<option value=\"" +String(vals[i]) +"\">" + String(displaynames[i]) + "</option>";
    }
    this.val += "</select>";
}
DropDown.prototype.Place = function(Div){
    $(Div).append(this.val);
};

// Canvas Constructor
function Canvas(id){
    this.height = '100%';
    this.width = '100%';
    this.id = id;
    var canvas = $('<canvas></canvas>')
        .attr('id', id)
        .css('height', this.height)
        .css('width', this.width);
    this.val = canvas;
}
Canvas.prototype.update = function(){
    var canvas = $('<canvas></canvas>')
        .attr('id', id)
        .css('height', this.height)
        .css('width', this.width);
    this.val = canvas;
};
Canvas.prototype.Place = function(Div){
    this.update();
    $(Div).append(this.val);
};

// Image Div Constructor
function ImageDiv(id){
    this.id = id;
    this.images = [];
    this.gallery = "";
    this.hash = "#" + id;
    this.color1 = "#FFFFFF";
    this.color2 = "#000000";
    var Div = $('<div></div>')
        .attr('id', id)
        .attr('style', 'height: ' + this.height)
        .attr('style', 'width: ' + this.width)
        .css('background-color', this.color1);
    this.Div = Div;
}
ImageDiv.prototype.update = function(){
    hcolor = this.color2;
    var Div = $('<div></div>')
        .attr('id', this.id)
        .css('background-color', this.color1);
    this.Div = Div;
};
ImageDiv.prototype.Place = function(Div){
    this.update();
    $(Div).append(this.Div);
    $(this.Div.append(this.gallery))
};
ImageDiv.prototype.AddImages = function(path, Images){
    this.Images = Images;
    this.gallery = "<div id =\"links\">";
    for(i=0; i<Images.length; i++){
        for(j=0; j<Images[i].length; j++){
            this.gallery = this.gallery + "<a href=\"" + path + "/" + Images[i][j] + "\" title=\"" + Images[i][j] + "\" data-gallery><div class =\"thumbnail\"><img src=\"" + path + "/" + Images[i][j] + "\" class=\"portrait\" alt=\"\"></div></a>";
        }
        this.gallery = this.gallery + "<br><br>";
    }
};

var ImageDivcode = "<div class=\"slides\"></div><h3 class=\"title\"></h3><a class=\"prev\">‹</a><a class=\"next\">›</a><a class=\"close\">×</a><a class=\"play-pause\"></a><ol class=\"indicator\"></ol><div class=\"modal fade\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" aria-hidden=\"true\">&times;</button><h4 class=\"modal-title\"></h4></div><div class=\"modal-body next\"></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default pull-left prev\"><i class=\"glyphicon glyphicon-chevron-left\"></i>Previous</button><button type=\"button\" class=\"btn btn-primary next\">Next<i class=\"glyphicon glyphicon-chevron-right\"></i></button></div></div></div></div>";

//function ImgDiv(id, path, height, width, placeinto){
//    temp = new MDiv(id);
//    temp.height = height;
//    temp.width = width;


//    img = new Thumbnailimg(id+'img', path);
//}

function Thumbnailimg(id, path){
    var img = $('<img src='+path+'>')
        .attr('id', id)
        .css('position', 'relative')
        .css('overflow', 'hidden')
        .css('left', '50%')
        .css('top', '50%')
        .css('height', '100%')
        .css('width', 'auto')
        .css('-webkit-transform', 'translate(-50%,-50%)')
        .css('-ms-transform', 'translate(-50%,-50%)')
        .css('trasnform', 'translate(-50%,-50%)')
        .css('opacity', '1');
    this.hash = '#' + id;
    this.id=id;
    this.img = img;
}

Thumbnailimg.prototype.Place = function(Div){
    $(Div).append(this.img);
};

function Textbox(id, height, width){
    var box = '<input type="text" id='+id+' name='+id+' style="height:'+ height +'width:'+width+'"/>';
    this.box = box;
    this.hash = '#' + id;
    this.id = id;
}

Textbox.prototype.Place = function(Div){
    $(Div).append(this.box);
};

function Textarea(id, height, width){
    var box = '<textarea type="text" id='+id+' name='+id+' rows='+height+' cols='+width+'></textarea>';
    this.box = box;
    this.hash = '#' + id;
    this.id = id;
}

Textarea.prototype.Place = function(Div){
    $(Div).append(this.box);
};


function Uploadbox(id, action, Hint, buttonid){
    var form = '<form id='+id+' name='+id+' action='+action+' method="POST" enctype="multipart/form-data">'+ Hint +'<input type="file" name="file"> <input type="submit" id='+buttonid+' value="Submit"></form>';
    this.form = form;
    this.id = id;
    this.hash = '#' + id;
}

Uploadbox.prototype.Place = function(Div){
    $(Div).append(this.form);
};

function Button(id, message){
    var button = '<input type="button" id='+id+' value='+message+'>';
    this.id = id;
    this.hash = '#' + id;
    this.button = button;
}

Button.prototype.Place = function(Div){
  $(Div).append(this.button);
};


// My CSS Classes.
var VerticalCenter = {
    //'position': 'relative',
    'top': '50%',
    'width': 'auto',
    '-webkit-transform': 'translateY(-50%)',
    '-ms-transform': 'translateY(-50%)',
    'transform': 'translateY(-50%)'
    //'color': 'white'
};

var insidemax = {
    'height': '100%',
    'width': '100%',
    'color': '#FFFFFF',
    'opacity': '0.7'
};

var bodyhidden = {
    'height': '0px',
    'width': '0px',
    'background-color': '#000000',
    'opacity': '0.5',
    'z-index': '-1'
};

var bodyvisible = {
    'height': '100%',
    'width': '100%',
    'background-color': '#000000',
    'opacity': '0.8',
    'z-index': '1000',
    'top': '0',
    'left': '0',
    'position': 'fixed',
    'text-align': 'center',
    'align': 'center'
};
var overvisible = {
    'height': '200px',
    'width': '300px',
    //'margin': '0 auto',
    'background-color': '#FFFFFF',
    'opacity': '1',
    'z-index': '1050',
    //'position': 'absolute',
    'top': '50%',
    'right': '40%',
    '-webkit-transform': 'translateY(-50%)',
    '-ms-transform': 'translateY(-50%)',
    'transform': 'translateY(-50%)',
    'position': 'fixed'
};

