//检查结果
var _CHECK_RESULT = {
	// 邮箱检查结果是否可以注册
	email : false,
	// 手机检查结果是否可以注册
	mobile_phone : false
};

/* $Id : user.js 4865 2007-01-31 14:04:10Z paulgao $ */

function check_username(val) {
    if (val == '') {
        document.getElementById('username_message').innerHTML = '用户名不能为空！';
    } else {
        Ajax.call('user.php?act=check_username', 'username=' + val, checkusername_callback, 'GET', 'TEXT', true, true);
    }
}

/*function check_username(val) {
	if (val == '') {
		document.getElementById('username_message').innerHTML = '用户名不能为空！';
	} else if (val.match(/[\u4e00-\u9fa5]/)) {
		document.getElementById('username_message').innerHTML = '用户名不能有中文！';
	} else {
		Ajax.call('user.php?act=check_username', 'username=' + val, checkusername_callback, 'GET', 'TEXT', true, true);
	}
}*/

function checkusername_callback(result) {
	if (result == 'true') {
		document.getElementById('username_message').innerHTML = '可以修改';
	} else {
		document.getElementById('username_message').innerHTML = '用户名已存在，请重新输入！';
	}
}

function identity() {
	var frm = document.forms['formIdentity'];
	var real_name = frm.elements['real_name'].value;
	var card = frm.elements['card'].value;
	var country = frm.elements['country'].value;
	var province = frm.elements['province'].value;
	var city = frm.elements['city'].value;
	var district = frm.elements['district'].value;
	var address = frm.elements['address'].value;
	if (real_name.length == 0) {
		alert('真实姓名不能为空');
		return false;
	}
	if (card.length == 0) {
		alert('身份证号不能为空！');
		return false;
	} else {
		var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		if (reg.test(card) === false) {
			alert("身份证输入不合法");
			return false;
		}
	}

	if (country == 0 || province == 0 || city == 0 || district == 0) {
		alert('现居地请选择完整！');
		return false;
	}
	if (address.length == 0) {
		alert('详细地址不能为空！');
		return false;
	}
	return true;
}
/* 代码增加2014-12-23 by bbs.hongyuvip.com _end */
/*******************************************************************************
 * 修改会员信息
 */
function userEdit() {
	var frm = document.forms['formEdit'];
	var email = frm.elements['email'].value;
	var msg = '';
	var reg = null;
	var passwd_answer = frm.elements['passwd_answer'] ? Utils.trim(frm.elements['passwd_answer'].value) : '';
	var sel_question = frm.elements['sel_question'] ? Utils.trim(frm.elements['sel_question'].value) : '';
	/* 代码增加2014-12-23 by bbs.hongyuvip.com _star */
	var username = frm.elements['username'].value;
	if (username.length == 0) {
		msg += '用户名不能为空' + '\n';
	} else if (username.match(/[\u4e00-\u9fa5]/)) {
		msg += username_chana + '\n';
	}

	/* 代码增加2014-12-23 by bbs.hongyuvip.com _end */
	if (email.length == 0) {
		msg += email_empty + '\n';
	} else {
		if (!(Utils.isEmail(email))) {
			msg += email_error + '\n';
		}
	}

	if (passwd_answer.length > 0 && sel_question == 0 || document.getElementById('passwd_quesetion') && passwd_answer.length == 0) {
		msg += no_select_question + '\n';
	}

	for (var i = 7; i < frm.elements.length - 2; i++) // 从第七项开始循环检查是否为必填项
	{
		var needinput = document.getElementById(frm.elements[i].name + 'i') ? document.getElementById(frm.elements[i].name + 'i') : '';

		if (needinput != '' && frm.elements[i].value.length == 0) {
			msg += '- ' + needinput.innerHTML + msg_blank + '\n';
		}
	}

	if (msg.length > 0) {
		alert(msg);
		return false;
	} else {
		return true;
	}
}

/* 会员修改密码 */
function editPassword() {
	var frm = document.forms['formPassword'];
	var old_password = frm.elements['old_password'].value;
	var new_password = frm.elements['new_password'].value;
	var confirm_password = frm.elements['comfirm_password'].value;

	var msg = '';
	var reg = null;

	if (old_password.length == 0) {
		msg += old_password_empty + '\n';
	}

	if (new_password.length == 0) {
		msg += new_password_empty + '\n';
	}

	if (confirm_password.length == 0) {
		msg += confirm_password_empty + '\n';
	}

	if (new_password.length > 0 && confirm_password.length > 0) {
		if (new_password != confirm_password) {
			msg += both_password_error + '\n';
		}
	}

	if (msg.length > 0) {
		alert(msg);
		return false;
	} else {
		return true;
	}
}

/*******************************************************************************
 * 对会员的留言输入作处理
 */
function submitMsg() {
	var frm = document.forms['formMsg'];
	var msg_title = frm.elements['msg_title'].value;
	var msg_content = frm.elements['msg_content'].value;
	var msg = '';

	if (msg_title.length == 0) {
		msg += msg_title_empty + '\n';
	}
	if (msg_content.length == 0) {
		msg += msg_content_empty + '\n'
	}

	if (msg_title.length > 200) {
		msg += msg_title_limit + '\n';
	}

	if (msg.length > 0) {
		alert(msg);
		return false;
	} else {
		return true;
	}
}

