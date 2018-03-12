/*----MOBILE MENU-----*/
const gambEl = $('#js-gamb');
const menuMob = $('.header_menu');
//функция анимации раскрывающего меню при нажатии на кнопку-гамбургер в мобильных версиях
gambEl.on('click',function(){
	menuMob.toggleClass('header_menu--active');
	$('.header_mobile_gamb').toggleClass('mobile_close');
	/*
	if(!menuMob.hasClass('header_menu--active')){
		setTimeout(function(){
			menuMob.css({"display": "none"});
		},1000);


		menuMob.css({"display": "block"});
		menuMob.animate({height: "+=380px"}, 300);

	}else{
		menuMob.animate({height: "-=380px"}, 300);
		setTimeout(function(){
			menuMob.css({"display": "none"});
		},1000);
	}
*/
})




/*------FORM---------*/

const username = $('#username');
const lat = new RegExp(/[a-zA-Z]/);

//проверка, введен ли латинский символ
const isLat = function(event){
	var pres = event.key;
	if((pres.search(lat)) !==-1){
		return true;
	}	
}

//проверка, введена ли цифра в поле
const isDigit = function(){		
	if(event.key >=0 || event.key <9 || event.key == 'Backspace'){
		return true;
	}
}



/*---Card number-----*/
//функция, позволяющая вводить только цифры
const cardNumber = $('.form_cardnumber');

cardNumber.on('keydown', function(event){
	if(!isDigit()){
		event.preventDefault();
	}
	cardNumber.each(function(index){
		if(cardNumber.eq(index).val().length === 3){
		keepCalm(cardNumber.eq(index));
		}
	});
});


/*----User Name----*/
//функция позволяющая вводить только латинские буквы
username.on('keydown', function(event){
	if(!isLat(event) ){
		event.preventDefault();
	}
	if(username.val().length > 4){
		keepCalm(username);
	}
});


/*--Код CVV2 / CVC2--*/
//функция проверки ввода цифр в поле на обратной стороне карты
const code = $('#code');

code.on('keydown', function(event){
	if(!isDigit() ){
		event.preventDefault();
	}
	if(code.val().length ===2){  //убирает красную границу при заполнении поля
		keepCalm(code);
	}
});

//функция подсвечивающая неверно заполненные блоки красным 
const redAlert = function(el){
	el.css({"borderColor" : "red" });
};

//функция, убирающая красную границу при заполнении поля
const keepCalm = function(el){
	el.css({"borderColor" : "transparent" });
};

//проверка полей формы при отправке данных
$('#main_form').on('submit', function(event){

//проверяет полноту заполнения номера карты
	cardNumber.each(function(index){
		if(cardNumber.eq(index).val().length < 3){
		redAlert(cardNumber.eq(index));
		event.preventDefault();
		}
	});
//проверяет полноту заполнения кода обратной стороны
	if(code.val().length < 2){
		redAlert(code);
		event.preventDefault();
	}else{
		keepCalm(code);
	}
//проверяет полноту заполнения держателя карты
	if(username.val().length < 4){
		redAlert(username);
		event.preventDefault();
	}
});


