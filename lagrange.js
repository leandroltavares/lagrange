var Lagrange = function(x1, y1, x2, y2) {
	this.xs = [x1, x2];
	this.ys = [y1, y2];
}

Lagrange.prototype.addPoint = function(x, y) {
	this.xs.push(x);
	this.ys.push(y);
	return this.pointCount() - 1;
}

Lagrange.prototype.removePoint = function (index) {
	this.xs.remove(index);
	this.ys.remove(index);
	return this.pointCount();
};

Lagrange.prototype.pointCount = function () {
	return this.xs.length;
};

Lagrange.prototype.clear = function () {
	this.xs = [];
	this.ys = [];
};

Lagrange.prototype.eval = function (x) {
	//TODO
};

//Expression section
Lagrange.prototype.generateLexpression = function (index) {
	var numerator = "", denominator = "";

	for (var j = 0; j < this.pointCount(); j++) {
		 if(index != j){
			 numerator += `(x - ${this.xs[j]}) *`;
			 denominator += `(${this.xs[index]} - ${this.xs[j]}) *`;
		 }
	}

	return `${numerator.substr(0, numerator.length - 1)}/ ${denominator.substr(0, denominator.length - 1)}`;
};

Lagrange.prototype.generatePexpression = function () {
	var expression = "";
	for (var i = 0; i < this.pointCount(); i++) {
		expression += `(${this.generateLexpression(i)} * ${(this.ys[i])}) +`;
	}
	return expression.substr(0, expression.length - 1);
};

Lagrange.prototype.evaluateExpression = function(x){
	var compiled = math.compile(this.generatePexpression());
	var scope = {x: x};
	return compiled.eval(scope);
}

//Tex Expression section
Lagrange.prototype.generateTexLexpression = function (index) {
	var numerator = `L_${index}(x) = `, denominator = "";

	for (var j = 0; j < this.pointCount(); j++) {
		 if(index != j){
			 numerator += `(x - ${this.xs[j]}) *`;
			 denominator += `(${this.xs[index]} - ${this.xs[j]}) *`;
		 }
	}

	return `${numerator.substr(0, numerator.length - 1)}/ ${denominator.substr(0, denominator.length - 1)}`;
}

Lagrange.prototype.generateTexPexpression = function () {
	var expression = "P(x) = ";

	for (var i = 0; i < this.pointCount(); i++) {
		expression += `[L_${i}(x) * ${(this.ys[i])}] +`;
	}
	return expression.substr(0, expression.length - 1);
}
