var day = new Array(31);

var spent = [];
var imgs = [
'img/01005000.jpg', 'img/01011000.jpg', 'img/01040300.jpg', 'img/02000900.jpg', 'img/02005000.jpg',
'img/03004800.jpg', 'img/03025500.jpg', 'img/04009000.jpg', 'img/05002900.jpg', 'img/05200000.jpg',
'img/06004100.jpg', 'img/07003800.jpg', 'img/09001500.jpg', 'img/09002500.jpg', 'img/09008500.jpg',
'img/09008900.jpg', 'img/10001000.jpg', 'img/10002500.jpg', 'img/10004000.jpg', 'img/10007980.jpg',
'img/11001500.jpg', 'img/11002000.jpg', 'img/11029900.jpg', 'img/12002400.jpg', 'img/12002500.jpg',
'img/12005100.jpg', 'img/13002000.jpg', 'img/13002500.jpg', 'img/13004800.jpg', 'img/13007600.jpg',
'img/13048000.jpg', 'img/14001000.jpg', 'img/14005300.jpg', 'img/14010000.jpg', 'img/14013900.jpg',
'img/15010900.jpg', 'img/15015660.jpg', 'img/15021000.jpg', 'img/15026300.jpg', 'img/16002000.jpg',
'img/16005600.jpg', 'img/16006100.jpg', 'img/17000800.jpg', 'img/17005000.jpg', 'img/18004000.jpg',
'img/18004200.jpg', 'img/18007500.jpg', 'img/18020000.jpg', 'img/19006800.jpg', 'img/20001100.jpg',
'img/20007200.jpg', 'img/21002000.jpg', 'img/21003500.jpg', 'img/21006800.jpg', 'img/21008000.jpg',
'img/22010400.jpg', 'img/23001980.jpg', 'img/23004400.jpg', 'img/23005500.jpg', 'img/23011200.jpg',
'img/24005700.jpg', 'img/24006100.jpg', 'img/25001800.jpg', 'img/25020300.jpg', 'img/26032800.jpg',
'img/27003000.jpg', 'img/27005100.jpg', 'img/28001000.jpg', 'img/28008000.jpg', 'img/28021500.jpg',
'img/30020600.jpg'
];

for(i=0; i<day.length; i++){
  day[i] = [];
  spent[i] = 0;
}

for(i=0; i<imgs.length; i++){
  var dayFromFilename = parseInt(imgs[i].slice(4,6));
  day[dayFromFilename].push(imgs[i]);
  spent[dayFromFilename] += parseInt(imgs[i].slice(6,12));
}


for(i=1; i<day.length; i++){
  //console.log( "day" + i + " files : " + day[i] + ", " + spent[i] + "원");
}

var gallery = document.getElementById("gallery");

for(i=1; i<day.length; i++){

  var string = "<div class='gallery'><div class='info fade-objects'>4/"+ i +"<br>"+ spent[i] +"</div><img src='img/patterns/pattern (" + i + ").png'>"
  string += "<div class='receipt'><div class='overlay'></div>";

  for(j=0; j<day[i].length; j++){
    string += "<img class='draggable' src=" + day[i][j] + ">"
  }
  string += "</div></div>";

  gallery.innerHTML += string;

}

for(i=0; i<5; i++){
  gallery.innerHTML += "<div class='gallery-empty'><img src='img/patterns/pattern (0).png'></div>";
}

var imgs =  document.getElementsByClassName("gallery");

for(i=0; i<imgs.length; i++){
  imgs[i].childNodes[2].childNodes[0].addEventListener("click", function(){
      this.parentNode.classList.remove("visible");
  });

  imgs[i].childNodes[1].addEventListener("click", function(){
    this.parentNode.childNodes[2].classList.add("visible");

    var myElements = document.querySelectorAll(".visible img");
    if(myElements){
      for (var i = 0; i < myElements.length; i++) {
        myElements[i].style.width = "calc(" + parseInt(100/myElements.length) + "% - 40px)";
      }
    }
  });
}


// target elements with the "draggable" class
interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    restrict: {
      restriction: "parent",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      var textEl = event.target.querySelector('p');

      textEl && (textEl.textContent =
        'moved a distance of '
        + (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                     Math.pow(event.pageY - event.y0, 2) | 0))
            .toFixed(2) + 'px');
    }
  });

  function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;
