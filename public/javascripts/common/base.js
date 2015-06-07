/**
 * @author juhua
 */


(function() {

	var base = {};

	base.verifyLogin = {
		_cookie: function () {
			var cookie = document.cookie;
			var reg = new RegExp('user_key');
			return reg.test(cookie)
		},
		render: function () {
			var Login = React.createClass({
				handleClickLogin: function () {
					location.href = '/login'
				},
				render: function () {
					return (
						<div className="login">
						<div className="ui button fluid orange" 
						onClick={this.handleClickLogin}>{this.props.text}</div>
						</div>
					)
				}
			});

			React.render(
				<Login text='点击登录，否则可能无法正常操作'/>,
				document.getElementById('J_Login')
			)
		},
		init: function () {
			var isLogin = this._cookie();

			if (!isLogin) {
				this.render();
			}

		}
	}

	base.init = function () {
		this.verifyLogin.init();
	};

	base.init();

}())