/*******************************************************************************
 * 会员找回密码时，对输入作处理
 */
function submitPwdInfo() {
	var frm = document.forms['getPassword'];
	var user_name = frm.elements['user_name'].value;
	var email = frm.elements['email'].value;

	var errorMsg = '';
	if (user_name.length == 0) {
		errorMsg += user_name_empty + '\n';
	}

	if (email.length == 0) {
		errorMsg += email_address_empty + '\n';
	} else {
		if (!(Utils.isEmail(email))) {
			errorMsg += email_address_error + '\n';
		}
	}

	if (errorMsg.length > 0) {
		alert(errorMsg);
		return false;
	}

	return true;
}

/*******************************************************************************
 * 会员找回密码时，对输入作处理
 */
function submitPwd() {
	var frm = document.forms['getPassword2'];
	var password = frm.elements['new_password'].value;
	var confirm_password = frm.elements['confirm_password'].value;

	var errorMsg = '';
	if (password.length == 0) {
		errorMsg += new_password_empty + '\n';
	}

	if (confirm_password.length == 0) {
		errorMsg += confirm_password_empty + '\n';
	}

	if (confirm_password != password) {
		errorMsg += both_password_error + '\n';
	}

	if (errorMsg.length > 0) {
		alert(errorMsg);
		return false;
	} else {
		return true;
	}
}

/*******************************************************************************
 * 处理会员提交的缺货登记
 */
function addBooking() {
	var frm = document.forms['formBooking'];
	var goods_id = frm.elements['id'].value;
	var rec_id = frm.elements['rec_id'].value;
	var number = frm.elements['number'].value;
	var desc = frm.elements['desc'].value;
	var linkman = frm.elements['linkman'].value;
	var email = frm.elements['email'].value;
	var tel = frm.elements['tel'].value;
	var msg = "";

	if (number.length == 0) {
		msg += booking_amount_empty + '\n';
	} else {
		var reg = /^[0-9]+/;
		if (!reg.test(number)) {
			msg += booking_amount_error + '\n';
		}
	}

	if (desc.length == 0) {
		msg += describe_empty + '\n';
	}

	if (linkman.length == 0) {
		msg += contact_username_empty + '\n';
	}

	if (email.length == 0) {
		msg += email_empty + '\n';
	} else {
		if (!(Utils.isEmail(email))) {
			msg += email_error + '\n';
		}
	}

	if (tel.length == 0) {
		msg += contact_phone_empty + '\n';
	}

	if (msg.length > 0) {
		alert(msg);
		return false;
	}

	return true;
}

/*******************************************************************************
 * 会员登录
 */
function userLogin() {
	var frm = document.forms['formLogin'];
	var username = frm.elements['username'].value;
	var password = frm.elements['password'].value;
	var msg = '';

	if (username.length == 0) {
		msg += username_empty + '\n';
	}

	if (password.length == 0) {
		msg += password_empty + '\n';
	}

	if (msg.length > 0) {
		alert(msg);
		return false;
	} else {
		return true;
	}
}

function chkstr(str) {
	for (var i = 0; i < str.length; i++) {
		if (str.charCodeAt(i) < 127 && !str.substr(i, 1).match(/^\w+$/ig)) {
			return false;
		}
	}
	return true;
}

function check_password(password) {
	conform_password = document.getElementById('conform_password').value;
	if (password.length < 6) {
		document.getElementById('password_notice').innerHTML = password_shorter;
		$("#pwd_notice").show();
		$("#pwd_intensity").hide();
	} else if (conform_password.length > 0) {
		if (password != conform_password) {
			document.getElementById('password_notice').innerHTML = confirm_password_invalid;
			document.getElementById('password_notice').style.color = "#900";
			$("#pwd_notice").show();
			$("#pwd_intensity").hide();
		} else {
			document.getElementById('password_notice').innerHTML = msg_can_rg;
			document.getElementById('password_notice').style.color = "#093";
			document.getElementById('conform_password_notice').innerHTML = msg_can_rg;
			document.getElementById('conform_password_notice').style.color = "#093";
			$("#pwd_notice").hide();
			$("#pwd_intensity").show();
		}
	} else {
		document.getElementById('password_notice').innerHTML = msg_can_rg;
		document.getElementById('password_notice').style.color = "#093";
		$("#pwd_notice").hide();
		$("#pwd_intensity").show();
	}
}

function check_conform_password(conform_password) {
	var password = document.getElementById('password').value;

	if (conform_password.length < 6) {
		document.getElementById('conform_password_notice').innerHTML = password_shorter;
		document.getElementById('conform_password_notice').style.color = "#900";
		return false;
	}
	if (conform_password != password) {
		document.getElementById('conform_password_notice').innerHTML = confirm_password_invalid;
		document.getElementById('conform_password_notice').style.color = "#900";
	} else {
		document.getElementById('conform_password_notice').innerHTML = msg_can_rg;
		document.getElementById('conform_password_notice').style.color = "#093";
	}
}

