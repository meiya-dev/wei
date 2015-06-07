/**
 * @author juhua
 */

(function() {

	var app = {};

	app.login = {
		url: '/sessions',
		_sessions: function (param) {
			return $.ajax({
				url: this.url,
				type: 'post',
				data: param,
				dataType: 'json'
			}).always(function (res) {
				if (res.status === 200) {}
			}.bind(this))
		},
		render: function () {

			var self = this;

			var Login = React.createClass({
				getInitialState: function () {
					return {
						name: '',
						password: ''
					}
				},
				handleChangeName: function (e) {
					this.setState({
						name: e.target.value
					});
				},
				handleChangePassword: function (e) {
					this.setState({
						password: e.target.value
					});
				},
				handleSubmit: function () {
					var param = this.state;
					self._sessions(param);
				},
				render: function () {
					return (
						<div className="ui form">
							<div className="field">
								<input type="text" placeholder="用户名" 
								value={this.state.name} 
								onChange={this.handleChangeName}/>
							</div>
							<div className="field">
								<input type="password" placeholder="密码" 
								value={this.state.password} 
								onChange={this.handleChangePassword}/>
							</div>
							<button className="ui button fluid primary" 
							onClick={this.handleSubmit}>登录</button>
						</div>
					)
				}
			});

			React.render(
				<Login/>,
				document.getElementById('J_Login')
			);
		},
		init: function () {
			this.render();
		}
	}

	app.init = function () {
		this.login.init()
	};

	app.init();

}())