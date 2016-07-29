window.onload = function() {
	grid.run()
}

var grid = (function(){
	var colorsArr = ["red", "blue", "green", "pink", "orange", "yellow", "purple", "brown"];
	var recentlyChanged = [];


	function assignRandomColor(square){
		var isNewColor;
		while(isNewColor != true){
			var randIndex = getRandomInt(0, colorsArr.length - 1);
			var randColor = colorsArr[randIndex];
			isNewColor = checkCurrentColor(square, randColor);
		}
		square.style.background = randColor;
	}

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

	function checkCurrentColor(square, color){
		return !(square.style.background === color);
	}

	function chooseRandomSquare(){
		var squareRecentlyChanged, htmlId;
		while(squareRecentlyChanged != false){
			var randNum = getRandomInt(1, 16);
			htmlId = "square-" + randNum;
			squareRecentlyChanged = checkForRecentChange(htmlId);
		}
		recentlyChanged.push(htmlId);
		leaveForTwoSeconds(htmlId);
		return document.getElementById(htmlId);
	}

	function checkForRecentChange(htmlId){
		if(recentlyChanged.includes(htmlId)){
			return true;
		} else {
			return false;
		}
	}

	function leaveForTwoSeconds(htmlId){
		setTimeout(function(){
			var index = recentlyChanged.indexOf(htmlId);
			recentlyChanged.splice(index, 1);
		}, 2000)
	}

	function changeColors(interval){
		var target = chooseRandomSquare();
		assignRandomColor(target);
		setTimeout(function(){changeColors(interval)}, interval);
	}

	return{
		run: function(){
			setTimeout(function(){changeColors(250)}, 250);
		}
	}
})();