function is_registered(username) {
	var submit_disabled = false;
	var unlen = username.replace(/[^\x00-\xff]/g, "**").length;
	if (username.match(/[\u4e00-\u9fa5]/)) {
		document.getElementById('username_notice').innerHTML = msg_un_chine;
		document.getElementById('username_notice').style.color = "#900";
		var submit_disabled = true;
	}
	if (username == '') {
		document.getElementById('username_notice').innerHTML = msg_un_blank;
		document.getElementById('username_notice').style.color = "#900";
		var submit_disabled = true;
	}

	if (!chkstr(username)) {
		document.getElementById('username_notice').innerHTML = msg_un_format;
		document.getElementById('username_notice').style.color = "#900";
		var submit_disabled = true;
	}
	if (unlen < 3) {
		document.getElementById('username_notice').innerHTML = username_shorter;
		document.getElementById('username_notice').style.color = "#900";
		var submit_disabled = true;
	}
	if (unlen > 14) {
		document.getElementById('username_notice').innerHTML = msg_un_length;
		document.getElementById('username_notice').style.color = "#900";
		var submit_disabled = true;
	}

	if (submit_disabled) {
		document.forms['formUser'].elements['Submit'].disabled = 'disabled';
		return false;
	}

	Ajax.call('user.php?act=is_registered', 'username=' + username, registed_callback, 'GET', 'TEXT', true, true);
}

function registed_callback(result) {
	if (result == "true") {
		document.getElementById('username_notice').innerHTML = msg_can_rg;
		document.getElementById('username_notice').style.color = "#093";
		document.forms['formUser'].elements['Submit'].disabled = '';
	} else {
		document.getElementById('username_notice').innerHTML = msg_un_registered;
		document.getElementById('username_notice').style.color = "#900";
		document.forms['formUser'].elements['Submit'].disabled = 'disabled';
	}
}

/**
 * 验证邮箱,第一步合法性验证， 第二步是否存在验证
 * 
 * @param email
 *            验证邮箱：支持邮箱和邮箱对象
 * @param callback
 *            回调函数：true-可以注册 false-不可以注册
 */
function checkEmail(email, callback) {
	var submit_disabled = false;

	var emailObj = null;

	if (typeof (email) == 'object') {
		emailObj = $(email);
		email = emailObj.val();
	}

	if (email == '') {
		document.getElementById('email_notice').innerHTML = msg_email_blank;
		document.getElementById('email_notice').style.color = '#900';
		submit_disabled = true;

		if (emailObj != null) {
			emailObj.focus();
		}

	} else if (!Utils.isEmail(email)) {
		document.getElementById('email_notice').innerHTML = msg_email_format;
		document.getElementById('email_notice').style.color = '#900';
		submit_disabled = true;

		if (emailObj != null) {
			emailObj.focus();
		}

	}

	if (submit_disabled) {
		document.forms['formUser'].elements['Submit'].disabled = 'disabled';
		return false;
	}

	// Ajax.call('user.php?act=check_email', 'email=' + email,
	// check_email_callback, 'GET', 'TEXT', true, true);
	if (emailObj == null) {
		checkEmailExist(email, callback);
	} else {
		checkEmailExist(emailObj, callback);
	}
}

/**
 * 检查邮箱是否已经绑定过用户
 * 
 * @param email
 *            验证邮件:支持邮箱和邮箱对象
 * @param callback
 *            回调函数：true-可以注册 false-不可以注册
 */
function checkEmailExist(email, callback) {

	var emailObj = null;

	if (typeof (email) == 'object') {
		emailObj = $(email);
		email = emailObj.val();
	}

	// Ajax.call('user.php?act=check_email', 'email=' + email,
	// check_email_callback, 'GET', 'TEXT', true, true);
	$.post('user.php?act=check_email', {
		email : email
	}, function(result) {
		if (result == 'ok') {
			document.getElementById('email_notice').innerHTML = msg_can_rg;
			document.getElementById('email_notice').style.color = '#093';
			document.forms['formUser'].elements['Submit'].disabled = '';

			if ($.isFunction(callback)) {
				callback(true);
			}
		} else {
			document.getElementById('email_notice').innerHTML = msg_email_registered;
			document.getElementById('email_notice').style.color = '#900';
			document.forms['formUser'].elements['Submit'].disabled = 'disabled';

			if (emailObj != null) {
				emailObj.focus();
			}

			if ($.isFunction(callback)) {
				callback(false);
			}

		}
	}, 'text');
}

function checkMobilePhone(mobile, callback) {
	var submit_disabled = false;

	var mobileObj = null;

	if (typeof (mobile) == 'object') {
		mobileObj = $(mobile);
		mobile = mobileObj.val();
	}

	if (mobile == '') {
		document.getElementById('mobile_phone_notice').innerHTML = msg_mobile_phone_blank;
		document.getElementById('mobile_phone_notice').style.color = '#900';
		submit_disabled = true;

		if (mobileObj != null) {
			mobileObj.focus();
		}

	} else if (!Utils.isMobile(mobile)) {
		document.getElementById('mobile_phone_notice').innerHTML = msg_mobile_phone_format;
		document.getElementById('mobile_phone_notice').style.color = '#900';
		submit_disabled = true;

		if (mobileObj != null) {
			mobileObj.focus();
		}
	}

	if (submit_disabled) {
		document.forms['formUser'].elements['Submit'].disabled = 'disabled';
		return false;
	}
	// Ajax.call('user.php?act=check_mobile_phone', 'mobile_phone=' + mobileObj,
	// check_mobile_phone_callback, 'GET', 'TEXT', true, true);

	if (mobileObj == null) {
		checkMobilePhoneExist(mobile, callback);
	} else {
		checkMobilePhoneExist(mobileObj, callback);
	}
}

