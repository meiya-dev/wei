/**
 * @author juhua
 */


(function () {

	var app = {};

	app.sales = {
		url: '/sales',
		data: [],
		_sales: function (type, data) {

			var param = {
				url: this.url,
				type: type || 'get',
				dataType: 'json'
			};

			if (data && typeof data === 'object') {
				param.data = data;
			}

			return $.ajax(param)
			.done(function (res) {
				this.data = res;
			}.bind(this))
		},
		render: function () {

			var self = this;

			var Item = React.createClass({
				render: function () {
					return (
						<div className="item">
						<div className="content">
						  <div className="header">{this.props.data.Product.name}</div>
						  <div className="meta">
						    <span className="price">¥5</span>
						  </div>
						  <div className="description">
						    <p>暂无详情</p>
						  </div>
						</div>
						</div>
					)
				}
			});

			var Sales = self.Sales = React.createClass({
				getInitialState: function () {
					return {
						data: self.data
					}
				},

				render: function () {
					var self = this;
					return (
						<div className="ui divided items">
						{
							this.state.data.map(function (item) {
								return (<Item data={item}/>);
							})
						}
						</div>
					);
				}
			});

			React.render(
				<Sales />,
				document.getElementById('J_Sales')
			);

		},
		init: function () {
			this._sales()
			.done(function () {
				this.render();
			}.bind(this));
		}
	};

	app.add = function () {

		var that = this;

		var Add = React.createClass({
			handleClickAdd: function () {
				$('.add.modal').modal('show');
			},
			render: function () {
				return (
					<div className="fluid ui button primary" 
					onClick={this.handleClickAdd}>
					{this.props.text}</div>
				)
			}
		});

		React.render(
			<Add text='添加新菜色'/>,
			document.getElementById('J_Add')
		);

		$('.add.modal').modal({
			onApprove: function () {
				var $this = $(this);
				var val = $this.find('#J_ProductName').val();

				if (val) {
					that.sales._sales('post', {
						product_name: val
					}).done(function () {
						that.sales.init()
					})
				}
				return false
			}
		});

	};

	app.init = function () {
		this.sales.init();
		this.add();
	};

	app.init();

}())