/**
 * 检查手机号是否已经存在
 * 
 * @param mobile
 * @param callback
 */
var cur_mobile_phone = null;
function checkMobilePhoneExist(mobile, callback) {
	var mobileObj = null;

	if (typeof (mobile) == 'object') {
		mobileObj = $(mobile);
		mobile = mobileObj.val();
	}

	if (mobile == cur_mobile_phone && !$.isFunction(callback)) {
		if (mobileObj != null) {
			mobileObj.focus();
		}
		return;
	}

	$.post('user.php?act=check_mobile_phone', {
		mobile_phone : mobile
	}, function(result) {

		if (result == 'ok') {
			document.getElementById('mobile_phone_notice').innerHTML = msg_can_rg;
			document.getElementById('mobile_phone_notice').style.color = '#093';
			document.forms['formUser'].elements['Submit'].disabled = '';

			if ($.isFunction(callback)) {
				callback(true);
			}
		} else {
			document.getElementById('mobile_phone_notice').innerHTML = msg_mobile_phone_registered;
			document.getElementById('mobile_phone_notice').style.color = '#900';
			document.forms['formUser'].elements['Submit'].disabled = 'disabled';

			if (mobileObj != null) {
				mobileObj.focus();
			}

			if ($.isFunction(callback)) {
				callback(false);
			}
		}

		cur_mobile_phone = mobile;

	}, 'text');
}

/*******************************************************************************
 * 处理注册用户
 */
function register1() {
	var frm = document.forms['formUser'];
	var username = Utils.trim(frm.elements['username'].value);
	var email = frm.elements['email'].value;
	var password = Utils.trim(frm.elements['password'].value);
	var confirm_password = Utils.trim(frm.elements['confirm_password'].value);
	var checked_agreement = frm.elements['agreement'].checked;
	var msn = frm.elements['extend_field1'] ? Utils.trim(frm.elements['extend_field1'].value) : '';
	var qq = frm.elements['extend_field2'] ? Utils.trim(frm.elements['extend_field2'].value) : '';
	var home_phone = frm.elements['extend_field4'] ? Utils.trim(frm.elements['extend_field4'].value) : '';
	var office_phone = frm.elements['extend_field3'] ? Utils.trim(frm.elements['extend_field3'].value) : '';
	var mobile_phone = frm.elements['extend_field5'] ? Utils.trim(frm.elements['extend_field5'].value) : '';
	var passwd_answer = frm.elements['passwd_answer'] ? Utils.trim(frm.elements['passwd_answer'].value) : '';
	var sel_question = frm.elements['sel_question'] ? Utils.trim(frm.elements['sel_question'].value) : '';

	var msg = "";
	// 检查输入
	var msg = '';
	if (username.length == 0) {
		msg += username_empty + '\n';
	} else if (username.match(/^\s*$|^c:\\con\\con$|[%,\'\*\"\s\t\<\>\&\\]/)) {
		msg += username_invalid + '\n';
	} else if (username.length < 3) {
		// msg += username_shorter + '\n';
	}

	if (username.match(/[\u4e00-\u9fa5]/)) {
		msg += username_chana + '\n';
	}

	if (email.length == 0) {
		msg += email_empty + '\n';
	} else {
		if (!(Utils.isEmail(email))) {
			msg += email_invalid + '\n';
		}
	}
	if (password.length == 0) {
		msg += password_empty + '\n';
	} else if (password.length < 6) {
		msg += password_shorter + '\n';
	}
	if (/ /.test(password) == true) {
		msg += passwd_balnk + '\n';
	}
	if (confirm_password != password) {
		msg += confirm_password_invalid + '\n';
	}
	if (checked_agreement != true) {
		msg += agreement + '\n';
	}

	if (msn.length > 0 && (!Utils.isEmail(msn))) {
		msg += msn_invalid + '\n';
	}

	if (qq.length > 0 && (!Utils.isNumber(qq))) {
		msg += qq_invalid + '\n';
	}

	if (office_phone.length > 0) {
		var reg = /^[\d|\-|\s]+$/;
		if (!reg.test(office_phone)) {
			msg += office_phone_invalid + '\n';
		}
	}
	if (home_phone.length > 0) {
		var reg = /^[\d|\-|\s]+$/;

		if (!reg.test(home_phone)) {
			msg += home_phone_invalid + '\n';
		}
	}
	if (mobile_phone.length > 0) {
		var reg = /^[\d|\-|\s]+$/;
		if (!reg.test(mobile_phone)) {
			msg += mobile_phone_invalid + '\n';
		}
	}
	if (passwd_answer.length > 0 && sel_question == 0 || document.getElementById('passwd_quesetion') && passwd_answer.length == 0) {
		msg += no_select_question + '\n';
	}

	for (var i = 4; i < frm.elements.length - 4; i++) // 从第五项开始循环检查是否为必填项
	{
		var needinput = document.getElementById(frm.elements[i].name + 'i') ? document.getElementById(frm.elements[i].name + 'i') : '';

		if (needinput != '' && frm.elements[i].value.length == 0) {
			msg += '- ' + needinput.innerHTML + msg_blank + '\n';
		}
	}

	if (msg.length > 0) {
		alert(msg);
		return false;
	} else {
		return true;
	}
}

/**
 * 用户注册
 * 
 * @param register_type
 *            注册类型：email、mobile
 */
function register(register_type) {
	if (register_type == "email") {
		return reg_by_email();
	} else {
		return reg_by_mobile();
	}
}

/**
 * 通过邮箱注册
 * 
 * @returns {Boolean}
 */
function reg_by_email() {
	var frm = document.forms['formUser'];
	// 邮箱注册时不支持用户名注册
	// var username = Utils.trim(frm.elements['username'].value);
	var email = frm.elements['email'].value;
	var password = Utils.trim(frm.elements['password'].value);
	var confirm_password = Utils.trim(frm.elements['confirm_password'].value);
	var checked_agreement = frm.elements['agreement'].checked;
	var msn = frm.elements['extend_field1'] ? Utils.trim(frm.elements['extend_field1'].value) : '';
	var qq = frm.elements['extend_field2'] ? Utils.trim(frm.elements['extend_field2'].value) : '';
	var home_phone = frm.elements['extend_field4'] ? Utils.trim(frm.elements['extend_field4'].value) : '';
	var office_phone = frm.elements['extend_field3'] ? Utils.trim(frm.elements['extend_field3'].value) : '';
	// 邮箱注册不能绑定手机，许多注册成功后再绑定
	// var mobile_phone = frm.elements['extend_field5'] ?
	// Utils.trim(frm.elements['extend_field5'].value) : '';
	var passwd_answer = frm.elements['passwd_answer'] ? Utils.trim(frm.elements['passwd_answer'].value) : '';
	var sel_question = frm.elements['sel_question'] ? Utils.trim(frm.elements['sel_question'].value) : '';
	// 邮箱验证码
	var email_code = frm.elements['email_code'] ? Utils.trim(frm.elements['email_code'].value) : '';
	// 验证码
	var captcha = frm.elements['captcha'] ? Utils.trim(frm.elements['captcha'].value) : '';

	var msg = "";
	// 检查输入
	var msg = '';

	if (email.length == 0) {
		msg += email_empty + '\n';
	} else {
		if (!(Utils.isEmail(email))) {
			msg += email_invalid + '\n';
		}
	}
	if (password.length == 0) {
		msg += password_empty + '\n';
	} else if (password.length < 6) {
		msg += password_shorter + '\n';
	}
	if (/ /.test(password) == true) {
		msg += passwd_balnk + '\n';
	}
	if (confirm_password != password) {
		msg += confirm_password_invalid + '\n';
	}
	if (checked_agreement != true) {
		msg += agreement + '\n';
	}

	if (msn.length > 0 && (!Utils.isEmail(msn))) {
		msg += msn_invalid + '\n';
	}

	if (qq.length > 0 && (!Utils.isNumber(qq))) {
		msg += qq_invalid + '\n';
	}

	if (office_phone.length > 0) {
		var reg = /^[\d|\-|\s]+$/;
		if (!reg.test(office_phone)) {
			msg += office_phone_invalid + '\n';
		}
	}
	if (home_phone.length > 0) {
		var reg = /^[\d|\-|\s]+$/;

		if (!reg.test(home_phone)) {
			msg += msg_email_code_blank + '\n';
		}
	}

	if ($("#email_code").size() > 0 && email_code.length == 0) {
		msg += msg_email_code_blank + '\n';
	}

	if ($("#captcha").size() > 0 && captcha.length == 0) {
		msg += msg_captcha_blank + '\n';
	}

	// if (mobile_phone.length > 0) {
	// var reg = /^[\d|\-|\s]+$/;
	// if (!reg.test(mobile_phone)) {
	// msg += mobile_phone_invalid + '\n';
	// }
	// }
	if (passwd_answer.length > 0 && sel_question == 0 || document.getElementById('passwd_quesetion') && passwd_answer.length == 0) {
		msg += no_select_question + '\n';
	}

	for (var i = 4; i < frm.elements.length - 4; i++) // 从第五项开始循环检查是否为必填项
	{
		var needinput = document.getElementById(frm.elements[i].name + 'i') ? document.getElementById(frm.elements[i].name + 'i') : '';

		if (needinput != '' && frm.elements[i].value.length == 0) {
			msg += '- ' + needinput.innerHTML + msg_blank + '\n';
		}
	}

	if (msg.length > 0) {
		alert(msg);
		return false;
	} else {
		return true;
	}
}

function reg_by_mobile() {
	var frm = document.forms['formUser'];
	// 手机时不支持用户名注册
	// var username = Utils.trim(frm.elements['username'].value);
	var mobile_phone = frm.elements['mobile_phone'].value;
	var password = Utils.trim(frm.elements['password'].value);
	var confirm_password = Utils.trim(frm.elements['confirm_password'].value);
	var checked_agreement = frm.elements['agreement'].checked;
	var msn = frm.elements['extend_field1'] ? Utils.trim(frm.elements['extend_field1'].value) : '';
	var qq = frm.elements['extend_field2'] ? Utils.trim(frm.elements['extend_field2'].value) : '';
	var home_phone = frm.elements['extend_field4'] ? Utils.trim(frm.elements['extend_field4'].value) : '';
	var office_phone = frm.elements['extend_field3'] ? Utils.trim(frm.elements['extend_field3'].value) : '';
	// 邮箱注册不能绑定手机，许多注册成功后再绑定
	// var mobile_phone = frm.elements['extend_field5'] ?
	// Utils.trim(frm.elements['extend_field5'].value) : '';
	var passwd_answer = frm.elements['passwd_answer'] ? Utils.trim(frm.elements['passwd_answer'].value) : '';
	var sel_question = frm.elements['sel_question'] ? Utils.trim(frm.elements['sel_question'].value) : '';
	// 手机验证码
	var mobile_code = frm.elements['mobile_code'] ? Utils.trim(frm.elements['mobile_code'].value) : '';
	// 验证码
	var captcha = frm.elements['captcha'] ? Utils.trim(frm.elements['captcha'].value) : '';

	var msg = "";
	// 检查输入
	var msg = '';

	if (mobile_phone.length == 0) {
		msg += msg_mobile_phone_blank + '\n';
	} else {
		if (!(Utils.isMobile(mobile_phone))) {
			msg += mobile_phone_invalid + '\n';
		}
	}
	if (password.length == 0) {
		msg += password_empty + '\n';
	} else if (password.length < 6) {
		msg += password_shorter + '\n';
	}
	if (/ /.test(password) == true) {
		msg += passwd_balnk + '\n';
	}
	if (confirm_password != password) {
		msg += confirm_password_invalid + '\n';
	}
	if (checked_agreement != true) {
		msg += agreement + '\n';
	}

	if (msn.length > 0 && (!Utils.isEmail(msn))) {
		msg += msn_invalid + '\n';
	}

	if (qq.length > 0 && (!Utils.isNumber(qq))) {
		msg += qq_invalid + '\n';
	}

	if (office_phone.length > 0) {
		var reg = /^[\d|\-|\s]+$/;
		if (!reg.test(office_phone)) {
			msg += office_phone_invalid + '\n';
		}
	}
	if (home_phone.length > 0) {
		var reg = /^[\d|\-|\s]+$/;

		if (!reg.test(home_phone)) {
			msg += home_phone_invalid + '\n';
		}
	}

	if ($("#mobile_code").size() > 0 && mobile_code.length == 0) {
		msg += msg_mobile_phone_code_blank + '\n';
	}

	if ($("#captcha").size() > 0 && captcha.length == 0) {
		msg += msg_captcha_blank + '\n';
	}

	// if (mobile_phone.length > 0) {
	// var reg = /^[\d|\-|\s]+$/;
	// if (!reg.test(mobile_phone)) {
	// msg += mobile_phone_invalid + '\n';
	// }
	// }
	if (passwd_answer.length > 0 && sel_question == 0 || document.getElementById('passwd_quesetion') && passwd_answer.length == 0) {
		msg += no_select_question + '\n';
	}

	for (var i = 4; i < frm.elements.length - 4; i++) // 从第五项开始循环检查是否为必填项
	{
		var needinput = document.getElementById(frm.elements[i].name + 'i') ? document.getElementById(frm.elements[i].name + 'i') : '';

		if (needinput != '' && frm.elements[i].value.length == 0) {
			msg += '- ' + needinput.innerHTML + msg_blank + '\n';
		}
	}

	if (msg.length > 0) {
		alert(msg);
		return false;
	} else {
		return true;
	}
}

/**
 * 发送邮箱验证码
 * 
 * @param emailObj
 *            邮箱对象
 * @param emailCodeObj
 *            邮箱验证码对象
 * @param sendButton
 *            点击发送邮箱验证码的按钮对象，用于显示倒计时信息
 */
function sendEmailCode(emailObj, emailCodeObj, sendButton) {
	checkEmail(emailObj, function(result) {
		if (result) {
			// 发送邮件
			// &XDEBUG_SESSION_START=ECLIPSE_DBGP
			var url = 'user.php?act=send_email_code&XDEBUG_SESSION_START=ECLIPSE_DBGP';
			$.post(url, {
				email : emailObj.val()
			}, function(result) {
				if (result == 'ok') {
					// 倒计时
					countdown(sendButton);
				} else {
					alert(result);
				}
			}, 'text');
		}
	});
}

/**
 * 发送邮箱验证码
 * 
 * @param mobileObj
 *            手机号对象
 * @param mobileCodeObj
 *            短信验证码对象
 * @param sendButton
 *            点击发送短信证码的按钮对象，用于显示倒计时信息
 */
function sendMobileCode(mobileObj, mobileCodeObj, sendButton) {
	checkMobilePhone(mobileObj, function(result) {
		if (result) {
			// 发送邮件
			var url = 'user.php?act=send_mobile_code&XDEBUG_SESSION_START=ECLIPSE_DBGP';
			$.post(url, {
				mobile_phone : mobileObj.val()
			}, function(result) {
				if (result == 'ok') {
					// 倒计时
					countdown(sendButton);
				} else {
					alert(result);
				}
			}, 'text');
		}
	});
}

/*******************************************************************************
 * 用户中心订单保存地址信息
 */
function saveOrderAddress(id) {
	var frm = document.forms['formAddress'];
	var consignee = frm.elements['consignee'].value;
	var email = frm.elements['email'].value;
	var address = frm.elements['address'].value;
	var zipcode = frm.elements['zipcode'].value;
	var tel = frm.elements['tel'].value;
	var mobile = frm.elements['mobile'].value;
	var sign_building = frm.elements['sign_building'].value;
	var best_time = frm.elements['best_time'].value;

	if (id == 0) {
		alert(current_ss_not_unshipped);
		return false;
	}
	var msg = '';
	if (address.length == 0) {
		msg += address_name_not_null + "\n";
	}
	if (consignee.length == 0) {
		msg += consignee_not_null + "\n";
	}

	if (msg.length > 0) {
		alert(msg);
		return false;
	} else {
		return true;
	}
}

/*******************************************************************************
 * 会员余额申请
 */
function submitSurplus() {
	var frm = document.forms['formSurplus'];
	var surplus_type = frm.elements['surplus_type'].value;
	var surplus_amount = frm.elements['amount'].value;
	var process_notic = frm.elements['user_note'].value;
	var payment_id = 0;
	var msg = '';

	if (surplus_amount.length == 0) {
		msg += surplus_amount_empty + "\n";
	} else {
		var reg = /^[\.0-9]+/;
		if (!reg.test(surplus_amount)) {
			msg += surplus_amount_error + '\n';
		}
	}

	if (process_notic.length == 0) {
		msg += process_desc + "\n";
	}

	if (msg.length > 0) {
		alert(msg);
		return false;
	}

	if (surplus_type == 0) {
		for (var i = 0; i < frm.elements.length; i++) {
			if (frm.elements[i].name == "payment_id" && frm.elements[i].checked) {
				payment_id = frm.elements[i].value;
				break;
			}
		}

		if (payment_id == 0) {
			alert(payment_empty);
			return false;
		}
	}

	return true;
}

/*******************************************************************************
 * 处理用户添加一个红包
 */
function addBonus() {
	var frm = document.forms['addBouns'];
	var bonus_sn = frm.elements['bonus_sn'].value;

	if (bonus_sn.length == 0) {
		alert(bonus_sn_empty);
		return false;
	} else {
		var reg = /^[0-9]{10}$/;
		if (!reg.test(bonus_sn)) {
			alert(bonus_sn_error);
			return false;
		}
	}

	return true;
}

/*******************************************************************************
 * 合并订单检查
 */
function mergeOrder() {
	if (!confirm(confirm_merge)) {
		return false;
	}

	var frm = document.forms['formOrder'];
	var from_order = frm.elements['from_order'].value;
	var to_order = frm.elements['to_order'].value;
	var msg = '';

	if (from_order == 0) {
		msg += from_order_empty + '\n';
	}
	if (to_order == 0) {
		msg += to_order_empty + '\n';
	} else if (to_order == from_order) {
		msg += order_same + '\n';
	}
	if (msg.length > 0) {
		alert(msg);
		return false;
	} else {
		return true;
	}
}

/*******************************************************************************
 * 订单中的商品返回购物车
 * 
 * @param int
 *            orderId 订单号
 */
function returnToCart(orderId) {
	Ajax.call('user.php?act=return_to_cart', 'order_id=' + orderId, returnToCartResponse, 'POST', 'JSON');
}

function returnToCartResponse(result) {
	//alert(result.message);
	if (result.error > 0) {
		// 如果需要缺货登记，跳转
		
		if (result.error == 1) 
		{
			alert(result.message);
			location.href = 'user.php';
		}
		else if (result.error == 2) {
		
//			if (confirm(result.message)) {
//				location.href = 'user.php?act=add_booking&id=' + result.goods_id + '&spec=' + result.product_spec;
//				document.getElementById('tell_me_form').style.display = 'block';
//			}
//			document.getElementById('tell_me_form').style.display = 'block';
			
			if(document.getElementById('g_id')){
				document.getElementById('g_id').value = result.goods_id;
			}
			if(document.getElementById('rgoods_name')){
				document.getElementById('rgoods_name').innerHTML = result.goods_name;
			}
			document.getElementById('tell_me_form').style.display = document.getElementById('tell_me_form').style.display=='none'?'block':'none';
			//document.getElementById('bg').style.display='none';

		}
		// 没选规格，弹出属性选择框
		else if (result.error == 6) {
			openSpeDiv(result.message, result.goods_id, result.parent);
		} else if (result.error == 999) {
			if (confirm(result.message)) {
				location.href = 'user.php';
			}
		} else if (result.error == 888) {
			alert(result.message);
		} else if (result.error == 777) {
			//预售活动提示
			//预售跳转到商品详情页
			if(confirm(result.message)){
				window.location.href = result.uri;
			}
		} else {
			alert(result.message);
		}
	} else {
		var cartInfo = document.getElementById('ECS_CARTINFO');
		if (cartInfo) {
			cartInfo.innerHTML = result.content;
		}
	}
}

/*******************************************************************************
 * 检测密码强度
 * 
 * @param string
 *            pwd 密码
 */
function checkIntensity(pwd) {

	$("#pwd_notice").hide();
	$("#pwd_intensity").show();

	var Mcolor = "#FFF", Lcolor = "#FFF", Hcolor = "#FFF";
	var m = 0;

	var Modes = 0;
	for (var i = 0; i < pwd.length; i++) {
		var charType = 0;
		var t = pwd.charCodeAt(i);
		if (t >= 48 && t <= 57) {
			charType = 1;
		} else if (t >= 65 && t <= 90) {
			charType = 2;
		} else if (t >= 97 && t <= 122)
			charType = 4;
		else
			charType = 4;
		Modes |= charType;
	}

	for (i = 0; i < 4; i++) {
		if (Modes & 1)
			m++;
		Modes >>>= 1;
	}

	if (pwd.length <= 4) {
		m = 1;
	}

	switch (m) {
	case 1:
		Lcolor = "2px solid red";
		Mcolor = Hcolor = "2px solid #DADADA";
		break;
	case 2:
		Mcolor = "2px solid #f90";
		Lcolor = Hcolor = "2px solid #DADADA";
		break;
	case 3:
		Hcolor = "2px solid #3c0";
		Lcolor = Mcolor = "2px solid #DADADA";
		break;
	case 4:
		Hcolor = "2px solid #3c0";
		Lcolor = Mcolor = "2px solid #DADADA";
		break;
	default:
		Hcolor = Mcolor = Lcolor = "";
		break;
	}
	if (document.getElementById("pwd_lower")) {
		document.getElementById("pwd_lower").style.borderBottom = Lcolor;
		document.getElementById("pwd_middle").style.borderBottom = Mcolor;
		document.getElementById("pwd_high").style.borderBottom = Hcolor;
	}

}

function changeType(obj) {
	if (obj.getAttribute("min") && document.getElementById("ECS_AMOUNT")) {
		document.getElementById("ECS_AMOUNT").disabled = false;
		document.getElementById("ECS_AMOUNT").value = obj.getAttribute("min");
		if (document.getElementById("ECS_NOTICE") && obj.getAttribute("to") && obj.getAttribute('fee')) {
			var fee = parseInt(obj.getAttribute("fee"));
			var to = parseInt(obj.getAttribute("to"));
			if (fee < 0) {
				to = to + fee * 2;
			}
			document.getElementById("ECS_NOTICE").innerHTML = notice_result + to;
		}
	}
}

function calResult() {
	var amount = document.getElementById("ECS_AMOUNT").value;
	var notice = document.getElementById("ECS_NOTICE");

	reg = /^\d+$/;
	if (!reg.test(amount)) {
		notice.innerHTML = notice_not_int;
		return;
	}
	amount = parseInt(amount);
	var frm = document.forms['transform'];
	for (var i = 0; i < frm.elements['type'].length; i++) {
		if (frm.elements['type'][i].checked) {
			var min = parseInt(frm.elements['type'][i].getAttribute("min"));
			var to = parseInt(frm.elements['type'][i].getAttribute("to"));
			var fee = parseInt(frm.elements['type'][i].getAttribute("fee"));
			var result = 0;
			if (amount < min) {
				notice.innerHTML = notice_overflow + min;
				return;
			}

			if (fee > 0) {
				result = (amount - fee) * to / (min - fee);
			} else {
				// result = (amount + fee* min /(to+fee)) * (to + fee) / min ;
				result = amount * (to + fee) / min + fee;
			}

			notice.innerHTML = notice_result + parseInt(result + 0.5);
		}
	}
}
/* 代码增加2014-12-23 by bbs.hongyuvip.com _star */
function choose_type(val) {
	if (val == 0) {
		document.getElementById('f_mobile').style.display = 'none';
		document.getElementById('f_code').style.display = 'none';
		document.getElementById('f_email').style.display = 'none';
	}
	if (val == 1) {
		document.getElementById('f_mobile').style.display = 'block';
		document.getElementById('f_code').style.display = 'block';
		document.getElementById('f_email').style.display = 'none';
	}
	if (val == 2) {
		document.getElementById('f_mobile').style.display = 'none';
		document.getElementById('f_code').style.display = 'none';
		document.getElementById('f_email').style.display = 'block';
	}
}

function forget_pass() {
	var frm = document.forms['fpForm'];
	var user_name = frm.elements['u_name'].value;
	var find_type = frm.elements['find_type'].value;
	var mobile = frm.elements['mobile'].value;
	var code = frm.elements['code'].value;
	var email = frm.elements['email'].value;
	if (user_name.length == 0) {
		alert('用户名不能为空！');
		return false;
	}
	if (find_type == 0) {
		alert('请选择找回方式！');
		return false;
	}
	if (find_type == 1) {
		if (mobile.length == 0) {
			alert('手机号不能为空！');
			return false;
		} else {
			if (mobile.length != 11) {
				alert('手机号不是11位！');
				return false;
			} else {
				if (code.length == 0) {
					alert('验证码不能为空！');
					return false;
				}
			}
		}
	}

	if (find_type == 2) {
		if (email.length == 0) {
			alert('邮箱不能为空！');
			return false;
		} else {
			if (!(Utils.isEmail(email))) {
				alert('邮箱格式不正确！');
				return false;
			}
		}
	}
	return true;
}

var wait = 60;
function countdown(obj, msg) {
	obj = $(obj);

	if (wait == 0) {
		obj.removeAttr("disabled");
		obj.val(msg);
		wait = 60;
	} else {
		if (msg == undefined || msg == null) {
			msg = obj.val();
		}
		obj.attr("disabled", "disabled");
		obj.val(wait + "秒后重新获取");
		wait--;
		setTimeout(function() {
			countdown(obj, msg)
		}, 1000)
	}
}
/* 代码增加2014-12-23 by bbs.hongyuvip.com _end */